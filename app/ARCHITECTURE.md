# Architecture Documentation

## System Architecture Overview

The Story Song Matcher app follows a modular, service-oriented architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                         Mobile App                          │
│                    (React Native + Expo)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Screens    │  │ Components   │  │  Navigation  │    │
│  │              │  │              │  │              │    │
│  │ - Welcome    │  │ - Reusable   │  │ - Stack      │    │
│  │ - Onboarding │  │   UI pieces  │  │   Navigator  │    │
│  │ - Home       │  │              │  │              │    │
│  │ - Preview    │  │              │  │              │    │
│  │ - Results    │  │              │  │              │    │
│  │ - Settings   │  │              │  │              │    │
│  └──────┬───────┘  └──────────────┘  └──────────────┘    │
│         │                                                  │
│  ┌──────▼──────────────────────────────────────────────┐  │
│  │              Services Layer                         │  │
│  │  ┌─────────────────┐    ┌─────────────────┐       │  │
│  │  │ Vision Service  │    │ Spotify Service │       │  │
│  │  │                 │    │                 │       │  │
│  │  │ - Image         │    │ - Auth          │       │  │
│  │  │   Analysis      │    │ - Search        │       │  │
│  │  │ - Vibe          │    │ - Audio         │       │  │
│  │  │   Detection     │    │   Analysis      │       │  │
│  │  └────────┬────────┘    └────────┬────────┘       │  │
│  └───────────┼──────────────────────┼─────────────────┘  │
│              │                      │                     │
│  ┌───────────▼──────────────────────▼─────────────────┐  │
│  │              Utils Layer                           │  │
│  │  ┌─────────────┐    ┌──────────────┐             │  │
│  │  │   Storage   │    │ Image Utils  │             │  │
│  │  │             │    │              │             │  │
│  │  │ - Save      │    │ - Pick       │             │  │
│  │  │ - Load      │    │ - Compress   │             │  │
│  │  │ - Delete    │    │ - Convert    │             │  │
│  │  └─────────────┘    └──────────────┘             │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │           Local Storage (AsyncStorage)            │  │
│  │  - User Preferences                               │  │
│  │  - Search History                                 │  │
│  └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
┌────────────────┐                  ┌─────────────────┐
│  Google Cloud  │                  │  Spotify Web    │
│  Vision API    │                  │      API        │
│                │                  │                 │
│ - Image        │                  │ - Search        │
│   Analysis     │                  │ - Recommend     │
│ - Labels       │                  │ - Audio         │
│ - Objects      │                  │   Features      │
│ - Colors       │                  │ - Audio         │
│ - Faces        │                  │   Analysis      │
└────────────────┘                  └─────────────────┘
```

## Data Flow

### 1. User Onboarding Flow

```
User Opens App
    │
    ▼
Check if onboarding completed
    │
    ├─ Yes ──────────────────────────┐
    │                                 │
    ▼                                 ▼
Show Onboarding              Navigate to Home
    │
    ▼
Collect User Preferences
    │
    ▼
Save to AsyncStorage
    │
    ▼
Navigate to Home
```

### 2. Photo Analysis Flow

```
User Selects Photo
    │
    ├─ From Gallery ──┐
    │                 │
    ├─ From Camera ───┤
    │                 │
    ▼                 ▼
Request Permissions
    │
    ▼
Get Image URI
    │
    ▼
Navigate to Preview Screen
    │
    ▼
User Clicks "Analyze"
    │
    ▼
Convert Image to Base64
    │
    ▼
Send to Google Vision API
    │
    ▼
Receive Analysis Results
    │
    ├─ Labels
    ├─ Objects
    ├─ Colors
    └─ Faces
    │
    ▼
Classify Vibe
    │
    ├─ Calculate vibe scores
    ├─ Determine energy level
    ├─ Analyze color mood
    └─ Generate confidence score
    │
    ▼
Load User Preferences
    │
    ▼
Search Songs via Spotify API
    │
    ├─ Map vibe to genres
    ├─ Set audio feature targets
    ├─ Apply user preferences
    └─ Get recommendations
    │
    ▼
For Each Song:
    │
    ├─ Get Audio Features
    ├─ Get Audio Analysis
    ├─ Find Best Timestamp
    ├─ Calculate Match Score
    └─ Generate Explanation
    │
    ▼
Rank and Filter Top 5
    │
    ▼
