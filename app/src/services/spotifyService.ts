import axios from 'axios';
import { VibeProfile, UserPreferences, SongRecommendation, SpotifyAudioFeatures } from '../types';

const SPOTIFY_CLIENT_ID = ''; // Add your Spotify Client ID here
const SPOTIFY_CLIENT_SECRET = ''; // Add your Spotify Client Secret here
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

// Get Spotify access token
const getAccessToken = async (): Promise<string> => {
  // Return cached token if still valid
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const credentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // Refresh 1 min before expiry

    return accessToken || '';
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw new Error('Failed to authenticate with Spotify. Please check your API credentials.');
  }
};

// Map vibe to Spotify search parameters
const getSearchParameters = (vibe: VibeProfile, userPreferences: UserPreferences | null) => {
  const vibeGenreMap: Record<string, string[]> = {
    energetic: ['dance', 'pop', 'hip-hop', 'edm'],
    chill: ['indie', 'acoustic', 'chill', 'lo-fi'],
    romantic: ['r-n-b', 'soul', 'pop'],
    aesthetic: ['indie', 'alternative', 'electronic'],
    fitness: ['workout', 'hip-hop', 'edm', 'rock'],
    food: ['jazz', 'indie', 'pop'],
    travel: ['indie', 'pop', 'world-music'],
    nostalgic: ['pop', 'rock', 'indie'],
  };

  const vibeAudioFeatures: Record<string, Partial<SpotifyAudioFeatures>> = {
    energetic: { energy: 0.8, danceability: 0.7 },
    chill: { energy: 0.3, valence: 0.5 },
    romantic: { energy: 0.5, valence: 0.7 },
    aesthetic: { energy: 0.5, valence: 0.5 },
    fitness: { energy: 0.9, danceability: 0.8 },
    food: { energy: 0.4, valence: 0.6 },
    travel: { energy: 0.6, valence: 0.7 },
    nostalgic: { energy: 0.5, valence: 0.6 },
  };

  let genres = vibeGenreMap[vibe.primary] || ['pop'];
  const targetFeatures = vibeAudioFeatures[vibe.primary] || { energy: 0.5, valence: 0.5 };

  // Layer user preferences
  if (userPreferences?.musicPreferences && userPreferences.musicPreferences.length > 0) {
    const userGenres = userPreferences.musicPreferences.map(g => g.toLowerCase().replace(/\s+/g, '-'));
    genres = [...new Set([...genres, ...userGenres])].slice(0, 5);
  }

  return { genres, targetFeatures };
};

