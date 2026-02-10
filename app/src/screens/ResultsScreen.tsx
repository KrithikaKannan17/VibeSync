import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SongRecommendation } from '../types';
import { Audio } from 'expo-av';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { recommendations, imageUri } = route.params;
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playPreview = async (song: SongRecommendation) => {
    try {
      // Stop current sound if playing
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        if (playingId === song.id) {
          setPlayingId(null);
          return;
        }
      }

      if (!song.previewUrl) {
        Alert.alert('Preview Not Available', 'This song does not have a preview available.');
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.previewUrl },
        { shouldPlay: true }
      );

      setSound(newSound);
      setPlayingId(song.id);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingId(null);
          setSound(null);
        }
      });
    } catch (error) {
      console.error('Error playing preview:', error);
      Alert.alert('Playback Error', 'Failed to play preview');
    }
  };

  const copySongName = async (songName: string, artist: string) => {
    await Clipboard.setStringAsync(`${songName} - ${artist}`);
    Alert.alert('Copied!', 'Song name copied to clipboard');
  };

  const openSpotify = (spotifyUri: string) => {
    const url = spotifyUri.replace('spotify:', 'https://open.spotify.com/');
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open Spotify');
    });
  };

  const handleDone = () => {
    navigation.navigate('Home');
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Photo Preview */}
        <View style={styles.photoPreview}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Perfect Songs for Your Story</Text>
          <Text style={styles.subtitle}>
            Here are {recommendations.length} songs that match your photo's vibe
          </Text>
        </View>

        {/* Song Recommendations */}
        {recommendations.map((song, index) => (
          <View key={song.id} style={styles.songCard}>
            <View style={styles.songHeader}>
              <Text style={styles.rankBadge}>#{index + 1}</Text>
              <Text style={styles.matchScore}>{Math.round(song.matchScore)}% Match</Text>
            </View>

            <View style={styles.songContent}>
              <Image source={{ uri: song.albumArt }} style={styles.albumArt} />
              
              <View style={styles.songInfo}>
                <Text style={styles.songName} numberOfLines={2}>
                  {song.name}
                </Text>
                <Text style={styles.artistName} numberOfLines={1}>
                  {song.artist}
                </Text>
                
                <View style={styles.timestampContainer}>
                  <Text style={styles.timestampLabel}>Best moment:</Text>
                  <Text style={styles.timestamp}>{song.recommendedTimestamp.formatted}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.explanation}>{song.explanation}</Text>

            <View style={styles.actionsRow}>
              {song.previewUrl && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.playButton]}
                  onPress={() => playPreview(song)}>
                  <Text style={styles.actionButtonText}>
                    {playingId === song.id ? '⏸️ Pause' : '▶️ Preview'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.actionButton, styles.copyButton]}
                onPress={() => copySongName(song.name, song.artist)}>
                <Text style={styles.actionButtonText}>📋 Copy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.spotifyButton]}
                onPress={() => openSpotify(song.spotifyUri)}>
                <Text style={styles.actionButtonText}>🎵 Spotify</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.instructionBox}>
              <Text style={styles.instructionText}>
                💡 Copy the song name, search for it in Instagram Stories, and use the timestamp {song.recommendedTimestamp.formatted}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  photoPreview: {
    height: 200,
    backgroundColor: '#000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  songCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  songHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankBadge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  matchScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
  },
  songContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  albumArt: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  songName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampLabel: {
    fontSize: 12,
    color: '#999',
    marginRight: 6,
  },
  timestamp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#6200ee',
  },
  copyButton: {
    backgroundColor: '#03a9f4',
  },
  spotifyButton: {
    backgroundColor: '#1db954',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  instructionBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  doneButton: {
    backgroundColor: '#6200ee',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;
