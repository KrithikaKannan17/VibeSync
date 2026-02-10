# Instagram Story Song Matcher

A cross-platform mobile application (iOS & Android) that analyzes photos users want to post on Instagram Stories and recommends the perfect song with the exact timestamp snippet that matches the photo's vibe.

## Features

- 📸 **Photo Analysis**: Upload photos or take new ones to analyze
- 🤖 **AI-Powered Vibe Detection**: Uses Google Cloud Vision API to detect mood, colors, and scene
- 🎵 **Personalized Recommendations**: Get 5 song recommendations based on your photo and preferences
- ⏱️ **Smart Timestamps**: Discover the perfect 15-second snippet for each song
- 🎧 **Audio Previews**: Listen to song previews before choosing
- 👤 **User Profiles**: Customize recommendations based on age, music taste, and cultural preferences

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

## API Keys Required

This app requires API keys from the following services:

### 1. Google Cloud Vision API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Cloud Vision API
4. Create credentials (API Key)
5. Copy your API key

### 2. Spotify Web API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy your Client ID and Client Secret

## Installation

1. Clone the repository and navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
GOOGLE_CLOUD_VISION_API_KEY=your_google_cloud_vision_api_key_here
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

## Running the App

### Start the development server:
```bash
npm start
```

### Run on iOS:
```bash
npm run ios
```

### Run on Android:
```bash
npm run android
```

### Run on Web (limited functionality):
```bash
npm run web
```

## Project Structure

```
app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── config/          # Configuration files
│   ├── navigation/      # Navigation setup
│   ├── screens/         # App screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── OnboardingProfileScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── PhotoPreviewScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── services/        # API services
│   │   ├── visionService.ts    # Google Vision API integration
│   │   └── spotifyService.ts   # Spotify API integration
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
│       ├── storage.ts   # AsyncStorage helpers
│       └── imageUtils.ts # Image processing utilities
├── assets/              # Images, fonts, etc.
├── .env                 # Environment variables (create this)
├── App.tsx             # Main app component
└── package.json        # Dependencies
```

## How It Works

1. **User Onboarding**: Users set up their profile with age range, music preferences, and cultural background
2. **Photo Upload**: Users select a photo from their gallery or take a new one
3. **AI Analysis**: The photo is analyzed using Google Cloud Vision API to detect:
   - Objects and scenes
   - Colors and mood
   - Facial expressions
   - Overall vibe
4. **Vibe Classification**: The app classifies the photo into categories like:
   - Energetic/Party
   - Chill/Relaxed
   - Romantic
   - Aesthetic/Artsy
   - Fitness/Active
   - Food/Lifestyle
   - Travel/Adventure
   - Nostalgic/Throwback
5. **Song Matching**: Using Spotify's API, the app:
   - Searches for songs matching the detected vibe
   - Filters by audio features (energy, danceability, valence)
   - Personalizes based on user preferences
6. **Timestamp Detection**: For each song, the app analyzes the audio to find:
   - The most energetic section
   - The chorus or hook
   - The perfect 15-second snippet for Instagram Stories
7. **Results**: Users get 5 ranked recommendations with:
   - Song name and artist
   - Album artwork
   - Match score
   - Recommended timestamp
   - Audio preview
   - Explanation of why it matches

## Privacy & Data

- Photos are only sent to Google Vision API for analysis and are not stored
- User preferences are stored locally on the device using AsyncStorage
- No data is shared with third parties
- Users can delete all data from the Settings screen

## Technologies Used

- **React Native** with **TypeScript** for cross-platform development
- **Expo** for easier development and deployment
- **React Navigation** for navigation
- **Google Cloud Vision API** for image analysis
- **Spotify Web API** for music recommendations and audio analysis
- **AsyncStorage** for local data persistence
- **Expo AV** for audio playback

## Troubleshooting

### API Key Issues
- Make sure your `.env` file is in the root directory
- Verify your API keys are correct and have the necessary permissions
- For Google Cloud Vision: Ensure the API is enabled in your project
- For Spotify: Make sure your app is not in development mode restrictions

### Image Picker Issues
- On iOS: Ensure you've granted camera and photo library permissions
- On Android: Check that permissions are declared in app.json

### Audio Playback Issues
- Some songs may not have preview URLs available
- Preview URLs from Spotify are 30-second clips

## Future Enhancements

- Direct Instagram integration (when API becomes available)
- Video analysis for Instagram Reels
- Social features (share recommendations with friends)
- AI-generated vibe descriptions using GPT
- Collaborative playlists
- Trending songs dashboard

## License

This project is for educational purposes.

## Credits

- Google Cloud Vision API for image analysis
- Spotify Web API for music data and recommendations
- React Native and Expo communities

## Support

For issues or questions, please check the Help section in the app's Settings screen.
