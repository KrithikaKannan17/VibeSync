# Deployment Guide

## Building for Production

### iOS Deployment (App Store)

#### Prerequisites
- Apple Developer Account ($99/year)
- Mac with Xcode installed
- Valid provisioning profiles and certificates

#### Steps

1. **Configure app.json**
   - Update `ios.bundleIdentifier` to your unique identifier
   - Set appropriate version numbers

2. **Build for iOS**
   ```bash
   # Using EAS Build (recommended)
   npm install -g eas-cli
   eas login
   eas build:configure
   eas build --platform ios
   ```

3. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

4. **App Store Connect**
   - Log in to App Store Connect
   - Complete app metadata:
     - App name: "Story Song Matcher"
     - Subtitle: "Perfect songs for your stories"
     - Description: See below
     - Keywords: instagram, music, songs, stories, AI, recommendations
     - Category: Photo & Video or Music
     - Age rating: 12+ (due to music content)
   - Upload screenshots (required sizes)
   - Set pricing (Free recommended)
   - Submit for review

### Android Deployment (Google Play Store)

#### Prerequisites
- Google Play Developer Account ($25 one-time fee)
- Android Studio (for testing)

#### Steps

1. **Configure app.json**
   - Update `android.package` to your unique identifier
   - Set appropriate version numbers

2. **Build for Android**
   ```bash
   # Using EAS Build (recommended)
   eas build --platform android
   ```

3. **Submit to Google Play**
   ```bash
   eas submit --platform android
   ```

4. **Google Play Console**
   - Log in to Google Play Console
   - Create new app
   - Complete store listing:
     - App name: "Story Song Matcher"
     - Short description: "Find perfect songs for Instagram Stories"
     - Full description: See below
     - Category: Photography or Music & Audio
     - Content rating: Complete questionnaire
   - Upload screenshots and feature graphic
   - Set pricing (Free recommended)
   - Submit for review

## App Store Descriptions

### Short Description (80 characters)
Find the perfect song and timestamp for your Instagram Story based on AI analysis

### Full Description

**Transform Your Instagram Stories with Perfect Music**

Story Song Matcher uses AI to analyze your photos and recommend the perfect songs with exact timestamps for your Instagram Stories.

**How It Works:**
📸 Upload or take a photo
🤖 AI analyzes the vibe, colors, and mood
🎵 Get 5 personalized song recommendations
⏱️ Discover the perfect 15-second snippet for each song
🎧 Preview songs before choosing

**Features:**
• Smart photo analysis using advanced AI
• Personalized recommendations based on your music taste
• Exact timestamp suggestions for the best part of each song
• Audio previews to help you choose
• Support for multiple music genres and languages
• Privacy-focused: your data stays on your device

**Perfect For:**
• Instagram creators and influencers
• Anyone who wants their stories to stand out
• Music lovers looking for the perfect soundtrack
• People who struggle to find the right song

**Privacy & Security:**
Your photos are only used for analysis and never stored. All preferences are kept locally on your device. No data is shared with third parties.

**Requirements:**
• Internet connection for song recommendations
• Camera/photo library access for photo upload

Make your Instagram Stories unforgettable with the perfect song match!

## Screenshots Required

### iOS
- 6.7" (iPhone 15 Pro Max): 1290 x 2796 pixels
- 6.5" (iPhone 11 Pro Max): 1242 x 2688 pixels
- 5.5" (iPhone 8 Plus): 1242 x 2208 pixels

### Android
- Phone: 1080 x 1920 pixels (minimum)
- 7" Tablet: 1024 x 1920 pixels
- 10" Tablet: 1200 x 1920 pixels

### Screenshot Ideas
1. Welcome screen showing app features
2. Photo upload interface
3. Analysis in progress
4. Song recommendations with timestamps
5. Audio preview player
6. Settings/profile screen

## App Icon Requirements

### iOS
- 1024x1024 pixels (App Store)
- PNG format, no transparency
- No rounded corners (iOS adds them)

### Android
- 512x512 pixels (Google Play)
- PNG format
- Adaptive icon with foreground and background layers

## Privacy Policy & Terms

You'll need to host a privacy policy and terms of service. Key points to include:

**Privacy Policy:**
- What data is collected (user preferences, photo analysis)
- How data is used (personalization, recommendations)
- Third-party services (Google Vision API, Spotify API)
- Data retention (local storage only)
- User rights (delete data anytime)

**Terms of Service:**
- Acceptable use
- API usage limitations
- Disclaimer about Instagram integration
- Copyright and music licensing
- Age restrictions

## API Key Management for Production

### Important Security Considerations

1. **Never commit API keys to version control**
   - Use environment variables
   - Add .env to .gitignore

2. **Backend Proxy (Recommended)**
   For production, create a simple backend to hide API keys:
   
   ```javascript
   // Example Node.js/Express backend
   const express = require('express');
   const app = express();
   
   app.post('/api/analyze-image', async (req, res) => {
     // Call Google Vision API with server-side key
     // Return results to app
   });
   
   app.post('/api/get-songs', async (req, res) => {
     // Call Spotify API with server-side credentials
     // Return results to app
   });
   ```

3. **API Key Restrictions**
   - Google Cloud: Restrict API key to specific APIs
   - Spotify: Set up proper redirect URIs

## Testing Before Release

### Checklist
- [ ] Test on multiple device sizes
- [ ] Test on iOS and Android
- [ ] Test with poor internet connection
- [ ] Test camera and gallery permissions
- [ ] Test audio playback
- [ ] Test with various photo types
- [ ] Verify API keys work in production build
- [ ] Test error handling
- [ ] Check memory usage
- [ ] Verify all links work
- [ ] Test data deletion
- [ ] Proofread all text

## Post-Launch

### Monitoring
- Set up crash reporting (Sentry, Firebase Crashlytics)
- Monitor API usage and costs
- Track user feedback and ratings
- Monitor app performance

### Updates
- Respond to user feedback
- Fix bugs promptly
- Add new features based on user requests
- Keep dependencies updated
- Monitor API changes from Google and Spotify

## Cost Considerations

### Google Cloud Vision API
- First 1,000 requests/month: Free
- After that: $1.50 per 1,000 images
- Budget accordingly based on expected users

### Spotify Web API
- Free for non-commercial use
- Rate limits apply
- Consider caching results

### App Store Fees
- Apple: $99/year developer account
- Google: $25 one-time fee

## Legal Considerations

1. **Music Licensing**: You're using Spotify's API which handles licensing
2. **Instagram Trademark**: Don't claim official affiliation
3. **User Data**: Comply with GDPR, CCPA if applicable
4. **Age Restrictions**: Set appropriate age ratings
5. **Content Policy**: Follow app store guidelines

## Support & Maintenance

Set up support channels:
- Email support address
- FAQ section in app
- Social media presence (optional)
- User feedback mechanism

Plan for ongoing maintenance:
- Bug fixes
- OS updates compatibility
- API updates
- Feature enhancements
