# Edge React Native Login UI Demo

This repo contains a basic app created by following the readme instructions at https://github.com/Airbitz/edge-login-ui/tree/develop/packages/edge-login-ui-rn

## Requirements

Edge is known to build with this exact tool set. Updated versions of these toolsets may break the build or app. If you have issues, try mirroring these exact versions.

   * MacOS High Sierra 10.13.3
   * Xcode 9.4.1
   * Android Studio 3.1.3
   * CocoaPods 1.5.3
   * Android NDK r15c *This is must have. Version r17 is known to break native code builds*
   * NodeJS 8.9.3
   * NPM 5.5.1
   * Yarn 1.5.1
   * Java 1.8.0_152

## Install dependencies (Yarn required. Do not use NPM)

    cd edge-login-ui-rn-demo
    yarn

## Android

*IMPORTANT* You must use version r15c to build. r17 and above break NDK build that this app requires. Download
the r15c NDK version here: https://developer.android.com/ndk/downloads/older_releases

(MacOS) If the NDK is already installed from Android Studio, it should be in `/Users/[user]/Library/Android/sdk/ndk-bundle`.
If you are using a version other than r15c, replace your version with version r15c downloaded from above

### Set the following environment vars

    export ANDROID_NDK_HOME=/Users/[username]/Library/Android/sdk/ndk-bundle
    export NDK_HOME=/Users/[username]/Library/Android/sdk/ndk-bundle
    export SDK_HOME=/Users/[username]/Library/Android/sdk
    export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"

### Build App

    cd android

    # Release Build
    ./gradlew assembleRelease

    # Debug Build
    ./gradlew assembleDebug

Find the resulting APKs using `find . | grep -i apk`

## iOS

Load the `edge-login-ui-rn-demo/ios` directory into Xcode

Tap the Play button on the top left to launch a debug build and simulator
