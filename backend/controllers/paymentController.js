const axios = require('axios');
const Pixel = require('../models/Pixel');
require('dotenv').config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

// @route POST /api/payment/initialize
exports.initializeTransaction = async (req, res) => {
  const { email, amount, position, linkUrl, description } = req.body;

  // Log all incoming fields
  console.log('--- Incoming Payment Initialization Request ---');
  console.log('Email:', email);
  console.log('Amount:', amount);
  console.log('Position:', position);
  console.log('Link URL:', linkUrl);
  console.log('Description:', description);

  console.log('Image file info:', {
    originalname: req.file.originalname,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
  });

  const imageName = `/${req.file.filename}`;

  const metadata = {
    position,
    linkUrl,
    description,
    imageName,
  };

  try {
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

    console.log('✅ Paystack Initialization Response:', response.data);
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

      // Calculate humanPosition first before using it
      const humanPosition = Number(metadata.position) + 1;

      const imageUrl = `/uploads${metadata.imageName}`;

      // Avoid duplicate pixel creation
      const exists = await Pixel.findOne({ position: humanPosition });

      if (exists) {
        return res.status(409).json({ success: false, message: 'Position already taken' });
      }

      const pixel = new Pixel({
        position: humanPosition,
        linkUrl: metadata.linkUrl,
        description: metadata.description,
        imageUrl,
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
