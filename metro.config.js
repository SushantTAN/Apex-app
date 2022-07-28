/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const configg = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await configg.getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: './transformer.js'
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "scss", "sass", "svg"]
    }
  };
})();

