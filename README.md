# Edge React Native Login UI Demo

This repo contains a basic app created by following the readme instructions at [edge-login-ui-rn](https://github.com/Airbitz/edge-login-ui/tree/develop/packages/edge-login-ui-rn).

## Getting Started

### Prepare React Native Development Tools

The React Native documentation contains [detailed instructions on how to prepare your computer for React Native development](https://reactnative.dev/docs/0.65/environment-setup). Follow the instructions in the "React Native CLI Quickstart" for your specific platform.

If you are using a Mac, follow both the iOS and Android target instructions. Otherwise, you only need the Android target instructions.

### Install JavaScript dependencies

    yarn
    yarn prepare

### Run the bundler

    yarn start

This bundler process needs to run in the background in order to debug the app, so feel free to run this in its own terminal window.

### Run the app in debug mode

#### iOS

- Run `yarn prepare.ios` to generate the CocoaPods files. You will need to do this after the first install, and any time Xcode produces a `The sandbox is not in sync with the Podfile.lock. Run 'pod install' or update your CocoaPods installation.` error.
- Open `ios/demo.xcworkspace` in Xcode
- Choose a target device or simulator and tap the play button on the top nav bar

#### Android

To build, install, and start the app on a simulator or physical phone with USB debugging, run:

    yarn android

Otherwise, to get an APK, do:

    cd android
    ./gradlew assembleDebug

- The resulting APK will be in `./app/build/outputs/apk/debug/app-debug.apk`
- Copy the APK to a simulator like Genymotion or a real device via Email or messaging app

## Debugging

As with any modern React Native app, [Flipper](https://fbflipper.com/) is the officially-supported debugging app. Use the "React Native Hermes Debugger" to debug Javascript running in the UI.
