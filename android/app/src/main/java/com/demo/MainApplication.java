package com.demo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.tradle.react.UdpSocketsModule;
import com.zmxv.RNSound.RNSoundPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import cl.json.RNSharePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.beefe.picker.PickerViewPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import io.fixd.rctlocale.RCTLocalePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.slowpath.hockeyapp.RNHockeyAppPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import co.airbitz.AbcCoreJsUi.AbcCoreJsUiPackage;
import com.peel.react.TcpSocketsModule;
import com.bitgo.randombytes.RandomBytesPackage;
import com.rnfs.RNFSPackage;
import co.airbitz.fastcrypto.RNFastCryptoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UdpSocketsModule(),
            new RNSoundPackage(),
            new RCTSplashScreenPackage(),
            new RNSharePackage(),
            new ReactNativePushNotificationPackage(),
            new PickerViewPackage(),
            new ReactMaterialKitPackage(),
            new RCTLocalePackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new RNHockeyAppPackage(),
            new RNDeviceInfo(),
            new ContactsWrapperPackage(),
            new ReactNativeContacts(),
            new RCTCameraPackage(),
            new BlurViewPackage(),
            new BackgroundTaskPackage(),
            new RNBackgroundFetchPackage(),
            new VectorIconsPackage(),
            new AbcCoreJsUiPackage(),
            new TcpSocketsModule(),
            new RandomBytesPackage(),
            new RNFSPackage(),
            new RNFastCryptoPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
