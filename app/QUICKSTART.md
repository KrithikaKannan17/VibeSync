# Quick Start Guide

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Get API Keys

#### Google Cloud Vision API (Required)
1. Visit: https://console.cloud.google.com/
2. Create a new project
3. Enable "Cloud Vision API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

#### Spotify Web API (Required)
1. Visit: https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in app name and description
5. Copy your Client ID and Client Secret

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
GOOGLE_CLOUD_VISION_API_KEY=your_actual_api_key_here
SPOTIFY_CLIENT_ID=your_actual_client_id_here
SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
```

**Important**: Replace the placeholder values with your actual API keys!

### 4. Run the App

```bash
# Start the development server
npm start

# Then press:
# - 'i' for iOS simulator
# - 'a' for Android emulator
# - Scan QR code with Expo Go app on your phone
```

## Testing Without API Keys (Limited)

If you want to test the UI without API keys:
1. The app will run but photo analysis will fail
2. You can still navigate through all screens
3. Set up API keys to enable full functionality

## Common Issues

### Issue: "Failed to analyze image"
**Solution**: Check that your Google Cloud Vision API key is correct and the API is enabled

### Issue: "Failed to authenticate with Spotify"
**Solution**: Verify your Spotify Client ID and Client Secret are correct

### Issue: "Module @env not found"
**Solution**: 
1. Make sure `.env` file exists in the root directory
2. Restart the Metro bundler: `npm start --reset-cache`

### Issue: Camera/Gallery not working
**Solution**: Make sure you've granted camera and photo library permissions when prompted

## Next Steps

1. Complete the onboarding flow to set up your profile
2. Upload a photo or take a new one
3. Wait for AI analysis (takes 5-10 seconds)
4. Explore your personalized song recommendations!

## Need Help?

Check the main README.md for detailed documentation or the Help section in the app's Settings screen.
