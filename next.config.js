/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  target: 'serverless',
  experimental: { nftTracing: true },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
