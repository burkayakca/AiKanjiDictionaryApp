module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    // ...other presets
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: false }],
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true
    }]
    // ...other plugins
  ],
};