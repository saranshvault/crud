/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Changed from 'export' to 'standalone'
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
