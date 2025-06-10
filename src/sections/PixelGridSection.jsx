'use client';
import PixelGrid from '../components/PixelGrid';
import '../styles/custom.css';

export default function PixelGridSection() {
  return (
    <section id="target-section" className="py-20 px-6 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Claim Your Pixel Space
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Choose your space, upload your image, and be part of history!
        </p>

        <PixelGrid /> 
      </div>
    </section>
  );
}
        