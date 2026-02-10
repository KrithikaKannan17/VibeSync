import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { pickImageFromGallery, takePhoto } from '../utils/imageUtils';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleChooseFromGallery = async () => {
    try {
      const imageUri = await pickImageFromGallery();
      if (imageUri) {
        navigation.navigate('PhotoPreview', { imageUri });
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to pick image from gallery');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const imageUri = await takePhoto();
      if (imageUri) {
        navigation.navigate('PhotoPreview', { imageUri });
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to take photo');
    }
  };

  const handleOpenSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton} onPress={handleOpenSettings}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.mainIcon}>🎵</Text>
        </View>

        <Text style={styles.title}>Find Your Perfect Song</Text>
        
        <Text style={styles.instructionText}>
          Upload your story photo and we'll find the perfect song with the ideal timestamp
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleChooseFromGallery}>
            <Text style={styles.buttonIcon}>🖼️</Text>
            <Text style={styles.primaryButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleTakePhoto}>
            <Text style={styles.buttonIcon}>📷</Text>
            <Text style={styles.secondaryButtonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>1.</Text>
            <Text style={styles.infoText}>Upload or take a photo</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>2.</Text>
            <Text style={styles.infoText}>AI analyzes your photo's vibe</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>3.</Text>
            <Text style={styles.infoText}>Get 5 personalized song recommendations</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>4.</Text>
            <Text style={styles.infoText}>See the perfect 15-second snippet for each</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainIcon: {
    fontSize: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonsContainer: {
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6200ee',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#6200ee',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200ee',
    marginRight: 8,
    width: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});

export default HomeScreen;
