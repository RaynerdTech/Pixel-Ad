const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { initializeTransaction, verifyTransaction } = require('../controllers/paymentController');

// Initialize with image and metadata
router.post('/initialize', upload.single('image'), initializeTransaction);

// Called after payment via /success page with reference
router.get('/verify/:reference', verifyTransaction);

module.exports = router;
