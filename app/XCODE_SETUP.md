# Xcode Setup Guide

## 🎯 Current Issue

You have **Xcode 26.2** installed, but the license agreement hasn't been accepted yet. This is preventing the iOS simulator from running.

## ✅ Quick Fix (5 minutes)

### Step 1: Accept Xcode License

Open **Terminal** app and run:

```bash
sudo xcodebuild -license
```

**What will happen:**
1. You'll be asked for your Mac password (it won't show as you type - this is normal)
2. The Xcode license will appear
3. Press **Space** to scroll through it
4. Type **agree** when you reach the end
5. Press **Enter**

### Step 2: Verify Setup

After accepting the license, run the setup script I created:

```bash
cd /Users/krithikakannan/Desktop/PROJECTSS/insta_app/app
./setup-xcode.sh
```

### Step 3: Run Your App

```bash
npm run ios
```

---

## 📋 Manual Setup (If Script Doesn't Work)

### 1. Accept License
```bash
sudo xcodebuild -license
# Type 'agree' when prompted
```

### 2. Reset Xcode Tools
```bash
sudo xcode-select --reset
```

### 3. Verify Installation
```bash
xcode-select -p
# Should show: /Applications/Xcode.app/Contents/Developer
```

### 4. Check Simulators
```bash
xcrun simctl list devices available
# Should show list of iPhone simulators
```

### 5. Test Simulator
```bash
xcrun simctl help
# Should show help text without errors
```

---

## 🔍 Troubleshooting

### Problem: "You have not agreed to the Xcode license"
**Solution:** Run `sudo xcodebuild -license` and type `agree`

### Problem: "xcrun simctl help exited with non-zero code: 69"
**Solution:** This is the license issue. Accept the license first.

### Problem: "Command line tools not found"
**Solution:** 
```bash
xcode-select --install
# Then run: sudo xcode-select --reset
```

### Problem: "No simulators available"
**Solution:**
1. Open Xcode app
2. Go to: Xcode → Settings → Platforms
3. Install iOS simulator platform
4. Wait for download to complete

### Problem: "Simulator won't launch"
**Solution:**
```bash
# Kill any running simulators
killall Simulator
# Try again
npm run ios
```

---

## 📱 Alternative: Use Physical Device

If you don't want to use the simulator, you can use your iPhone:

### For iPhone (Easiest):
1. Install **Expo Go** from App Store
2. Make sure iPhone and Mac are on same WiFi
3. Run: `npm start`
4. Scan QR code with iPhone Camera app
5. App opens in Expo Go

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `xcodebuild -version` shows Xcode version
- [ ] `xcode-select -p` shows correct path
- [ ] `xcrun simctl list` shows available simulators
- [ ] `xcrun simctl help` runs without errors
- [ ] `npm run ios` launches simulator

---

## 🚀 Quick Commands

```bash
# Accept license (REQUIRED - do this first)
sudo xcodebuild -license

# Run setup script
cd /Users/krithikakannan/Desktop/PROJECTSS/insta_app/app
./setup-xcode.sh

# Launch app in iOS simulator
npm run ios

# If simulator is stuck, reset it
killall Simulator
xcrun simctl erase all
npm run ios
```

---

## 📞 Still Having Issues?

### Check Xcode Installation
```bash
# Check if Xcode is installed
ls /Applications/Xcode.app

# Check Xcode version
xcodebuild -version

# Check license status
xcodebuild -checkFirstLaunchStatus
```

### Reinstall Command Line Tools
```bash
# Remove existing tools
sudo rm -rf /Library/Developer/CommandLineTools

# Install fresh
xcode-select --install

# Reset
sudo xcode-select --reset
```

### Open Xcode App
Sometimes just opening Xcode app helps:
1. Open **Xcode** from Applications
2. Let it finish "Installing components" if prompted
3. Close Xcode
4. Try `npm run ios` again

---

## 💡 Pro Tips

1. **Keep Xcode Updated**: Check App Store for updates
2. **Restart After Updates**: Restart Mac after major Xcode updates
3. **Use Physical Device**: Often more reliable than simulator
4. **Clear Derived Data**: If simulator acts weird:
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData
   ```

---

## 🎯 Expected Result

After completing these steps, when you run `npm run ios`, you should see:

```
✔ Built the app successfully
› Opening exp://192.168.x.x:8081 on iPhone 15 Pro
› Press ? │ show all commands
```

And the iOS simulator will launch with your app!

---

## 📚 Additional Resources

- [Expo iOS Simulator Guide](https://docs.expo.dev/workflow/ios-simulator/)
- [Xcode Documentation](https://developer.apple.com/xcode/)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

---

**Good luck! The license acceptance should fix everything.** 🚀
