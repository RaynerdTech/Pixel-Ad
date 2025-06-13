const axios = require('axios');
const Pixel = require('../models/Pixel');
const { cloudinary } = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { clearPixelCache } = require('./pixelController'); // adjust path if needed

require('dotenv').config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// Configure Cloudinary Storage for Multer
const multer = require('multer');
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pixel-grid',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });

exports.upload = upload; // Export middleware for use in route

// ==========================================
// @route   POST /api/payment/initialize
// ==========================================
exports.initializeTransaction = async (req, res) => {
  const { email, amount, position, linkUrl, description } = req.body;

  try {
    // Upload image to Cloudinary
    const uploadedImageUrl = req.file.path; // multer-storage-cloudinary gives .path as the Cloudinary URL

    // Pack metadata to be passed to Paystack
    const metadata = {
      position, // zero-based or one-based based on your frontend – stay consistent
      linkUrl,
      description,
      imageUrl: uploadedImageUrl,
    };

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100, // amount in kobo
        metadata,
        callback_url: `${process.env.FRONTEND_URL}/success`, // optional
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Paystack Init Response:', response.data);
    res.status(200).json({ authorization_url: response.data.data.authorization_url });
  } catch (err) {
    console.error('❌ Paystack init error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to initialize transaction' });
  }
};

// ==========================================
// @route   GET /api/payment/verify/:reference
// ==========================================
exports.verifyTransaction = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    });

    const data = response.data.data;

    if (data.status === 'success') {
      const { metadata } = data;
      const position = Number(metadata.position); // assume this is already zero-based

      // Prevent double booking
      const exists = await Pixel.findOne({ position });
      if (exists) {
        return res.status(409).json({ success: false, message: 'Pixel position already taken' });
      }

      const pixel = new Pixel({
        position,
        linkUrl: metadata.linkUrl,
        description: metadata.description,
        imageUrl: metadata.imageUrl,
        email: data.customer.email,
        amount: data.amount / 100,
        reference: data.reference,
        isPaid: true,
      });

      await pixel.save();

      clearPixelCache(); // clear cached data if any

      return res.status(200).json({ success: true, pixel });
    }

    res.status(400).json({ success: false, message: 'Payment not successful' });
  } catch (err) {
    console.error('❌ Paystack verify error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to verify transaction' });
  }
};
