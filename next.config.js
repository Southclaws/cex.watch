const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");

module.exports = withPlugins([withCSS()], {
  webpack: config => {
    config.node = {
      fs: "empty"
    };
    return config;
  }
});
