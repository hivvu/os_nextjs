const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-sandbox.oddscanner.xyz',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: ['./src/styles'],
    silenceDeprecations: ['legacy-js-api'],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;