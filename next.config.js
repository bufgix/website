const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
});

// Static export, served by Cloudflare Workers static assets. Redirects live in
// public/_redirects because next's redirects() needs a server.
module.exports = {
  ...withNextra(),
  output: 'export',
  images: { unoptimized: true },
};
