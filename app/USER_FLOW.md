# User Flow & Screen Guide

This document provides a visual guide to the app's user interface and flow.

## 🎬 Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                            │
└─────────────────────────────────────────────────────────────────┘

First Time User:
  📱 Open App
    ↓
  🎉 Welcome Screen
    ↓
  📝 Onboarding (Profile Setup)
    ↓
  🏠 Home Screen
    ↓
  📸 Choose/Take Photo
    ↓
  👁️ Photo Preview
    ↓
  🤖 AI Analysis (Loading)
    ↓
  🎵 Results (5 Song Recommendations)
    ↓
  🏠 Back to Home

Returning User:
  📱 Open App
    ↓
  🏠 Home Screen (Skip Welcome/Onboarding)
    ↓
  (Same flow as above)
```

## 📱 Screen-by-Screen Breakdown

### 1. Welcome Screen
```
┌─────────────────────────────────────┐
│                                     │
│              🎵                     │
│                                     │
│      Story Song Matcher             │
│                                     │
│   Find the perfect song and         │
│   timestamp for your Instagram      │
│   Story                             │
│                                     │
│   📸 Upload your story photo        │
│   🤖 AI analyzes your photo's vibe  │
│   🎶 Get personalized songs         │
│   ⏱️ Discover perfect 15-sec snippet│
│                                     │
│   ┌─────────────────────────────┐  │
│   │     Get Started             │  │
│   └─────────────────────────────┘  │
│                                     │
│   Your data stays on your device    │
│   and is never shared               │
└─────────────────────────────────────┘
```

**Purpose**: Introduce the app and its value proposition  
**Actions**: 
- Tap "Get Started" → Navigate to Onboarding

**First-time users only**: Automatically skipped for returning users

---

### 2. Onboarding Profile Screen
```
┌─────────────────────────────────────┐
│  Let's personalize your experience  │
│  This helps us recommend songs      │
│  that match your taste              │
│                                     │
│  Age Range *                        │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │13-│ │18-│ │25-│ │35-│ │45+│   │
│  │17 │ │24 │ │34 │ │44 │ │   │   │
│  └───┘ └───┘ └───┘ └───┘ └───┘   │
│                                     │
│  Music Preferences * (Select all)   │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│  │Pop │ │Hip-│ │R&B │ │Rock│     │
│  └────┘ │Hop │ └────┘ └────┘     │
│         └────┘                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│  │EDM │ │Latin│ │K-Pop│ │Indie│   │
│  └────┘ └────┘ └────┘ └────┘     │
│  ... (more genres)                 │
│                                     │
│  Language Preferences (Optional)    │
│  ┌────────┐ ┌────────┐            │
│  │English │ │Spanish │            │
│  └────────┘ └────────┘            │
│  ... (more languages)               │
│                                     │
│  Cultural Background (Optional)     │
│  Help us include diverse music      │
│  ┌──────────┐ ┌──────────┐        │
│  │African   │ │Asian     │        │
│  └──────────┘ └──────────┘        │
│  ... (more options)                 │
│                                     │
│  🔒 We only use this to personalize │
│  recommendations. Data stays on     │
│  your device and is never shared.   │
│                                     │
│  ┌─────────────────────────────┐  │
│  │        Continue             │  │
│  └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Purpose**: Collect user preferences for personalization  
**Required Fields**: Age range, Music preferences  
**Optional Fields**: Languages, Cultural background  
**Actions**:
- Select preferences
- Tap "Continue" → Save to storage → Navigate to Home

**Validation**: Must select age range and at least one music preference

---