Navigate to Results Screen
```

### 3. Results Interaction Flow

```
Display Song Recommendations
    │
    ├─ User Clicks Preview ──────────┐
    │                                 │
    ├─ User Clicks Copy ─────────────┤
    │                                 │
    ├─ User Clicks Spotify ──────────┤
    │                                 │
    └─ User Clicks Done ─────────────┤
                                      │
                                      ▼
                            Handle User Action
                                      │
                                      ▼
                            Navigate to Home
```

## Component Hierarchy

```
App
└── AppNavigator
    ├── WelcomeScreen
    │   └── FeatureItem (inline component)
    │
    ├── OnboardingProfileScreen
    │   ├── Age Range Selector
    │   ├── Music Preferences Selector
    │   ├── Language Preferences Selector
    │   └── Cultural Background Selector
    │
    ├── HomeScreen
    │   ├── Settings Button
    │   ├── Choose from Gallery Button
    │   └── Take Photo Button
    │
    ├── PhotoPreviewScreen
    │   ├── Image Display
    │   ├── Analyze Button
    │   └── Loading Indicator
    │
    ├── ResultsScreen
    │   ├── Photo Preview
    │   ├── Song Cards (map)
    │   │   ├── Album Art
    │   │   ├── Song Info
    │   │   ├── Timestamp Display
    │   │   ├── Explanation
    │   │   ├── Action Buttons
    │   │   │   ├── Preview
    │   │   │   ├── Copy
    │   │   │   └── Spotify
    │   │   └── Instructions
    │   └── Done Button
    │
    └── SettingsScreen
        ├── Preferences Display
        ├── Edit Button
        ├── Information Links
        └── Delete Data Button
```

## Service Layer Details

### Vision Service (`visionService.ts`)

**Purpose**: Handles all Google Cloud Vision API interactions and vibe classification.

**Key Functions**:
- `analyzeImage(base64Image)`: Sends image to Vision API
- `classifyVibe(visionData)`: Converts API response to vibe profile
- `determineColorMood(colors)`: Analyzes dominant colors
- `getManualVibeOptions()`: Returns available vibe categories

**Data Structures**:
```typescript
VisionAPIResponse {
  labels: Array<{description, score}>
  objects: Array<{name, score}>
  colors: Array<{color, score, pixelFraction}>
  faces: Array<{joyLikelihood, sorrowLikelihood, angerLikelihood}>
}

VibeProfile {
  primary: string
  secondary: string
  energyLevel: number (0-1)
  colorMood: 'warm' | 'cool' | 'vibrant' | 'neutral'
  confidence: number (0-1)
  detectedElements: string[]
}
```

### Spotify Service (`spotifyService.ts`)

**Purpose**: Handles all Spotify API interactions including authentication, search, and audio analysis.

**Key Functions**:
- `getAccessToken()`: Manages OAuth authentication
- `searchSongsByVibe(vibe, preferences)`: Finds matching songs
- `getAudioFeatures(trackId)`: Gets audio characteristics
- `getAudioAnalysis(trackId)`: Gets detailed audio structure
- `findBestTimestamp(trackId, duration)`: Finds optimal 15-second snippet
- `getSongRecommendations(vibe, preferences)`: Main recommendation function

**Data Structures**:
```typescript
SongRecommendation {
  id: string
  name: string
  artist: string
  albumArt: string
  previewUrl: string | null
  spotifyUri: string
  duration: number
  recommendedTimestamp: {
    start: number
    end: number
    formatted: string
  }
  matchScore: number (0-100)
  explanation: string
  audioFeatures: SpotifyAudioFeatures
}
```

## State Management

### Local State (React Hooks)
- Component-level UI state
- Form inputs
- Loading states
- Error states

### Persistent State (AsyncStorage)
- User preferences
- Onboarding completion status
- Search history (future feature)

### No Global State Management
- Current implementation uses local state and prop drilling
- For future scaling, consider Redux or Context API

## Navigation Structure

```
Stack Navigator
├── Welcome (initial, no header)
├── OnboardingProfile (no back button)
├── Home (no back button)
├── PhotoPreview
├── Results
└── Settings
```

**Navigation Flow**:
1. App loads → Check onboarding status
2. If not onboarded → Welcome → OnboardingProfile → Home
3. If onboarded → Home
4. Home → PhotoPreview → Results → Home
5. Home → Settings → (can edit preferences)

## API Integration Patterns

### Error Handling Strategy

```typescript
try {
  // API call
  const result = await apiFunction();
  return result;
} catch (error) {
  console.error('Detailed error:', error);
  throw new Error('User-friendly error message');
}
```

### Loading States

```typescript
const [loading, setLoading] = useState(false);
const [loadingMessage, setLoadingMessage] = useState('');

