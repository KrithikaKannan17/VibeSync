#!/bin/bash

echo "=========================================="
echo "Xcode Setup Script for Story Song Matcher"
echo "=========================================="
echo ""

# Check if running with sudo for license
if [ "$EUID" -eq 0 ]; then 
    echo "✅ Running with sudo privileges"
else
    echo "⚠️  This script needs sudo for some operations"
fi

echo ""
echo "Step 1: Checking Xcode installation..."
if command -v xcodebuild &> /dev/null; then
    echo "✅ Xcode is installed"
    xcodebuild -version
else
    echo "❌ Xcode is not installed"
    echo "Please install Xcode from the App Store"
    exit 1
fi

echo ""
echo "Step 2: Checking Xcode license..."
if xcodebuild -checkFirstLaunchStatus &> /dev/null; then
    echo "✅ Xcode license already accepted"
else
    echo "⚠️  Xcode license needs to be accepted"
    echo "Please run: sudo xcodebuild -license"
    echo "Then run this script again"
    exit 1
fi

echo ""
echo "Step 3: Checking command line tools..."
xcode-select -p
if [ $? -eq 0 ]; then
    echo "✅ Command line tools are configured"
else
    echo "❌ Command line tools not configured"
    echo "Running: sudo xcode-select --reset"
    sudo xcode-select --reset
fi

echo ""
echo "Step 4: Checking iOS simulators..."
xcrun simctl list devices available | grep -i iphone | head -5
if [ $? -eq 0 ]; then
    echo "✅ iOS simulators are available"
else
    echo "⚠️  No iOS simulators found"
    echo "Please open Xcode and install iOS simulators"
fi

echo ""
echo "Step 5: Testing simulator..."
xcrun simctl help &> /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Simulator tools are working"
else
    echo "❌ Simulator tools are not working"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Xcode setup is complete!"
echo "=========================================="
echo ""
echo "You can now run: npm run ios"
echo ""
