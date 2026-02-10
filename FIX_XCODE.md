# 🔧 Fix Xcode - Quick Solution

## ⚠️ The Problem
```
Error: xcrun simctl help exited with non-zero code: 69
CommandError: xcrun is not configured correctly
```

## ✅ The Solution (2 Minutes)

### Open Terminal and run this ONE command:

```bash
sudo xcodebuild -license
```

**Then:**
1. Enter your Mac password (won't show as you type)
2. Press **Space** to scroll through the license
3. Type **agree**
4. Press **Enter**

### That's it! Now run:

```bash
cd /Users/krithikakannan/Desktop/PROJECTSS/insta_app/app
npm run ios
```

---

## 🎉 Your app will launch in the iOS simulator!

---

## 📝 What This Does

The command `sudo xcodebuild -license` accepts Apple's Xcode license agreement, which is required before you can use:
- iOS Simulator
- Xcode command-line tools
- Any iOS development features

---

## ❓ Still Not Working?

### Option 1: Run the setup script
```bash
cd /Users/krithikakannan/Desktop/PROJECTSS/insta_app/app
./setup-xcode.sh
```

### Option 2: Read the full guide
Open: `XCODE_SETUP.md` in the app folder

### Option 3: Use your phone instead
```bash
npm start
# Then scan QR code with Expo Go app on your phone
```

---

**That's all you need to do!** 🚀