// During async operation
setLoading(true);
setLoadingMessage('Step 1...');
// ... do work
setLoadingMessage('Step 2...');
// ... do work
setLoading(false);
```

### API Response Caching

**Current**: No caching (each request is fresh)

**Future Enhancement**:
```typescript
const cache = new Map();

async function cachedApiCall(key, apiFunction) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const result = await apiFunction();
  cache.set(key, result);
  return result;
}
```

## Security Architecture

### API Key Management

**Development**:
- API keys in `.env` file
- Not committed to version control
- Loaded via react-native-dotenv

**Production (Recommended)**:
```
Mobile App
    │
    ▼
Your Backend Server
    │
    ├─────────────┬─────────────┐
    ▼             ▼             ▼
Google API    Spotify API   Other APIs
```

Benefits:
- API keys never exposed in mobile app
- Can implement rate limiting
- Can add authentication
- Can monitor usage
- Can rotate keys without app update

### Data Privacy

**What's Stored Locally**:
- User preferences (age, music taste, etc.)
- Onboarding completion flag

**What's NOT Stored**:
- Photos (deleted after analysis)
- API responses (not cached)
- Personal identifying information

**Data Flow**:
1. Photo selected → Converted to base64 → Sent to API → Deleted
2. API response → Processed → Results shown → Not stored
3. User preferences → Saved locally → Never sent to external servers

## Performance Considerations

### Image Processing
- Images compressed before upload
- Max width: 1024px
- Quality: 0.8
- Format: JPEG (smaller than PNG)

### API Calls
- Sequential where dependencies exist
- Parallel where possible (future enhancement)
- Error handling prevents cascading failures

### Memory Management
- Images not kept in memory after analysis
- Audio players properly cleaned up
- No memory leaks in navigation

### Bundle Size
- Only necessary dependencies included
- Tree-shaking enabled
- Code splitting (future enhancement)

## Testing Strategy

### Unit Tests (Future)
- Service functions
- Utility functions
- Vibe classification logic
- Timestamp detection algorithm

### Integration Tests (Future)
- API integrations
- Navigation flows
- Data persistence

### E2E Tests (Future)
- Complete user flows
- Camera/gallery integration
- Audio playback

### Manual Testing (Current)
- All screens and flows
- Different photo types
- Error scenarios
- Permission handling

## Scalability Considerations

### Current Limitations
- No caching (every analysis is fresh)
- No backend (API keys in app)
- No user accounts (local storage only)
- No analytics

### Scaling Path
1. **Add Backend Server**
   - Hide API keys
   - Implement caching
   - Add rate limiting
   - Enable analytics

2. **Add User Accounts**
   - Cloud storage for preferences
   - Sync across devices
   - History and favorites

3. **Add Caching Layer**
   - Cache API responses
   - Cache song recommendations
   - Offline mode

4. **Add Analytics**
   - Track usage patterns
   - Monitor errors
   - Optimize recommendations

## Deployment Architecture

### Development
```
Developer Machine
    │
    ▼
Expo Dev Server
    │
    ├─────────┬─────────┐
    ▼         ▼         ▼
iOS Sim   Android   Physical
          Emulator   Device
                    (Expo Go)
```

### Production
```
App Store / Play Store
    │
    ▼
User Device
    │
    ├─────────────┬─────────────┐
    ▼             ▼             ▼
Google API    Spotify API   (Future Backend)
```

## Monitoring & Observability

### Current (Development)
- Console logs
- React Native Debugger
- Expo Dev Tools

### Recommended (Production)
- Crash reporting (Sentry)
- Analytics (Firebase, Mixpanel)
- API monitoring (custom dashboard)
- User feedback system

## Future Architecture Enhancements

### Microservices Approach
```
Mobile App
    │
    ▼
API Gateway
    │
    ├─────────┬─────────┬─────────┬─────────┐
    ▼         ▼         ▼         ▼         ▼
  Auth    Vision   Spotify   User    Analytics
Service  Service  Service  Service   Service
```

### Event-Driven Architecture
```
User Action
    │
    ▼
Event Bus
    │
    ├─────────┬─────────┬─────────┐
    ▼         ▼         ▼         ▼
Analytics Logging  Cache   Notification
Service   Service  Update   Service
```

## Conclusion

The current architecture is:
- ✅ Simple and maintainable
- ✅ Suitable for MVP and initial launch
- ✅ Easy to understand and modify
- ✅ Follows React Native best practices

Future enhancements should focus on:
- 🔄 Adding backend for security
- 🔄 Implementing caching for performance
- 🔄 Adding user accounts for personalization
- 🔄 Implementing analytics for insights
