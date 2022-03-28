# chat-app
This is a basic chat app. Currently users can customize their chat name, colors, share pictures from library or camera, as well as send their location data to other users in the chat room.

# chat-app Setup
1. Clone this repo into a new folder on your computer.
2. Using a Command Line Interface navigate to this new folder and run the following commands: (???)
      npm install expo-cli --global
      expo install expo-camera
      expo install expo-image-picker
      expo install expo-location
      expo install expo-media-library
      npm install --save firebase
      npm install @react-native-async-storage/async-storage
      npm install --save react-navigation
      Continue if necessary from package.json
3. 

# Example Package.json:
{
  "name": "chat-app",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.17.0",
    "@react-native-community/async-storage": "^1.12.1",
    "@react-native-community/masked-view": "^0.1.11",
    "@react-native-community/netinfo": "7.1.3",
    "@react-navigation/native": "^6.0.8",
    "@react-navigation/stack": "^6.1.1",
    "expo": "~44.0.0",
    "expo-camera": "~12.1.2",
    "expo-image-picker": "~12.0.1",
    "expo-location": "~14.0.1",
    "expo-media-library": "~14.0.0",
    "expo-status-bar": "~1.2.0",
    "firebase": "^7.9.0",
    "react": "17.0.1",
    "react-dom": "17.0.1",
    "react-native": "0.64.3",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-gifted-chat": "^0.16.3",
    "react-native-maps": "0.30.1",
    "react-native-reanimated": "~2.3.1",
    "react-native-safe-area-context": "3.3.2",
    "react-native-screens": "~3.10.1",
    "react-native-web": "0.17.1",
    "react-navigation": "^4.4.4"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9"
  },
  "private": true
}
