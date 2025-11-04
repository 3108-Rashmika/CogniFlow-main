import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ✅ Import all route files
import stockRoutes from "./Routes/stockroute.js";
import twitterRoutes from "./Routes/twitterroute.js";
import influencerRoutes from "./Routes/influencerroute.js";
import zomatoRoutes from "./Routes/zomatoRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount routes properly
app.use("/zomato", stockRoutes);
app.use("/twitter", twitterRoutes);
app.use("/influencers", influencerRoutes);
app.use("/zomatoapi", zomatoRoutes); // or whatever route prefix your frontend expects

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
