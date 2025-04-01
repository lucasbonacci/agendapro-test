module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.ts', '.tsx', '.json'],
        root: ['./src'],
      },
    ],
  ],
};
