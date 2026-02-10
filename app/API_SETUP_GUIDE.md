# API Setup Guide

This guide will walk you through setting up the required API keys for the Story Song Matcher app.

## Table of Contents
1. [Google Cloud Vision API Setup](#google-cloud-vision-api-setup)
2. [Spotify Web API Setup](#spotify-web-api-setup)
3. [Configuring the App](#configuring-the-app)
4. [Testing Your Setup](#testing-your-setup)
5. [Troubleshooting](#troubleshooting)

---

## Google Cloud Vision API Setup

### Step 1: Create a Google Cloud Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Accept the terms of service if prompted

### Step 2: Create a New Project
1. Click on the project dropdown at the top of the page
2. Click "New Project"
3. Enter a project name (e.g., "story-song-matcher")
4. Click "Create"
5. Wait for the project to be created (takes a few seconds)
6. Select your new project from the dropdown

### Step 3: Enable Cloud Vision API
1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Cloud Vision API"
3. Click on "Cloud Vision API"
4. Click the "Enable" button
5. Wait for the API to be enabled

### Step 4: Create API Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Your API key will be created and displayed
4. **Important**: Copy this key immediately and save it securely
5. (Optional but recommended) Click "Restrict Key":
   - Under "API restrictions", select "Restrict key"
   - Select "Cloud Vision API" from the dropdown
   - Click "Save"

### Step 5: Enable Billing (Required)
1. Go to "Billing" in the left sidebar
2. Link a billing account (credit card required)
3. Don't worry: Google provides $300 in free credits for new users
4. Cloud Vision API offers 1,000 free requests per month

### Cost Information
- **Free Tier**: 1,000 requests/month
- **After Free Tier**: $1.50 per 1,000 images
- For a small app, you'll likely stay within the free tier

---

## Spotify Web API Setup

### Step 1: Create a Spotify Account
1. If you don't have one, create a free account at [Spotify](https://www.spotify.com)
2. You don't need Spotify Premium for API access

### Step 2: Access Spotify Developer Dashboard
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Accept the Terms of Service if prompted

### Step 3: Create a New App
1. Click "Create an App"
2. Fill in the form:
   - **App name**: "Story Song Matcher" (or your preferred name)
   - **App description**: "Mobile app that recommends songs for Instagram Stories based on photo analysis"
   - **Website**: Leave blank or add your website if you have one
   - **Redirect URI**: `exp://localhost:19000` (for development)
3. Check the boxes to agree to terms
4. Click "Create"

### Step 4: Get Your Credentials
1. You'll be taken to your app's dashboard
2. Click "Settings" in the top right
3. You'll see:
   - **Client ID**: Copy this
   - **Client Secret**: Click "View client secret" and copy it
4. **Important**: Keep these credentials secure and never share them publicly

### Step 5: Configure App Settings (Optional)
1. In Settings, you can add:
   - App icon
   - Additional redirect URIs (for production)
   - User management settings

### API Limits
- **Free**: 10,000 requests per day
- Rate limits apply but are generous for most use cases
- No credit card required

---

## Configuring the App

### Step 1: Create .env File
1. Navigate to your app directory:
   ```bash
   cd app
   ```

2. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

3. Open `.env` in your text editor

### Step 2: Add Your API Keys
Copy and paste the following into your `.env` file, replacing the placeholder values with your actual keys:

```env
# Google Cloud Vision API
GOOGLE_CLOUD_VISION_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Spotify API
SPOTIFY_CLIENT_ID=your_32_character_client_id_here
SPOTIFY_CLIENT_SECRET=your_32_character_client_secret_here
```

### Step 3: Verify .env File
Make sure:
- There are no spaces around the `=` sign
- No quotes around the values
- No extra blank lines
- File is named exactly `.env` (with the dot at the start)

### Step 4: Restart Development Server
If your app is already running:
```bash
# Stop the current server (Ctrl+C)
# Then restart with cache cleared
npm start --reset-cache
```

---

## Testing Your Setup

### Test 1: Check Environment Variables
Add this temporary code to `App.tsx` to verify your keys are loaded:

```typescript
import { GOOGLE_CLOUD_VISION_API_KEY, SPOTIFY_CLIENT_ID } from '@env';

console.log('Vision API Key loaded:', !!GOOGLE_CLOUD_VISION_API_KEY);
console.log('Spotify Client ID loaded:', !!SPOTIFY_CLIENT_ID);
```

You should see `true` for both in your console.

### Test 2: Test Google Vision API
1. Run the app
2. Complete onboarding
3. Upload a photo
4. Click "Analyze & Find Songs"
5. If successful, you'll see "Analyzing your photo..." followed by song recommendations

### Test 3: Test Spotify API
1. After photo analysis completes
2. You should see 5 song recommendations
3. Try playing a preview
4. If successful, audio should play

---

## Troubleshooting

### Problem: "Module @env not found"

**Solution:**
1. Make sure `.env` file exists in the root directory
2. Restart Metro bundler with cache cleared:
   ```bash
   npm start --reset-cache
   ```
3. If still not working, reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

### Problem: "Failed to analyze image" Error

**Possible Causes:**
1. **Invalid API Key**
   - Double-check your Google Cloud Vision API key
   - Make sure there are no extra spaces
   - Verify the key hasn't been deleted in Google Cloud Console

2. **API Not Enabled**
   - Go to Google Cloud Console
   - Verify Cloud Vision API is enabled for your project

3. **Billing Not Enabled**
   - Cloud Vision API requires billing to be enabled
   - Even with free tier, you need to add a payment method

4. **API Restrictions**
   - If you restricted your API key, make sure Cloud Vision API is allowed
   - Check that there are no IP restrictions blocking your requests

### Problem: "Failed to authenticate with Spotify"

**Possible Causes:**
1. **Invalid Credentials**
   - Verify your Client ID and Client Secret
   - Make sure you copied them correctly (they're 32 characters each)

2. **App Not Created**
   - Make sure you created an app in Spotify Developer Dashboard
   - The app must be in "Development" mode (default)

3. **Network Issues**
   - Check your internet connection
   - Try again in a few minutes

### Problem: "Preview not available" for songs

**This is normal:**
- Not all songs on Spotify have preview URLs
- This is a Spotify limitation, not an app issue
- The app will show "Preview not available" for these songs

### Problem: API Quota Exceeded

**Google Vision API:**
- Free tier: 1,000 requests/month
- If exceeded, you'll be charged or requests will fail
- Monitor usage in Google Cloud Console

**Spotify API:**
- Free tier: 10,000 requests/day
- Rate limits apply
- If exceeded, wait 24 hours or upgrade

---

## Security Best Practices

### DO:
✅ Keep your `.env` file in `.gitignore`
✅ Never commit API keys to version control
✅ Use environment variables for all sensitive data
✅ Restrict API keys to specific APIs in production
✅ Monitor API usage regularly
✅ Rotate keys if compromised

### DON'T:
❌ Share API keys publicly
❌ Commit `.env` file to Git
❌ Hardcode API keys in source code
❌ Use the same keys for development and production
❌ Leave API keys unrestricted

---

## Production Considerations

For production deployment, consider:

1. **Backend Proxy Server**
   - Create a simple Node.js backend
   - Store API keys server-side
   - Mobile app calls your backend
   - Backend calls Google/Spotify APIs
   - This prevents API keys from being extracted from the mobile app

2. **API Key Rotation**
   - Regularly rotate your API keys
   - Have a plan for updating keys without app downtime

3. **Monitoring**
   - Set up alerts for API usage
   - Monitor costs
   - Track error rates

4. **Rate Limiting**
   - Implement client-side rate limiting
   - Cache results when possible
   - Handle rate limit errors gracefully

---

## Getting Help

If you're still having issues:

1. Check the main README.md for general troubleshooting
2. Review the error messages carefully
3. Check the console logs for detailed error information
4. Verify your API keys are correct
5. Make sure billing is enabled for Google Cloud
6. Try with a fresh project/app in the respective consoles

## Useful Links

- [Google Cloud Vision API Documentation](https://cloud.google.com/vision/docs)
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Expo Environment Variables Guide](https://docs.expo.dev/guides/environment-variables/)
- [React Native Dotenv Documentation](https://github.com/goatandsheep/react-native-dotenv)
