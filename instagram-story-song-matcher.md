# PROJECT: Instagram Story Song Matcher - Cross-Platform Mobile App

## OVERVIEW
Build a cross-platform mobile application (iOS & Android) that analyzes photos users want to post on Instagram Stories and recommends the perfect song with the exact timestamp snippet (e.g., 0:45-1:00) that matches the photo's vibe, considering user demographics and cultural preferences.

## PHASE 1: PROJECT SETUP & ARCHITECTURE

### Framework Selection
- Use React Native with Expo for cross-platform development (iOS & Android from single codebase)
- Alternatively, use Flutter if preferred, but React Native recommended for easier integration with JavaScript-based APIs
- Set up TypeScript for type safety
- Initialize project with expo-cli or react-native-cli

### Project Structure
- Create modular folder structure: `/src` with subfolders for `/screens`, `/components`, `/services`, `/utils`, `/assets`, `/config`
- Set up navigation using React Navigation (stack navigator for main flow)
- Configure environment variables for API keys (.env file)

### Development Environment
- Set up ESLint and Prettier for code consistency
- Configure debugging tools for both iOS (Xcode) and Android (Android Studio)
- Set up version control with Git

## PHASE 2: USER INTERFACE & ONBOARDING

### Onboarding Flow
Create welcome screen explaining the app's purpose

**Build user profile setup screen collecting:**
- Age range (dropdown: 13-17, 18-24, 25-34, 35-44, 45+)
- Cultural background/ethnicity (optional, multi-select with "Prefer not to say" option)
- Music preferences (genres they typically listen to: Pop, Hip-Hop, R&B, Rock, EDM, Latin, K-Pop, Indie, etc.)
- Language preferences for songs (English, Spanish, Korean, etc.)

Include clear privacy disclosure: "We only use this to personalize recommendations. Data stays on your device and is never shared."

Store user preferences locally using AsyncStorage or SecureStore

### Main App Screens

**Home Screen:** Simple, clean interface with:
- Large "Choose Photo" button (camera icon)
- Option to select from gallery or take new photo
- Small settings icon in top-right
- Brief instruction text: "Upload your story photo and we'll find the perfect song"

**Photo Preview Screen:** After selection:
- Display selected photo prominently
- "Analyze & Find Songs" button
- Loading indicator during analysis
- Option to go back and choose different photo

**Results Screen:**
- Show top 3-5 song recommendations as cards
- Each card displays: Song name, artist, album art, recommended timestamp
- Audio preview player for each suggestion (15-second clip at recommended timestamp)
- "Why this song?" explanation (e.g., "This sunset vibe matches the dreamy, nostalgic feel of this chorus")
- "Use in Instagram" button (explains how to manually select in IG)
- Ability to refresh for more suggestions

**Settings Screen:**
- Edit user preferences
- Privacy policy
- Clear stored data option
- About/Help section

## PHASE 3: PHOTO ANALYSIS & VIBE DETECTION

### Image Upload & Processing
- Implement image picker using expo-image-picker or react-native-image-picker
- Add image compression before upload (resize to max 1024px width to save bandwidth)
- Convert image to base64 for API transmission

### Computer Vision Integration

**Option A (Recommended): Google Cloud Vision API**
- Set up Google Cloud project and enable Vision API
- Implement API calls for label detection, object detection, and face detection
- Extract features: objects (sunset, beach, food, party, etc.), colors (dominant color palette), scene type (indoor/outdoor), number of people, facial expressions (happy, serious)
- Parse response to identify vibe categories

**Option B: AWS Rekognition**
- Similar setup but with AWS SDK
- Use DetectLabels and DetectFaces endpoints

**Option C: Azure Computer Vision**
- Microsoft Azure Cognitive Services
- Analyze API for comprehensive image analysis

