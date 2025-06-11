import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost', // for local development
      'pixel-854bm8rxg-raynerdtechs-projects.vercel.app', // your Vercel frontend (if it also serves images)
      'pixel-ad.onrender.com', // replace with your actual backend domain if deployed
    ],
  },
};

export default nextConfig;
