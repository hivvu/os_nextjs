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

module.exports = nextConfig;
