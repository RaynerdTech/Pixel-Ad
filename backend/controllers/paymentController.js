const axios = require('axios');
const Pixel = require('../models/Pixel');
const { cloudinary } = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
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

exports.upload = upload; // Export middleware to use in route

// @route POST /api/payment/initialize
exports.initializeTransaction = async (req, res) => {
  const { email, amount, position, linkUrl, description } = req.body;

  try {
    // Upload image to Cloudinary
    const uploadedImage = req.file.path; // multer-storage-cloudinary gives you .path = URL

    const metadata = {
      position,
      linkUrl,
      description,
      imageUrl: uploadedImage,
    };

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100,
        metadata,
        callback_url: `${process.env.FRONTEND_URL}/success`,
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
    console.error('Paystack init error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to initialize transaction' });
  }
};

// @route GET /api/payment/verify/:reference
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
      const humanPosition = Number(metadata.position) + 1;

      const exists = await Pixel.findOne({ position: humanPosition });
      if (exists) {
        return res.status(409).json({ success: false, message: 'Position already taken' });
      }

      const pixel = new Pixel({
        position: humanPosition,
        linkUrl: metadata.linkUrl,
        description: metadata.description,
        imageUrl: metadata.imageUrl, // cloudinary URL
        email: data.customer.email,
        amount: data.amount / 100,
        reference: data.reference,
        isPaid: true,
      });

      await pixel.save();

      return res.status(200).json({ success: true, pixel });
    }

    res.status(400).json({ success: false, message: 'Payment not successful' });
  } catch (err) {
    console.error('Paystack verify error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to verify transaction' });
  }
};
