'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import ParticlesBackground from '../components/ParticlesBackground'; // Adjust path if needed
import '../styles/custom.css'; // Keep this for 'glow-text' or other custom styles

export default function HeroSection() {
  const scrollToTarget = () => {
    const targetElement = document.getElementById("target-section");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center text-center overflow-hidden
                 min-h-[70vh] md:min-h-[85vh] lg:min-h-screen // Adjusted min-h for mobile and larger screens
                 px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
      style={{
        background: 'linear-gradient(to bottom, #FAF9F6, #F2F1EF)',
      }}
    >
      {/* Background Animation Layer: Removed opacity-70 here, let Particle's internal opacity handle it */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-0">
        {/*
           Hero Headline Responsiveness:
           - text-3xl: On very small screens (default)
           - sm:text-4xl: Small screens (e.g., larger phones)
           - md:text-5xl: Medium screens (e.g., tablets)
           - lg:text-6xl: Large screens (e.g., small laptops)
           - xl:text-7xl: Extra large screens (e.g., desktops)
           - 2xl:text-8xl: Double extra large screens (e.g., large monitors)
           This ensures a highly responsive and appropriate size for each breakpoint.
        */}
        <h1 className="glow-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
                       leading-tight font-extrabold text-gray-900 mb-6 tracking-tighter">
          Own a Piece of Internet History
        </h1>

        {/* Sub-headline Responsiveness: */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl
                       text-gray-700 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-10 leading-relaxed">
          Buy pixels on our homepage to showcase your brand, message, or creativity.
          Space is limited — make your mark today!
        </p>

        {/* Call to Action Button */}
        <button
          className="relative overflow-hidden
                     bg-blue-600 text-white
                     px-12 py-3 rounded-full
                     font-bold text-lg md:text-xl
                     shadow-xl hover:shadow-2xl
                     transition-all duration-500 ease-in-out
                     transform hover:scale-110 active:scale-95
                     focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75
                     group"
          onClick={scrollToTarget}
        >
          <span className="relative z-10">Get Started</span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></span>
        </button>
      </div>
    </section>
  );
}