const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
const app = express();

// middle wares
const allowedOrigins = [
  "https://rest-api-frontend-two.vercel.app/", // Vercel domain
  "http://localhost:5173", // For local dev
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

