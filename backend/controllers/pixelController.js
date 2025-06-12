const Pixel = require('../models/Pixel');

// Simple in-memory cache
let cachedPixels = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// @desc    Get all pixels
// @route   GET /pixels/view-pixel
exports.getPixels = async (req, res) => {
  const now = Date.now();

  // Serve from cache if valid
  if (cachedPixels && (now - cacheTimestamp) < CACHE_DURATION_MS) {
    return res.json(cachedPixels);
  }

  try {
    const pixels = await Pixel.find().sort({ position: 1 });
    // Update cache
    cachedPixels = pixels;
    cacheTimestamp = now;
    res.json(pixels);
  } catch (err) {
    console.error('Get pixels error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Utility function to clear cache (for use in create pixel controller)
exports.clearPixelCache = () => {
  cachedPixels = null;
  cacheTimestamp = 0;
};
