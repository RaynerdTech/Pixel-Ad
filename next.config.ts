import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost',                 // for local dev
      'res.cloudinary.com',        // ✅ Cloudinary
      'pixel-ad.onrender.com',     // your backend
      'pixel-ad-rho.vercel.app'    // frontend, only if it serves images (optional)
    ],
  },
};

export default nextConfig;
