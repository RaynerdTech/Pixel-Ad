const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoute");
const pixelRoutes = require("./routes/Pixel");

const app = express();

// ✅ Allow both Vercel and localhost:3000
app.use(cors({
  origin: [
    'https://pixel-854bm8rxg-raynerdtechs-projects.vercel.app',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(bodyParser.json()); // for parsing application/json

// Routes     
app.use("/payment", paymentRoutes); // handles /payment/*
app.use("/pixels", pixelRoutes);

// Serve static files from /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("Million Dollar Homepage API is working!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
