const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        http: require.resolve('stream-http'),
        // Add other fallbacks if needed
      };
      return webpackConfig;
    },
  },
};
