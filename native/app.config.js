module.exports = {
  "expo": {
    "name": "Coook",
    "slug": "Coook",
    "version": "1.0.8",
    "orientation": "portrait",
    "icon": "./assets/logo.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#3EB489"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "googleServicesFile": "./GoogleService-Info.plist"
    },
    "android": {
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-logo.png",
        "backgroundColor": "#3EB489"
      },
      "package": "com.hullodude.Coook"
    },
    "web": {
      "favicon": "./assets/logo.png"
    },
    "plugins": [
      "@react-native-google-signin/google-signin",
      "expo-document-picker",
      "expo-status-bar",
    ],
    "extra": {
      "eas": {
        "projectId": "0987506c-e245-4492-876a-3dee61e67bc5"
      }
    },
    "owner": "hullodude"
  }
}
