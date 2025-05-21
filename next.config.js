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
  },
  sassOptions: {
    includePaths: ['./src/styles'],
    silenceDeprecations: ['legacy-js-api'],
  },
};

module.exports = nextConfig;
