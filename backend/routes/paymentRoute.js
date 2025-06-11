const express = require('express');
const router = express.Router();
const {
  initializeTransaction,
  verifyTransaction,
  upload, // ✅ Import Cloudinary-based upload middleware
} = require('../controllers/paymentController');

// ✅ Use Cloudinary upload middleware here
router.post('/initialize', upload.single('image'), initializeTransaction);
router.get('/verify/:reference', verifyTransaction);

module.exports = router;
