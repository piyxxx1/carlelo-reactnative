module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // other plugins you might have
    'react-native-worklets/plugin', // 👈 comes with reanimated v3+
  ],
};
