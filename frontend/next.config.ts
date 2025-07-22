import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '8080',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
