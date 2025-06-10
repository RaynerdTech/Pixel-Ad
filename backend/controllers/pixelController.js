const Pixel = require('../models/Pixel');
const path = require('path');

// @desc    Create a new pixel
// @route   POST /api/pixels/add-pixel
// exports.createPixel = async (req, res) => {
//   try {
//     const { position, linkUrl, description } = req.body;

//     // Ensure an image was uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image is required' });
//     }    

//     const imageUrl = `/uploads/${req.file.filename}`;     

//     // Ensure the position isn't already taken
//     const existing = await Pixel.findOne({ position });
//     if (existing) {
//       return res.status(400).json({ message: 'Position already taken.' });
//     }

//     // Create and save the pixel
//     const newPixel = new Pixel({
//       position,
//       imageUrl,
//       linkUrl,
//       description,
//     });

//     await newPixel.save();
//     res.status(201).json(newPixel);
//   } catch (err) {
//     console.error('Create pixel error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// @desc    Get all pixels
// @route   GET /api/pixels/view-pixel
exports.getPixels = async (req, res) => {
  try {
    const pixels = await Pixel.find().sort({ position: 1 });
    res.json(pixels);
  } catch (err) {
    console.error('Get pixels error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
