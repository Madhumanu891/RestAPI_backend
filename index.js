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
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
