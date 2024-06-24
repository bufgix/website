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
        destination: 'https://docs.google.com/document/d/1cxKNXz4m6_x5T3T_7xn1sCwJTSc8ispb/edit?usp=sharing&ouid=102920743883960398765&rtpof=true&sd=true',
        permanent: false,
        basePath: false,
      },
    ];
  },
};
