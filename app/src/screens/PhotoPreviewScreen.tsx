import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { convertImageToBase64 } from '../utils/imageUtils';
import { analyzeImage, classifyVibe } from '../services/visionService';
import { getSongRecommendations } from '../services/spotifyService';
import { getUserPreferences } from '../utils/storage';

type PhotoPreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PhotoPreview'>;
type PhotoPreviewScreenRouteProp = RouteProp<RootStackParamList, 'PhotoPreview'>;

interface Props {
  navigation: PhotoPreviewScreenNavigationProp;
  route: PhotoPreviewScreenRouteProp;
}

const PhotoPreviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { imageUri } = route.params;
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    
    try {
      // Step 1: Convert image to base64
      setLoadingMessage('Preparing your photo...');
      const base64Image = await convertImageToBase64(imageUri);
      
      // Step 2: Analyze image with Vision API
      setLoadingMessage('Analyzing your photo...');
      const visionData = await analyzeImage(base64Image);
      
      // Step 3: Classify vibe
      setLoadingMessage('Detecting the vibe...');
      const vibe = classifyVibe(visionData);
      
      // Step 4: Get user preferences
      const userPreferences = await getUserPreferences();
      
      // Step 5: Get song recommendations
      setLoadingMessage('Finding perfect songs...');
      const recommendations = await getSongRecommendations(vibe, userPreferences);
      
      if (recommendations.length === 0) {
        Alert.alert(
          'No Results',
          'Could not find suitable songs. Please try a different photo or check your internet connection.'
        );
        setLoading(false);
        return;
      }
      
      // Navigate to results
      setLoading(false);
      navigation.navigate('Results', { recommendations, imageUri });
      
    } catch (error: any) {
      console.error('Error analyzing photo:', error);
      setLoading(false);
      
      Alert.alert(
        'Analysis Failed',
        error.message || 'Failed to analyze photo. Please check your API keys and internet connection.',
        [
          { text: 'Try Again', onPress: () => {} },
          { text: 'Go Back', onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>{loadingMessage}</Text>
          <Text style={styles.loadingSubtext}>This may take a few moments...</Text>
        </View>
      ) : (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
            <Text style={styles.analyzeButtonText}>🎵 Analyze & Find Songs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Choose Different Photo</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 We'll analyze your photo's vibe, colors, and mood to find songs that perfectly match the moment
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  analyzeButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ddd',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default PhotoPreviewScreen;
