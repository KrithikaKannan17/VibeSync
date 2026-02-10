# VibeSync 🎵📸

**AI-Powered Instagram Story Song Matcher**

Find the perfect song and timestamp for your Instagram Stories based on your photo's vibe!

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Features

- 📸 **AI Photo Analysis** - Uses Google Cloud Vision API to detect vibe, colors, and mood
- 🎵 **Smart Music Recommendations** - Powered by Spotify API with personalized suggestions
- ⏱️ **Intelligent Timestamp Detection** - Finds the perfect 15-second snippet for each song
- 🎧 **Audio Previews** - Listen to song clips before choosing
- 👤 **Personalized Profiles** - Recommendations based on age, music taste, and cultural preferences
- 🔒 **Privacy-First** - All data stored locally, never shared
- 📱 **Cross-Platform** - Works on iOS and Android

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Studio

### Installation

```bash
# Clone the repository
git clone https://github.com/KrithikaKannan17/VibeSync.git
cd VibeSync/app

# Install dependencies
npm install

# Start the app
npm start
```

### Run on Devices

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Physical Device (with Expo Go)
npm start
# Then scan QR code with Expo Go app
```

---

## 🔑 API Setup

This app requires API keys from:

1. **Google Cloud Vision API**
   - Get key: https://console.cloud.google.com/
   - Enable Cloud Vision API
   - Create API key

2. **Spotify Web API**
   - Get credentials: https://developer.spotify.com/dashboard
   - Create an app
   - Copy Client ID and Client Secret

### Configure API Keys

Add your keys to `app/src/services/visionService.ts` and `app/src/services/spotifyService.ts`:

```typescript
// visionService.ts
const VISION_API_KEY = 'your_google_api_key_here';

// spotifyService.ts
const SPOTIFY_CLIENT_ID = 'your_spotify_client_id_here';
const SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret_here';
```

For detailed setup instructions, see [API_SETUP_GUIDE.md](app/API_SETUP_GUIDE.md)

---

## 📱 Screenshots

*Coming soon!*

---

## 🏗️ Project Structure

```
VibeSync/
├── app/                          # Main application
│   ├── src/
│   │   ├── screens/             # App screens (6 screens)
│   │   ├── services/            # API integrations
│   │   ├── utils/               # Helper functions
│   │   ├── types/               # TypeScript definitions
│   │   └── navigation/          # Navigation setup
│   ├── assets/                  # Images and icons
│   └── [Documentation files]    # Comprehensive guides
├── FINAL_BUILD_SUMMARY.md       # Build overview
└── instagram-story-song-matcher.md  # Original specification
```

---

## 🎯 How It Works

1. **Upload Photo** - Choose from gallery or take a new photo
2. **AI Analysis** - Google Vision API analyzes vibe, colors, and mood
3. **Vibe Classification** - Categorizes into 8 vibe types (Energetic, Chill, Romantic, etc.)
4. **Song Matching** - Spotify API finds songs matching the vibe
5. **Timestamp Detection** - AI finds the perfect 15-second snippet
6. **Results** - Get 5 ranked recommendations with audio previews

---

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Storage**: AsyncStorage
- **APIs**: Google Cloud Vision, Spotify Web API
- **Audio**: Expo AV
- **State Management**: React Hooks

---

## 📚 Documentation

Comprehensive documentation available in the `app/` directory:

- [QUICKSTART.md](app/QUICKSTART.md) - 5-minute setup guide
- [API_SETUP_GUIDE.md](app/API_SETUP_GUIDE.md) - Detailed API configuration
- [ARCHITECTURE.md](app/ARCHITECTURE.md) - Technical architecture
- [DEPLOYMENT.md](app/DEPLOYMENT.md) - App store deployment guide
- [USER_FLOW.md](app/USER_FLOW.md) - UI/UX guide
- [PROJECT_SUMMARY.md](app/PROJECT_SUMMARY.md) - Complete feature list

---

## 🎨 Features in Detail

### Vibe Detection
Classifies photos into 8 categories:
- 🎉 Energetic/Party
- 😌 Chill/Relaxed
- ❤️ Romantic
- 🎨 Aesthetic/Artsy
- 💪 Fitness/Active
- 🍕 Food/Lifestyle
- ✈️ Travel/Adventure
- 📸 Nostalgic/Throwback

### Personalization
Recommendations based on:
- Age range (13-17, 18-24, 25-34, 35-44, 45+)
- Music preferences (15 genres)
- Language preferences (10 languages)
- Cultural background (optional)

### Smart Timestamps
Finds the best 15-second snippet using:
- Chorus detection
- Energy peak analysis
- Structural analysis
- Audio feature matching

---

## 🔐 Privacy & Security

- ✅ Photos analyzed but never stored
- ✅ All user data stored locally
- ✅ No data shared with third parties
- ✅ Easy data deletion from settings
- ✅ Clear privacy disclosures

---

## 🚧 Development

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

### Format Code
```bash
npm run format
```

---

## 📦 Deployment

See [DEPLOYMENT.md](app/DEPLOYMENT.md) for detailed instructions on deploying to:
- Apple App Store
- Google Play Store

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Google Cloud Vision API for image analysis
- Spotify Web API for music data
- React Native and Expo communities
- All contributors and testers

---

## 📞 Support

For issues or questions:
- Check the [documentation](app/)
- Open an issue on GitHub
- Review the Help section in the app

---

## 🎯 Roadmap

### Future Enhancements
- [ ] Video analysis for Instagram Reels
- [ ] AI-generated vibe descriptions (GPT integration)
- [ ] Social features (share recommendations)
- [ ] Collaborative playlists
- [ ] Direct Instagram integration (when API available)
- [ ] Multiple photo analysis
- [ ] Trending songs dashboard

---

## ⭐ Star This Repo!

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ for Instagram creators**

*Version 1.0.0 - February 2026*
