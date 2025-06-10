'use client';

import React from 'react';
import { X } from 'lucide-react';
// Assuming animate-fade-in is defined in custom.css
import '../styles/custom.css';

export default function ImageModal({ pixel, onClose }) {
  if (!pixel || !pixel.imageUrl) {
    console.warn('ImageModal: Pixel data or imageUrl missing.');
    return null;
  }

  const imageAlt = pixel.description
    ? `Pixel ad: ${pixel.description.substring(0, 60)}...`
    : 'Pixel advertisement image';
  const targetLink = pixel.linkUrl || pixel.link;
  const modalTitle = pixel.description ? 'Image Details' : 'Pixel Image'; // Optional title

  return (
    // Overlay: Covers screen, centers, allows scrolling as fallback
    <div className="fixed inset-0 z-[60] backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 overflow-y-auto">

      {/* Main Modal Container: Constrains size and uses flex-col */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl max-w-2xl w-full relative animate-fade-in max-h-[95vh] flex flex-col">

        {/* Modal Header: Fixed section, contains title (optional) & close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {/* You can add a title here if needed */}
          <h3 className="text-base sm:text-lg font-medium text-gray-900 invisible">
            {/* Invisible placeholder to balance flex layout if no real title */}
            {modalTitle}
          </h3>
          <button
            // Now part of the header flex layout, not absolutely positioned over content
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body: This part scrolls if content overflows */}
        <div className="p-4 space-y-4 overflow-y-auto"> {/* Apply scroll to body */}

          {/* Image Section */}
          <div> {/* No flex-shrink needed here as body handles scroll */}
            {targetLink ? (
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                aria-label={`Link for: ${pixel.description || 'Pixel Ad'}`}
              >
                <img
                  src={pixel.imageUrl}
                  alt={imageAlt}
                  // Reduced max-height slightly as header takes some space
                  className="w-full h-auto object-contain max-h-[55vh] sm:max-h-[60vh] block align-middle"
                  loading="lazy"
                />
              </a>
            ) : (
              <img
                src={pixel.imageUrl}
                alt={imageAlt}
                className="w-full h-auto object-contain max-h-[55vh] sm:max-h-[60vh] block align-middle rounded-md border border-gray-100"
                loading="lazy"
              />
            )}
          </div>

          {/* Description Section - Scrollable */}
          {pixel.description && (
  <div className="pt-2">
    <p
      className="text-gray-700 text-left text-sm sm:text-base font-normal overflow-y-auto overflow-x-hidden border-t border-gray-100 pt-3 whitespace-pre-wrap break-words"
    >
      {pixel.description}
    </p>
  </div>
)}

          {/* Visit Site Button Section */}
          {targetLink && (
            <div className="text-center pt-2"> {/* Adjusted padding */}
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm py-2 px-4 rounded-md shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Visit Site
              </a>
            </div>
          )}

        </div> {/* End Modal Body */}

      </div> {/* End Modal Container */}
    </div> // End Overlay
  );
}