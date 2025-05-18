const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const mealPlannerRoutes = require("./routes/mealPlannerRoutes");
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log("MongoDB Connected")
);

app.use("/api/auth", authRoutes);
app.use("/api/meal", mealPlannerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
