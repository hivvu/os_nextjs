const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  locales: ['uk', 'br', 'pt', 'fr', 'es', 'it', 'us'],
  defaultLocale: 'uk'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-sandbox.oddscanner.xyz',
        pathname: '/**',
      },
    ]
  }
};

module.exports = withNextIntl(nextConfig);
