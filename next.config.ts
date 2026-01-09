import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        // When you call /api/predict in your frontend...
        source: '/api/:path*',
        // ...it gets redirected to your Python server during development
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://127.0.0.1:8000/api/:path*' 
          : '/api/:path*', 
      },
    ];
  },
};

export default nextConfig;