<<<<<<< HEAD
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer/expo'
);

config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== 'svg'
);

config.resolver.sourceExts.push('svg');

module.exports = config;
=======
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
    const config = getDefaultConfig(__dirname);
    const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    };
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...resolver.sourceExts, "svg"],
    };

    return config;
})();
>>>>>>> origin/merging
