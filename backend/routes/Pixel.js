const express = require('express');
const router = express.Router();
// const upload = require('../middleware/upload');
const {
  // createPixel,
  getPixels,
} = require('../controllers/pixelController');

// // POST with image upload
// router.post('/add-pixel', upload.single('image'), createPixel);

// GET all pixels
router.get('/view-pixel', getPixels);

module.exports = router;
