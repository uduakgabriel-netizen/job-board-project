import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from the Django API
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
  // Suppress hydration warnings from browser extensions
  reactStrictMode: true,
};

export default nextConfig;