### Vibe Classification Logic
Create a vibe scoring system that maps detected elements to mood categories:
- **Energetic/Party:** nightclub, dancing, crowd, bright lights, alcohol, friends
- **Chill/Relaxed:** sunset, beach, nature, coffee, book, pet
- **Romantic:** couple, flowers, candlelight, heart, date setting
- **Aesthetic/Artsy:** architecture, art, museum, urban, fashion
- **Fitness/Active:** gym, sports, running, yoga, hiking
- **Food/Lifestyle:** restaurant, cooking, food close-up, brunch
- **Travel/Adventure:** landmarks, airplane, mountains, exotic location
- **Nostalgic/Throwback:** vintage filter, old photos, childhood items

Use weighted scoring based on confidence levels from Vision API

Consider dominant colors (warm tones = cozy/romantic, cool tones = calm/melancholic, vibrant = energetic)

Create a JSON vibe profile: `{primary: "chill", secondary: "romantic", energy_level: 0.3, color_mood: "warm"}`

## PHASE 4: MUSIC RECOMMENDATION ENGINE

### Music Database & API Integration

**Primary Option: Spotify Web API**
- Register app on Spotify Developer Dashboard
- Implement OAuth 2.0 authentication flow
- Use client credentials for app-level access

**Key endpoints to use:**
- `/v1/search` - search for tracks by genre, mood
- `/v1/recommendations` - get recommendations based on seed tracks/genres
- `/v1/audio-features` - get track characteristics (danceability, energy, valence)
- `/v1/audio-analysis` - get detailed audio analysis including segments

**Alternative:** Apple Music API (if targeting iOS primarily)

**Fallback:** Build curated database of popular Instagram-friendly songs with pre-tagged moods

### Vibe-to-Music Mapping Algorithm
Create mapping rules from vibe profiles to Spotify search parameters:
- **Energetic/Party** → genres: dance, pop, hip-hop | audio features: high energy (0.7-1.0), high danceability (0.7-1.0)
- **Chill/Relaxed** → genres: indie, acoustic, lo-fi | audio features: low energy (0.2-0.5), medium valence
- **Romantic** → genres: R&B, soul, ballad | audio features: medium energy, high valence (happiness)
- **Aesthetic/Artsy** → genres: indie, alternative, electronic | audio features: varied

Implement search query builder:
```
For "chill sunset" vibe:
  - Search genres: indie, acoustic, chill
  - Filter by audio features: energy < 0.5, valence 0.4-0.7
  - Tempo: 80-120 BPM
```

### Demographic & Cultural Personalization
Layer user preferences on top of vibe matching:
- If user selected "18-24" + "Hip-Hop preference" + "Energetic party photo" → prioritize current trending hip-hop/rap
- If user selected "25-34" + "Latin background" + "Romantic photo" → include reggaeton, bachata, Spanish R&B
- If user selected "K-Pop preference" → include K-Pop tracks even for non-Asian specific vibes

Create genre weight modifiers based on demographics:
- **Age 13-17:** +weight to viral TikTok songs, trending artists
- **Age 18-24:** +weight to current charts, festival favorites
- **Age 25-34:** +weight to nostalgic hits from 2010s mixed with current
- **Age 35+:** +weight to classics, timeless hits

Cultural considerations (implement sensitively):
- Don't assume based on ethnicity alone - use their stated music preferences
- If user selected specific cultural background, include representative artists as options (not exclusively)
- Allow users to toggle "Include diverse music from my culture" in settings

### Recommendation Ranking System
Score each candidate song (0-100) based on:
- **Vibe match accuracy (40 points):** how well audio features match detected vibe
- **User preference alignment (30 points):** matches stated genre/artist preferences
- **Popularity/recency (20 points):** currently trending, released within last 2 years
- **Instagram compatibility (10 points):** available in Instagram's music library (if detectable)

Return top 5 highest-scoring tracks

