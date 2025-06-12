'use client';

import React, { useState, useRef } from 'react';
import { ImageIcon, XIcon, Loader2 } from 'lucide-react';

export default function AddPixelModal({ pixelId, onClose, onSuccess }) {
  const [imageFile, setImageFile] = useState(null);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const fixedAmount = 1000;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File is too large (max 5MB).');
        setImageFile(null);
        setFileName('No file chosen');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        setImageFile(null);
        setFileName('No file chosen');
        return;
      }
      setError(null);
      setImageFile(file);
      setFileName(file.name);
    }
  };

  const handleFileTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !email) {
      setError('Please select an image file and enter an email.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('position', pixelId);
      formData.append('linkUrl', link);
      formData.append('description', description);
      formData.append('image', imageFile);
      formData.append('email', email);
      formData.append('amount', fixedAmount.toString());

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/initialize`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to initialize payment');
      }

     if (onSuccess && typeof onSuccess === 'function') {
  onSuccess({
    position: pixelId,
    linkUrl: link,
    description,
    imageUrl: URL.createObjectURL(imageFile), // Temporary preview until verification updates DB
    isPaid: false, // This is still pending until payment verified
  });}


      window.location.href = data.authorization_url;

    } catch (err) {
      console.error("Payment Init Error:", err);
      setError(err.message || 'An error occurred while initializing payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Add Your Pixel
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
          >
            <XIcon size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" id="pixel-form">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="your-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition disabled:bg-gray-50"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Upload Image *
              </label>
              <div
                className="flex items-center space-x-3 border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50/50 cursor-pointer hover:border-blue-600 hover:bg-blue-50/50 transition group"
                onClick={handleFileTrigger}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFileTrigger(); }}
              >
                <ImageIcon className="text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition" aria-hidden="true" size={20} />
                <span className={`flex-1 text-sm truncate ${imageFile ? 'text-gray-700' : 'text-gray-400'}`}>
                  {fileName}
                </span>
                <input
                  ref={fileInputRef}
                  id="imageUpload"
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  onChange={handleFileChange}
                  required
                  className="sr-only"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Max 5MB. PNG, JPG, GIF, WEBP.</p>
            </div>

            <div>
              <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
                Link URL *
              </label>
              <input
                id="linkUrl"
                type="url"
                placeholder="https://your-website.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition disabled:bg-gray-50"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                Description *
              </label>
              <textarea
                id="description"
                placeholder="Short description about your link/image"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition resize-none sm:resize-y disabled:bg-gray-50"
                rows={3}
                disabled={loading}
                maxLength={150}
              />
              <p className="text-xs text-gray-500 mt-1">{150 - description.length} characters remaining</p>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-left bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </p>
            )}
          </form>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 mt-auto">
          <button
            type="submit"
            form="pixel-form"
            disabled={loading || !imageFile || !email}
            className="w-full flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition duration-200 disabled:cursor-not-allowed font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              `Pay ₦${fixedAmount} & Upload`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
