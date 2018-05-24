#!/bin/bash
rn-nodeify --hack
rm -rf ./node_modules/bcoin/.babelrc ./node_modules/edge-currency-bitcoin/node_modules/bcoin/.babelrc
rm -rf ./node_modules/bccoin/.babelrc ./node_modules/edge-currency-bitcoin/node_modules/bccoin/.babelrc
rm -rf ./node_modules/lcoin/.babelrc ./node_modules/edge-currency-bitcoin/node_modules/lcoin/.babelrc

# Remove inclusion of c++_shared.so library since we are using jsc-android which already includes it
sed "s/\,[[:space:]]'-DANDROID_STL=c++_shared'//g" ./node_modules/react-native-fast-crypto/android/build.gradle > build.gradle
mv build.gradle ./node_modules/react-native-fast-crypto/android/build.gradle
