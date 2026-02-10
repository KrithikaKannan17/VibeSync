import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, UserPreferences, AGE_RANGES, MUSIC_GENRES, CULTURAL_BACKGROUNDS, LANGUAGE_PREFERENCES } from '../types';
import { saveUserPreferences } from '../utils/storage';

type OnboardingProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingProfile'>;

interface Props {
  navigation: OnboardingProfileScreenNavigationProp;
}

const OnboardingProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [ageRange, setAgeRange] = useState<UserPreferences['ageRange']>(null);
  const [culturalBackground, setCulturalBackground] = useState<string[]>([]);
  const [musicPreferences, setMusicPreferences] = useState<string[]>([]);
  const [languagePreferences, setLanguagePreferences] = useState<string[]>([]);

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleContinue = async () => {
    if (!ageRange) {
      Alert.alert('Missing Information', 'Please select your age range');
      return;
    }

    if (musicPreferences.length === 0) {
      Alert.alert('Missing Information', 'Please select at least one music preference');
      return;
    }

    try {
      const preferences: UserPreferences = {
        ageRange,
        culturalBackground,
        musicPreferences,
        languagePreferences,
        hasCompletedOnboarding: true,
      };

      await saveUserPreferences(preferences);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerText}>Let's personalize your experience</Text>
      <Text style={styles.subHeaderText}>
        This helps us recommend songs that match your taste
      </Text>

      {/* Age Range */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Age Range *</Text>
        <View style={styles.optionsContainer}>
          {AGE_RANGES.map(age => (
            <TouchableOpacity
              key={age}
              style={[styles.option, ageRange === age && styles.optionSelected]}
              onPress={() => setAgeRange(age)}>
              <Text style={[styles.optionText, ageRange === age && styles.optionTextSelected]}>
                {age}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Music Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Music Preferences * (Select all that apply)</Text>
        <View style={styles.optionsContainer}>
          {MUSIC_GENRES.map(genre => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.option,
                musicPreferences.includes(genre) && styles.optionSelected,
              ]}
              onPress={() => toggleSelection(genre, musicPreferences, setMusicPreferences)}>
              <Text
                style={[
                  styles.optionText,
                  musicPreferences.includes(genre) && styles.optionTextSelected,
                ]}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Language Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Preferences (Optional)</Text>
        <View style={styles.optionsContainer}>
          {LANGUAGE_PREFERENCES.map(lang => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.option,
                languagePreferences.includes(lang) && styles.optionSelected,
              ]}
              onPress={() => toggleSelection(lang, languagePreferences, setLanguagePreferences)}>
              <Text
                style={[
                  styles.optionText,
                  languagePreferences.includes(lang) && styles.optionTextSelected,
                ]}>
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Cultural Background */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cultural Background (Optional)</Text>
        <Text style={styles.sectionSubtitle}>
          Help us include diverse music from your culture
        </Text>
        <View style={styles.optionsContainer}>
          {CULTURAL_BACKGROUNDS.map(culture => (
            <TouchableOpacity
              key={culture}
              style={[
                styles.option,
                culturalBackground.includes(culture) && styles.optionSelected,
              ]}
              onPress={() => toggleSelection(culture, culturalBackground, setCulturalBackground)}>
              <Text
                style={[
                  styles.optionText,
                  culturalBackground.includes(culture) && styles.optionTextSelected,
                ]}>
                {culture}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Privacy Notice */}
      <View style={styles.privacyContainer}>
        <Text style={styles.privacyText}>
          🔒 We only use this to personalize recommendations. Data stays on your device and is never shared.
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  optionSelected: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  privacyContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  privacyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingProfileScreen;
