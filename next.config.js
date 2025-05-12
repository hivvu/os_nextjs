const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  locales: ['uk', 'br', 'pt', 'fr', 'es', 'it', 'us'],
  defaultLocale: 'uk'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static-sandbox.oddscanner.xyz'],
  },
};

module.exports = withNextIntl(nextConfig);