Ensure diversity in results (don't show 5 songs from same artist)

## PHASE 5: TIMESTAMP DETECTION - THE KILLER FEATURE

### Audio Analysis for "Best Part" Detection
Use Spotify's Audio Analysis API (`/v1/audio-analysis/{id}`) which provides:
- **Segments:** granular breakdown of the song with loudness, pitch, timbre
- **Sections:** larger structural components (verse, chorus, bridge)
- **Tatums, beats, bars:** rhythmic elements

### Peak Moment Algorithm
Implement algorithm to find the most "Instagram-worthy" 15-second snippet:

**Method 1: Chorus Detection**
- Identify sections marked as "chorus" or repeated sections
- Find the first or most energetic chorus
- Select 15 seconds starting 2-3 seconds before peak moment

**Method 2: Energy Peak Analysis**
- Calculate rolling average of loudness across segments
- Find the highest sustained energy period lasting at least 15 seconds
- Avoid the very beginning (first 10 seconds) and end (last 15 seconds) of song

**Method 3: Lyrical Hook Detection (advanced)**
- If lyrics API available (Musixmatch, Genius), identify repeated phrases
- Time-sync to audio analysis to find catchiest lyrical moment

**Method 4: Structural Analysis**
- For typical pop song structure: recommend timestamp around 0:45-1:15 (usually chorus after first verse)
- For hip-hop: find the hookiest bar or pre-chorus moment
- For EDM: find the drop or build-up peak

### Timestamp Calculation
- Return specific start time in seconds (e.g., 47.3 seconds)
- Calculate end time (start + 15 seconds for Instagram stories)
- Format for display: "0:47 - 1:02"
- Store reasoning: "This timestamp captures the energetic chorus where the beat drops"

### Audio Preview Implementation
- Use Spotify's 30-second preview URLs (available in track objects)
- If preview URL available, extract and play the recommended 15-second segment
- Implement audio player with:
  - Play/pause button for each recommendation
  - Waveform visualization (optional, use library like react-native-audio-waveform)
  - Visual indicator showing which 15 seconds is recommended
- Handle case where preview URL is not available (show "Preview not available")

## PHASE 6: INSTAGRAM INTEGRATION & USER FLOW

### Instagram Music Library Awareness
**Important limitation:** You cannot directly access Instagram's music library API (not publicly available)

Instead, provide songs that are highly likely to be available:
- Focus on major label releases
- Recent popular songs
- Avoid obscure or indie releases less likely in IG library

### "Use in Instagram" Guidance
Since you can't directly integrate, create helpful UI flow:
- Show clear instructions: "Copy the song name and search for it in Instagram"
- Provide exact timestamp: "Use the section from 0:47 to 1:02"
- Optional: "Copy Song Name" button to clipboard
- Optional: Deep link to Instagram app (open Instagram, though you can't pre-populate the song)
- Future enhancement: If Instagram ever opens music API, integrate directly

## PHASE 7: DATA STORAGE & PRIVACY

### Local Data Storage
Use AsyncStorage (React Native) or SharedPreferences (Flutter) for:
- User preferences (age, cultural background, music tastes)
- Search history (last 10 analyzed photos + recommendations)
- Favorite song picks

**Do NOT store:**
- Actual photo files (delete after analysis)
- Personal identifying information
- Any data uploaded to external servers beyond API calls

### Privacy Implementation
Create clear privacy policy screen explaining:
- Photos are only sent to Vision API for analysis and immediately deleted
- User preferences stored locally on device
- No data sold or shared with third parties
- Users can delete all data anytime from settings

Implement data deletion function that clears all AsyncStorage

Add consent checkbox during onboarding

Include "Delete My Data" button in settings

### API Key Security
- Never hardcode API keys in source code
- Use environment variables for all keys
- For production, implement backend proxy server to hide keys:
  - Create simple Node.js/Express backend
  - App calls your backend, backend calls Google Vision/Spotify APIs
  - Protects keys from being extracted from mobile app

## PHASE 8: ERROR HANDLING & EDGE CASES

### Graceful Degradation
Handle API failures:
- **If Vision API fails:** Allow manual vibe selection (user picks from preset moods)
- **If Spotify API fails:** Show cached/fallback recommendations
- **Network timeout errors:** Show friendly message "Check your connection and try again"

Handle ambiguous photos:
- **If Vision API returns low-confidence results:** Ask user "What vibe are you going for?" with mood buttons
- **If no clear vibe detected:** Default to user's favorite genres from preferences

Handle music availability:
- Warn users that some songs may not be available in their region's Instagram library
- Provide 5 recommendations to increase chance of availability

### Loading States
Show appropriate loading indicators:
- "Analyzing your photo..." (3-5 seconds for Vision API)
- "Finding perfect songs..." (2-3 seconds for Spotify search)
- "Detecting best moments..." (1-2 seconds for audio analysis)

Add skeleton screens for better UX during loading

## PHASE 9: TESTING & OPTIMIZATION

### Test Cases
- Test with diverse photo types: selfies, landscapes, food, group photos, night scenes, artsy shots
- Test with different user demographic combinations
- Test with poor internet connection
- Test with photos that have no clear vibe (random objects)
- Test audio playback on different devices
- Test on both iOS and Android

### Performance Optimization
- Compress images before upload (max 1MB)
- Cache Spotify search results for common vibes
- Lazy load album artwork images
- Optimize re-renders in React
- Test memory usage with multiple photo analyses

## PHASE 10: DEPLOYMENT PREPARATION

### App Store Requirements
- Create app icons for iOS (multiple sizes) and Android (adaptive icons)
- Write app description emphasizing: "Find the perfect song and timestamp for your Instagram Story based on your photo's vibe"
- Create screenshots showing the flow: photo selection → analysis → song recommendations
- Set up app categories: Photo & Video, Lifestyle, or Music

### iOS App Store
- Configure app in App Store Connect
- Handle Apple's privacy requirements (privacy nutrition label)
- Set age rating (likely 12+ due to music content)
- Prepare for review (ensure no Instagram trademark violations in marketing)

### Google Play Store
- Configure app in Google Play Console
- Complete Data Safety section
- Prepare feature graphic and screenshots
- Set content rating

### Legal Considerations
- Ensure compliance with Spotify API terms of service
- Don't claim official affiliation with Instagram
- Include proper attribution for third-party services
- Terms of Service and Privacy Policy URLs required for app stores

## PHASE 11: FUTURE ENHANCEMENTS (OPTIONAL)

Advanced Features to Consider Later:
- AI-generated vibe descriptions using GPT API
- Video analysis (for Instagram Reels recommendations)
- Collaborative playlists (share your vibe-based recommendations)
- Social features (see what songs friends chose for similar photos)
- Direct integration with Instagram if API becomes available
- Multiple photo analysis (for carousel posts)
- Mood-based playlist generation
- Song lyrics overlay suggestions
- Trending songs dashboard

## TECH STACK SUMMARY

- **Frontend:** React Native + TypeScript + Expo
- **Navigation:** React Navigation
- **State Management:** React Context API or Redux (if app grows)
- **Storage:** AsyncStorage or Expo SecureStore
- **Image Handling:** expo-image-picker, react-native-image-resizer
- **Audio Playback:** expo-av or react-native-sound
- **APIs:** Google Cloud Vision, Spotify Web API
- **Backend (Optional):** Node.js + Express (for API key protection)
- **Deployment:** Apple App Store, Google Play Store

## DEVELOPMENT ORDER

1. Set up project and basic navigation structure
2. Build UI screens (onboarding, home, results)
3. Implement image picker and preview
4. Integrate Google Vision API for photo analysis
5. Build vibe classification logic
6. Integrate Spotify API for song search
7. Implement recommendation algorithm
8. Build timestamp detection using audio analysis
9. Add audio preview functionality
10. Implement user preferences and storage
11. Add error handling and loading states
12. Test extensively on both platforms
13. Polish UI/UX
14. Prepare for app store submission
