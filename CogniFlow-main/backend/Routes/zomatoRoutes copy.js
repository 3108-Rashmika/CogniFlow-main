import express from "express";
const router = express.Router();

// Dummy stock data (you can later connect this to a real API)
router.get("/zomato/stocks", async (req, res) => {
  try {
    const stockData = {
      symbol: "ZOMATO",
      marketPrice: 172.35,
      change: +1.24,
      percentChange: +0.72,
      marketTime: new Date().toLocaleTimeString(),
    };
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

export default router;