### 3. Home Screen
```
┌─────────────────────────────────────┐
│  Story Song Matcher          ⚙️     │
│                                     │
│              🎵                     │
│                                     │
│      Find Your Perfect Song         │
│                                     │
│   Upload your story photo and       │
│   we'll find the perfect song       │
│   with the ideal timestamp          │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  🖼️  Choose from Gallery    │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  📷  Take Photo             │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  How it works:              │  │
│   │  1. Upload or take a photo  │  │
│   │  2. AI analyzes your vibe   │  │
│   │  3. Get 5 personalized songs│  │
│   │  4. See perfect 15-sec clips│  │
│   └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Purpose**: Main hub for starting photo analysis  
**Actions**:
- Tap "Choose from Gallery" → Open gallery picker
- Tap "Take Photo" → Open camera
- Tap ⚙️ → Navigate to Settings

**Permissions**: Requests camera/gallery permissions when needed

---

### 4. Photo Preview Screen
```
┌─────────────────────────────────────┐
│  ← Your Photo                       │
│                                     │
│  ┌─────────────────────────────┐  │
│  │                             │  │
│  │                             │  │
│  │      [User's Photo]         │  │
│  │                             │  │
│  │                             │  │
│  └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  🎵 Analyze & Find Songs    │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  Choose Different Photo     │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  💡 We'll analyze your      │  │
│   │  photo's vibe, colors, and  │  │
│   │  mood to find songs that    │  │
│   │  perfectly match the moment │  │
│   └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Purpose**: Show selected photo and start analysis  
**Actions**:
- Tap "Analyze & Find Songs" → Start AI analysis
- Tap "Choose Different Photo" → Go back

---

### 4b. Loading State (During Analysis)
```
┌─────────────────────────────────────┐
│  ← Your Photo                       │
│                                     │
│  ┌─────────────────────────────┐  │
│  │                             │  │
│  │      [User's Photo]         │  │
│  │                             │  │
│  └─────────────────────────────┘  │
│                                     │
│           ⏳ Loading...             │
│                                     │
│      Analyzing your photo...        │
│                                     │
│   This may take a few moments...    │
│                                     │
└─────────────────────────────────────┘
```

**Loading Messages** (shown sequentially):
1. "Preparing your photo..."
2. "Analyzing your photo..."
3. "Detecting the vibe..."
4. "Finding perfect songs..."

**Duration**: 5-15 seconds depending on network

---

### 5. Results Screen
```
┌─────────────────────────────────────┐
│  ← Perfect Songs                    │
│                                     │
│  ┌─────────────────────────────┐  │
│  │   [Photo Thumbnail]         │  │
│  └─────────────────────────────┘  │
│                                     │
│  Perfect Songs for Your Story       │
│  Here are 5 songs that match your   │
│  photo's vibe                       │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ #1              95% Match   │  │
│  │ ┌───┐                       │  │
│  │ │ 🎵│  Song Name             │  │
│  │ │   │  Artist Name           │  │
│  │ └───┘  Best moment: 0:47-1:02│ │
│  │                             │  │
│  │ This song matches your      │  │
│  │ photo's energetic vibe...   │  │
│  │                             │  │
│  │ ┌───────┐┌───────┐┌───────┐│  │
│  │ │▶️Preview││📋Copy││🎵Spotify││ │
│  │ └───────┘└───────┘└───────┘│  │
│  │                             │  │
│  │ 💡 Copy the song name,      │  │
│  │ search in Instagram, use    │  │
│  │ timestamp 0:47-1:02         │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ #2              92% Match   │  │
│  │ ... (similar card)          │  │
│  └─────────────────────────────┘  │
│                                     │
│  ... (3 more song cards)            │
│                                     │
│  ┌─────────────────────────────┐  │
│  │          Done               │  │
│  └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Purpose**: Display song recommendations with actions  
**Each Song Card Shows**:
- Rank (#1-5)
- Match score (0-100%)
- Album artwork
- Song name and artist
- Recommended timestamp
- Explanation
- Action buttons

**Actions**:
- Tap "Preview" → Play 30-second audio clip
- Tap "Copy" → Copy song name to clipboard
- Tap "Spotify" → Open song in Spotify app
- Tap "Done" → Return to Home

---

### 6. Settings Screen
```
┌─────────────────────────────────────┐
│  ← Settings                         │
│                                     │
│  Your Profile                       │
│  ┌─────────────────────────────┐  │
│  │ Age Range: 18-24            │  │
│  │ Music Preferences:          │  │
│  │ Pop, Hip-Hop, R&B, EDM      │  │
│  │ Languages: English, Spanish │  │
│  │ Cultural: Hispanic/Latino   │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │    Edit Preferences         │  │
│  └─────────────────────────────┘  │
│                                     │
│  Information                        │
│  ┌─────────────────────────────┐  │
│  │  ❓ Help & Tips           › │  │
│  └─────────────────────────────┘  │
│  ┌─────────────────────────────┐  │
│  │  🔒 Privacy Policy        › │  │
│  └─────────────────────────────┘  │
│  ┌─────────────────────────────┐  │
│  │  ℹ️ About                  › │  │
│  └─────────────────────────────┘  │
│                                     │
│  Data Management                    │
│  ┌─────────────────────────────┐  │
│  │  🗑️ Delete All Data         │  │
│  └─────────────────────────────┘  │
│  This will delete all your          │
│  preferences and reset the app      │
└─────────────────────────────────────┘
```

**Purpose**: Manage preferences and access information  
**Actions**:
- Tap "Edit Preferences" → Navigate to Onboarding
- Tap "Help & Tips" → Show help dialog
- Tap "Privacy Policy" → Show privacy dialog
- Tap "About" → Show about dialog
- Tap "Delete All Data" → Confirm → Clear storage → Return to Welcome

---

## 🎨 Visual Design Elements

### Color Scheme
- **Primary**: #6200ee (Purple)
- **Background**: #ffffff (White)
- **Secondary Background**: #f5f5f5 (Light Gray)
- **Text Primary**: #1a1a1a (Near Black)
- **Text Secondary**: #666666 (Gray)
- **Success**: #4caf50 (Green)
- **Spotify**: #1db954 (Spotify Green)
- **Info**: #03a9f4 (Blue)
- **Danger**: #f44336 (Red)

### Typography
- **Headers**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Buttons**: Bold, 16-18px
- **Small Text**: Regular, 12-14px

### Components
- **Buttons**: Rounded corners (12px), elevation/shadow
- **Cards**: Rounded corners (12px), subtle shadow
- **Inputs**: Pill-shaped (20px), border on unselected
- **Images**: Rounded corners (8px)

---

## 🔄 State Transitions

### Loading States
```
Idle → Loading → Success
              ↓
            Error
```

**Visual Feedback**:
- Loading: Spinner + message
- Success: Smooth transition to results
- Error: Alert dialog with retry option

### Audio Playback States
```
Not Playing → Loading → Playing → Paused
                ↓
              Error
```

**Visual Feedback**:
- Not Playing: "▶️ Preview" button
- Playing: "⏸️ Pause" button
- Error: "Preview not available"

---

## 📊 User Interactions

### Gestures
- **Tap**: Primary interaction (buttons, cards)
- **Scroll**: Vertical scrolling (long content)
- **Swipe**: Back navigation (iOS)
- **Back Button**: Back navigation (Android)

### Feedback
- **Visual**: Button press states, loading indicators
- **Haptic**: Button taps (on supported devices)
- **Audio**: Song previews
- **Alerts**: Success/error messages

---

## 🎯 Key User Flows

### Flow 1: First Time User
```
Open App
  ↓
Welcome (5 sec)
  ↓
Onboarding (1-2 min)
  ↓
Home
  ↓
Choose Photo (10 sec)
  ↓
Preview (5 sec)
  ↓
Analysis (10 sec)
  ↓
Results (2-5 min browsing)
  ↓
Done → Home

Total Time: 5-10 minutes
```

### Flow 2: Returning User
```
Open App
  ↓
Home (immediate)
  ↓
Choose Photo (10 sec)
  ↓
Preview (5 sec)
  ↓
Analysis (10 sec)
  ↓
Results (2-5 min)
  ↓
Done → Home

Total Time: 3-6 minutes
```

### Flow 3: Edit Preferences
```
Home
  ↓
Settings (tap ⚙️)
  ↓
Edit Preferences
  ↓
Onboarding Screen
  ↓
Update & Save
  ↓
Home

Total Time: 1-2 minutes
```

---

## 💡 UX Best Practices Implemented

### ✅ Clear Navigation
- Back buttons on all screens
- Breadcrumb-style headers
- Consistent navigation patterns

### ✅ Feedback
- Loading states for all async operations
- Success/error messages
- Visual confirmation of actions

### ✅ Accessibility
- Large tap targets (44x44 minimum)
- High contrast text
- Clear labels and instructions

### ✅ Performance
- Optimized images
- Smooth animations
- Fast load times

### ✅ Error Handling
- Graceful degradation
- Clear error messages
- Retry options

### ✅ Privacy
- Clear data usage disclosure
- Local storage only
- Easy data deletion

---

## 📱 Responsive Design

### Phone (Primary Target)
- Optimized for portrait orientation
- Single column layout
- Large, easy-to-tap buttons

### Tablet (Supported)
- Same layout, scaled up
- Maintains readability
- Utilizes extra space for padding

### Web (Limited Support)
- Basic functionality
- Camera/gallery may not work
- Best experienced on mobile

---

## 🎬 Animation & Transitions

### Screen Transitions
- Slide from right (push)
- Slide to right (pop)
- Duration: 300ms
- Easing: ease-in-out

### Button Interactions
- Scale down on press
- Return to normal on release
- Duration: 100ms

### Loading States
- Fade in/out
- Spinner rotation
- Smooth message transitions

---

## 🔍 Edge Cases Handled

### No Photo Selected
- Buttons disabled until photo selected

### API Failure
- Clear error message
- Retry option
- Fallback to manual vibe selection

### No Preview Available
- "Preview not available" message
- Other actions still work

### Network Offline
- Detect offline state
- Show appropriate message
- Suggest checking connection

### Permissions Denied
- Clear explanation
- Link to settings (where possible)
- Alternative options

---

This user flow guide should help you understand how users will interact with the app and what they'll see at each step! 🚀
