import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Import screens (will be created next)
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingProfileScreen from '../screens/OnboardingProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import PhotoPreviewScreen from '../screens/PhotoPreviewScreen';
import ResultsScreen from '../screens/ResultsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingProfile"
          component={OnboardingProfileScreen}
          options={{ title: 'Set Up Your Profile', headerLeft: () => null }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Story Song Matcher', headerLeft: () => null }}
        />
        <Stack.Screen
          name="PhotoPreview"
          component={PhotoPreviewScreen}
          options={{ title: 'Your Photo' }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: 'Perfect Songs' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
