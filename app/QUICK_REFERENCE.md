# Quick Reference Card

## 🚀 Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Start with cleared cache
npm start --clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run all checks
npm test
```

## 🔑 API Keys Setup

### 1. Create .env file
```bash
cd app
cp .env.example .env
```

### 2. Add your keys
```env
GOOGLE_CLOUD_VISION_API_KEY=your_key_here
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### 3. Restart server
```bash
npm start --clear
```

## 📁 File Locations

| What | Where |
|------|-------|
| Screens | `src/screens/` |
| Services | `src/services/` |
| Utils | `src/utils/` |
| Types | `src/types/` |
| Navigation | `src/navigation/` |
| Config | `.env`, `app.json` |
| Docs | Root directory |

## 🔧 Common Tasks

### Add a new screen
1. Create file in `src/screens/`
2. Add to `src/navigation/AppNavigator.tsx`
3. Add type to `src/types/index.ts`

### Add a new service
1. Create file in `src/services/`
2. Import in screen where needed
3. Add types to `src/types/index.ts`

### Update user preferences
- Edit in `src/utils/storage.ts`
- Update types in `src/types/index.ts`

### Change app name/icon
- Edit `app.json`
- Replace files in `assets/`

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Module @env not found | `npm start --clear` |
| API key not working | Check `.env` file, restart server |
| TypeScript errors | `npm run type-check` |
| Linting errors | `npm run lint:fix` |
| App won't start | `rm -rf node_modules && npm install` |
| Camera not working | Check permissions in `app.json` |

## 📱 Testing

### On iOS Simulator
```bash
npm run ios
```

### On Android Emulator
```bash
npm run android
```

### On Physical Device
1. Install Expo Go app
2. Run `npm start`
3. Scan QR code

## 🔍 Debugging

### View logs
- In terminal where `npm start` is running
- In Expo Dev Tools (opens in browser)
- In React Native Debugger

### Common debug commands
```bash
# Clear cache
npm start --clear

# Reset Metro bundler
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules && npm install
```

## 📚 Documentation Quick Links

| Document | Purpose |
|----------|---------|
| [INDEX.md](INDEX.md) | Documentation hub |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup |
| [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md) | API configuration |
| [README.md](README.md) | Complete docs |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical details |
| [DEPLOYMENT.md](DEPLOYMENT.md) | App store guide |

## 🎯 Key Files

```
app/
├── App.tsx                    # Main entry point
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Navigation setup
│   ├── screens/               # All screens
│   ├── services/              # API services
│   ├── utils/                 # Helper functions
│   └── types/                 # TypeScript types
├── .env                       # API keys (create this)
├── app.json                   # App configuration
└── package.json               # Dependencies
```

## 🔐 Security Checklist

- [ ] .env file created
- [ ] API keys added to .env
- [ ] .env in .gitignore
- [ ] No keys in source code
- [ ] Permissions configured

## ✅ Pre-Deploy Checklist

- [ ] All features tested
- [ ] API keys working
- [ ] No console errors
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Screenshots taken
- [ ] App icon created
- [ ] Privacy policy ready

## 📞 Getting Help

1. Check [QUICKSTART.md](QUICKSTART.md)
2. Check [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)
3. Check console logs
4. Search error message
5. Check [README.md](README.md) troubleshooting

## 💡 Pro Tips

- Use `npm start --clear` if things act weird
- Check `.env` file first for API issues
- Console logs are your friend
- Test on real device for best experience
- Keep dependencies updated

## 🎨 Customization

### Change colors
Edit color values in screen files:
- Primary: `#6200ee`
- Background: `#ffffff`
- Text: `#1a1a1a`

### Change app name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name"
  }
}
```

### Change fonts
1. Add font files to `assets/fonts/`
2. Load in `App.tsx`
3. Use in styles

## 📊 Monitoring

### Development
- Console logs
- React Native Debugger
- Expo Dev Tools

### Production (Recommended)
- Sentry (crash reporting)
- Firebase Analytics
- Custom API monitoring

---

**Keep this card handy for quick reference!** 📌
