import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, UserPreferences } from '../types';
import { getUserPreferences, clearAllData } from '../utils/storage';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const prefs = await getUserPreferences();
    setPreferences(prefs);
  };

  const handleEditPreferences = () => {
    navigation.navigate('OnboardingProfile');
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert('Success', 'All data has been cleared', [
                {
                  text: 'OK',
                  onPress: () => navigation.replace('Welcome'),
                },
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Story Song Matcher',
      'Version 1.0.0\n\nFind the perfect song and timestamp for your Instagram Stories based on your photo\'s vibe.\n\nDeveloped with ❤️ for Instagram creators.',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your Privacy Matters:\n\n' +
      '• Photos are only sent to Google Vision API for analysis and are immediately deleted\n' +
      '• User preferences are stored locally on your device\n' +
      '• No data is sold or shared with third parties\n' +
      '• You can delete all data anytime from settings\n\n' +
      'We use:\n' +
      '• Google Cloud Vision API for photo analysis\n' +
      '• Spotify Web API for music recommendations',
      [{ text: 'OK' }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Help & Tips',
      '📸 Photo Tips:\n' +
      '• Use clear, well-lit photos for best results\n' +
      '• Photos with distinct vibes work better\n\n' +
      '🎵 Using Recommendations:\n' +
      '• Copy the song name to clipboard\n' +
      '• Open Instagram Stories\n' +
      '• Search for the song in Instagram\'s music library\n' +
      '• Use the recommended timestamp for the best moment\n\n' +
      '⚙️ API Setup:\n' +
      '• Add your Google Cloud Vision API key to .env file\n' +
      '• Add your Spotify API credentials to .env file',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* User Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Profile</Text>
        
        {preferences && (
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Age Range:</Text>
              <Text style={styles.preferenceValue}>{preferences.ageRange || 'Not set'}</Text>
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Music Preferences:</Text>
              <Text style={styles.preferenceValue}>
                {preferences.musicPreferences.length > 0
                  ? preferences.musicPreferences.join(', ')
                  : 'Not set'}
              </Text>
            </View>
            
            {preferences.languagePreferences.length > 0 && (
              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Languages:</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.languagePreferences.join(', ')}
                </Text>
              </View>
            )}
            
            {preferences.culturalBackground.length > 0 && (
              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Cultural Background:</Text>
                <Text style={styles.preferenceValue}>
                  {preferences.culturalBackground.join(', ')}
                </Text>
              </View>
            )}
          </View>
        )}
        
        <TouchableOpacity style={styles.button} onPress={handleEditPreferences}>
          <Text style={styles.buttonText}>Edit Preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        
        <TouchableOpacity style={styles.listItem} onPress={handleHelp}>
          <Text style={styles.listItemIcon}>❓</Text>
          <Text style={styles.listItemText}>Help & Tips</Text>
          <Text style={styles.listItemArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem} onPress={handlePrivacyPolicy}>
          <Text style={styles.listItemIcon}>🔒</Text>
          <Text style={styles.listItemText}>Privacy Policy</Text>
          <Text style={styles.listItemArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem} onPress={handleAbout}>
          <Text style={styles.listItemIcon}>ℹ️</Text>
          <Text style={styles.listItemText}>About</Text>
          <Text style={styles.listItemArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
          <Text style={styles.dangerButtonText}>🗑️ Delete All Data</Text>
        </TouchableOpacity>
        
        <Text style={styles.dangerText}>
          This will delete all your preferences and reset the app
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  preferencesCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  preferenceItem: {
    marginBottom: 12,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  preferenceValue: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  listItemIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  listItemArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  dangerButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f44336',
    marginBottom: 8,
  },
  dangerButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default SettingsScreen;
