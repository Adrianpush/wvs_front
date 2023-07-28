/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
}

module.exports = {
    reactStrictMode: true, // Enables React strict mode
    // Add any other general configurations here
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.example.com',
            port: '',
            pathname: '/account123/**',
          },
        ],
      },
  };