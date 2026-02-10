// User Profile Types
export interface UserPreferences {
  ageRange: '13-17' | '18-24' | '25-34' | '35-44' | '45+' | null;
  culturalBackground: string[];
  musicPreferences: string[];
  languagePreferences: string[];
  hasCompletedOnboarding: boolean;
}

// Vibe Detection Types
export interface VibeProfile {
  primary: string;
  secondary: string;
  energyLevel: number; // 0-1
  colorMood: 'warm' | 'cool' | 'vibrant' | 'neutral';
  confidence: number; // 0-1
  detectedElements: string[];
}

// Music Types
export interface Song {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  previewUrl: string | null;
  spotifyUri: string;
  duration: number; // in seconds
}

export interface SongRecommendation extends Song {
  recommendedTimestamp: {
    start: number; // in seconds
    end: number; // in seconds
    formatted: string; // e.g., "0:47 - 1:02"
  };
  matchScore: number; // 0-100
  explanation: string;
  audioFeatures?: SpotifyAudioFeatures;
}

export interface SpotifyAudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
}

// Vision API Types
export interface VisionAPIResponse {
  labels: Array<{
    description: string;
    score: number;
  }>;
  objects: Array<{
    name: string;
    score: number;
  }>;
  colors: Array<{
    color: {
      red: number;
      green: number;
      blue: number;
    };
    score: number;
    pixelFraction: number;
  }>;
  faces?: Array<{
    joyLikelihood: string;
    sorrowLikelihood: string;
    angerLikelihood: string;
  }>;
}

// Navigation Types
export type RootStackParamList = {
  Welcome: undefined;
  OnboardingProfile: undefined;
  Home: undefined;
  PhotoPreview: { imageUri: string };
  Results: { recommendations: SongRecommendation[]; imageUri: string };
  Settings: undefined;
};

// Music Genre Options
export const MUSIC_GENRES = [
  'Pop',
  'Hip-Hop',
  'R&B',
  'Rock',
  'EDM',
  'Latin',
  'K-Pop',
  'Indie',
  'Country',
  'Jazz',
  'Classical',
  'Reggaeton',
  'Afrobeats',
  'Lo-fi',
  'Alternative',
] as const;

export const AGE_RANGES = ['13-17', '18-24', '25-34', '35-44', '45+'] as const;

export const CULTURAL_BACKGROUNDS = [
  'African',
  'African American',
  'Asian',
  'East Asian',
  'South Asian',
  'Southeast Asian',
  'European',
  'Hispanic/Latino',
  'Middle Eastern',
  'Native American',
  'Pacific Islander',
  'Caribbean',
  'Mixed/Multiple',
  'Prefer not to say',
  'Other',
] as const;

export const LANGUAGE_PREFERENCES = [
  'English',
  'Spanish',
  'Korean',
  'Japanese',
  'Mandarin',
  'French',
  'Portuguese',
  'Hindi',
  'Arabic',
  'Other',
] as const;
