const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
});

module.exports = {
  ...withNextra(),
  async redirects() {
    return [
      {
        source: '/cv',
        destination: 'https://docs.google.com/document/d/1tN6QMFZBXqTrzR9U2Gfjbctsv6FWRjSCq3qcAZWMQ74/edit?usp=sharing',
        permanent: false,
        basePath: false,
      },
    ];
  },
};
