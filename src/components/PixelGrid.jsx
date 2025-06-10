'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ImageModal from './ImageModal';
import AddPixelModal from './AddPixelModal';

const BASE_BOX_SIZE = 1; // rem
const MAX_SPAN = 2;
const BASE_URL = 'http://localhost:5000'; // Central base URL

export default function PixelGrid() {
  const [pixels, setPixels] = useState([]);
  const [modalPixel, setModalPixel] = useState(null);
  const [selectedEmptyPixel, setSelectedEmptyPixel] = useState(null);

  const fetchPixels = useCallback(async () => {
    console.log('Fetching pixels...');
    try {
      const response = await fetch(`${BASE_URL}/pixels/view-pixel`);
      const data = await response.json();
      console.log('Fetched Pixel Data:', data);

      if (response.ok) {
        const generatedPixels = Array.from({ length: 1000 }, (_, i) => {
          const pixelData = data.find((pixel) => pixel.position === i);
          const imageUrl = pixelData?.imageUrl
            ? `${BASE_URL}/${pixelData.imageUrl.replace(/^\/+/, '')}`
            : null;
          return {
            id: i,
            position: i,
            ...pixelData,
            imageUrl,
          };
        });
        setPixels(generatedPixels);
      } else {
        console.error('Failed to fetch pixels', data);
      }
    } catch (error) {
      console.error('Error fetching pixels:', error);
    }
  }, []);

  useEffect(() => {
    fetchPixels();
  }, [fetchPixels]);

  const handlePixelClick = (pixel) => {
    if (pixel.imageUrl) {
      setModalPixel(pixel);
    } else {
      setSelectedEmptyPixel(pixel.id);
    }
  };

  return (
    <>
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${BASE_BOX_SIZE}rem, 1fr))`,
          width: '100%',
        }}
      >
        {pixels.map((pixel) => (
          <PixelBox key={pixel.id} pixel={pixel} onClick={() => handlePixelClick(pixel)} />
        ))}
      </div>

      {modalPixel && (
        <ImageModal pixel={modalPixel} onClose={() => setModalPixel(null)} />
      )}

      {selectedEmptyPixel !== null && (
        <AddPixelModal
          pixelId={selectedEmptyPixel}
          onClose={() => setSelectedEmptyPixel(null)}
          onSuccess={(newPixelFromServer) => {
            console.log('Pixel added successfully:', newPixelFromServer);
            setSelectedEmptyPixel(null);
            fetchPixels(); // Refetch after success
          }}
        />
      )}
    </>
  );
}

// --- PixelBox Component ---
function PixelBox({ pixel, onClick }) {
  const [span, setSpan] = useState({ col: 1, row: 1 });

  useEffect(() => {
    if (!pixel || !pixel.imageUrl) {
      setSpan({ col: 1, row: 1 });
      return;
    }
    const img = new Image();
    img.src = pixel.imageUrl;
    img.onload = () => {
      const basePixelSize = BASE_BOX_SIZE * 16; // Assuming 1rem = 16px
      const cols = Math.min(Math.max(1, Math.ceil(img.width / basePixelSize)), MAX_SPAN);
      const rows = Math.min(Math.max(1, Math.ceil(img.height / basePixelSize)), MAX_SPAN);
      setSpan({ col: cols, row: rows });
    };
    img.onerror = () => {
      console.error("Failed to load image:", pixel.imageUrl);
      setSpan({ col: 1, row: 1 });
    };
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [pixel, pixel?.imageUrl]);

  const isEmpty = !pixel?.imageUrl;
  const boxClasses = `
    ${isEmpty ? 'bg-white hover:bg-gray-100' : 'bg-gray-200'}
    flex items-center justify-center overflow-hidden
    border border-transparent ${isEmpty ? 'hover:border-gray-300' : ''}
    cursor-pointer transition-all duration-200 relative
  `;

  return (
    <div
      className={boxClasses}
      style={{
        aspectRatio: '1 / 1',
        gridColumn: `span ${span.col}`,
        gridRow: `span ${span.row}`,
      }}
      onClick={onClick}
      title={isEmpty ? `Add pixel to position ${pixel.id + 1}` : `View pixel ${pixel.id + 1}`}
    >
      {pixel?.imageUrl ? (
        <img
          src={pixel.imageUrl}
          alt={`Pixel at position ${pixel.id + 1}`}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      ) : (
        <span className="text-lg text-gray-300 font-light">+</span>
      )}
    </div>
  );
}
