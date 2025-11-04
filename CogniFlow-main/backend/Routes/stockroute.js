import express from "express";
const router = express.Router();

router.get("/stocks", async (req, res) => {
  try {
    // Mock data (you can replace with live API later)
    const stockData = {
      symbol: "ZOMATO",
      price: 172.35,
      change: "+1.24",
      percentChange: "+0.72%",
      timestamp: new Date().toLocaleTimeString()
    };
    res.json(stockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

export default router;
