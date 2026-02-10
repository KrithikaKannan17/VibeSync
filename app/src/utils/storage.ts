import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreferences } from '../types';

const STORAGE_KEYS = {
  USER_PREFERENCES: '@user_preferences',
  SEARCH_HISTORY: '@search_history',
};

// User Preferences
export const saveUserPreferences = async (preferences: UserPreferences): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
};

export const getUserPreferences = async (): Promise<UserPreferences | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return null;
  }
};

export const clearUserPreferences = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
  } catch (error) {
    console.error('Error clearing user preferences:', error);
    throw error;
  }
};

// Clear all app data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};

// Check if user has completed onboarding
export const hasCompletedOnboarding = async (): Promise<boolean> => {
  try {
    const preferences = await getUserPreferences();
    return preferences?.hasCompletedOnboarding ?? false;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};