// Search for songs based on vibe
export const searchSongsByVibe = async (
  vibe: VibeProfile,
  userPreferences: UserPreferences | null,
  limit: number = 20
): Promise<any[]> => {
  try {
    const token = await getAccessToken();
    const { genres, targetFeatures } = getSearchParameters(vibe, userPreferences);

    // Use Spotify's recommendations endpoint
    const seedGenres = genres.slice(0, 5).join(',');
    
    const response = await axios.get(`${SPOTIFY_API_BASE}/recommendations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        seed_genres: seedGenres,
        limit,
        target_energy: targetFeatures.energy,
        target_danceability: targetFeatures.danceability,
        target_valence: targetFeatures.valence,
        min_popularity: 30, // Ensure songs are somewhat popular
      },
    });

    return response.data.tracks;
  } catch (error) {
    console.error('Error searching songs:', error);
    throw new Error('Failed to search for songs. Please try again.');
  }
};

// Get audio features for a track
export const getAudioFeatures = async (trackId: string): Promise<SpotifyAudioFeatures> => {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(`${SPOTIFY_API_BASE}/audio-features/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting audio features:', error);
    throw error;
  }
};

// Get audio analysis for timestamp detection
export const getAudioAnalysis = async (trackId: string): Promise<any> => {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(`${SPOTIFY_API_BASE}/audio-analysis/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting audio analysis:', error);
    return null;
  }
};

// Find best timestamp in a song (15-second snippet)
const findBestTimestamp = async (trackId: string, duration: number): Promise<{ start: number; end: number; formatted: string }> => {
  try {
    const analysis = await getAudioAnalysis(trackId);
    
    if (!analysis || !analysis.sections) {
      // Fallback: use typical chorus position (around 45-60 seconds)
      const start = Math.min(47, duration - 15);
      return {
        start,
        end: start + 15,
        formatted: formatTimestamp(start, start + 15),
      };
    }

    // Find the most energetic section that's not at the very beginning or end
    const sections = analysis.sections.filter((s: any) => 
      s.start > 10 && s.start < duration - 20
    );

    if (sections.length === 0) {
      const start = Math.min(45, duration - 15);
      return {
        start,
        end: start + 15,
        formatted: formatTimestamp(start, start + 15),
      };
    }

    // Find section with highest loudness (typically the chorus)
    const bestSection = sections.reduce((prev: any, current: any) => 
      current.loudness > prev.loudness ? current : prev
    );

    const start = Math.max(0, bestSection.start - 2); // Start 2 seconds before peak
    const end = Math.min(duration, start + 15);

    return {
      start,
      end,
      formatted: formatTimestamp(start, end),
    };
  } catch (error) {
    console.error('Error finding best timestamp:', error);
    // Fallback to typical chorus position
    const start = Math.min(47, duration - 15);
    return {
      start,
      end: start + 15,
      formatted: formatTimestamp(start, start + 15),
    };
  }
};

// Format timestamp for display
const formatTimestamp = (start: number, end: number): string => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};

// Calculate match score
const calculateMatchScore = (
  audioFeatures: SpotifyAudioFeatures,
  vibe: VibeProfile,
  userPreferences: UserPreferences | null,
  trackPopularity: number
): number => {
  const { targetFeatures } = getSearchParameters(vibe, userPreferences);
  
  // Vibe match (40 points)
  let vibeScore = 40;
  if (targetFeatures.energy) {
    vibeScore -= Math.abs(audioFeatures.energy - targetFeatures.energy) * 20;
  }
  if (targetFeatures.danceability) {
    vibeScore -= Math.abs(audioFeatures.danceability - targetFeatures.danceability) * 10;
  }
  if (targetFeatures.valence) {
    vibeScore -= Math.abs(audioFeatures.valence - targetFeatures.valence) * 10;
  }

  // User preference (30 points) - simplified, would need more context
  const userScore = 25; // Base score

  // Popularity (20 points)
  const popularityScore = (trackPopularity / 100) * 20;

  // Instagram compatibility (10 points) - assume all are compatible
  const instagramScore = 10;

  return Math.max(0, Math.min(100, vibeScore + userScore + popularityScore + instagramScore));
};

// Generate explanation for recommendation
const generateExplanation = (vibe: VibeProfile, audioFeatures: SpotifyAudioFeatures): string => {
  const vibeDescriptions: Record<string, string> = {
    energetic: 'high-energy, upbeat vibe',
    chill: 'relaxed, laid-back atmosphere',
    romantic: 'romantic, heartfelt mood',
    aesthetic: 'artistic, stylish aesthetic',
    fitness: 'motivating, active energy',
    food: 'enjoyable, social vibe',
    travel: 'adventurous, exciting feel',
    nostalgic: 'nostalgic, sentimental mood',
  };

  const vibeDesc = vibeDescriptions[vibe.primary] || 'unique vibe';
  
  let explanation = `This song matches your photo's ${vibeDesc}`;
  
  if (audioFeatures.energy > 0.7) {
    explanation += ' with its energetic and dynamic sound';
  } else if (audioFeatures.energy < 0.4) {
    explanation += ' with its calm and soothing melody';
  }
  
  if (audioFeatures.danceability > 0.7) {
    explanation += ', perfect for capturing that fun, danceable moment';
  }
  
  return explanation + '.';
};

// Main function to get song recommendations
export const getSongRecommendations = async (
  vibe: VibeProfile,
  userPreferences: UserPreferences | null
): Promise<SongRecommendation[]> => {
  try {
    const tracks = await searchSongsByVibe(vibe, userPreferences, 20);
    
    const recommendations: SongRecommendation[] = [];
    
    // Process tracks and get detailed info
    for (const track of tracks.slice(0, 10)) {
      try {
        const audioFeatures = await getAudioFeatures(track.id);
        const timestamp = await findBestTimestamp(track.id, track.duration_ms / 1000);
        const matchScore = calculateMatchScore(audioFeatures, vibe, userPreferences, track.popularity);
        
        recommendations.push({
          id: track.id,
          name: track.name,
          artist: track.artists.map((a: any) => a.name).join(', '),
          albumArt: track.album.images[0]?.url || '',
          previewUrl: track.preview_url,
          spotifyUri: track.uri,
          duration: track.duration_ms / 1000,
          recommendedTimestamp: timestamp,
          matchScore,
          explanation: generateExplanation(vibe, audioFeatures),
          audioFeatures,
        });
      } catch (error) {
        console.error(`Error processing track ${track.id}:`, error);
        continue;
      }
    }
    
    // Sort by match score and return top 5
    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  } catch (error) {
    console.error('Error getting song recommendations:', error);
    throw error;
  }
};
