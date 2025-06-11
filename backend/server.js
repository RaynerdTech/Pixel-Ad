const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoute");
const pixelRoutes = require("./routes/Pixel");

const app = express();

// ✅ Allow both Vercel and localhost
app.use(cors({
  origin: [
    'https://pixel-ad-rho.vercel.app',
    'http://localhost:3001',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(bodyParser.json()); // for parsing application/json

// ✅ Main Routes
app.use("/payment", paymentRoutes); // handles /payment/*
app.use("/pixels", pixelRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Million Dollar Homepage API is working!");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
