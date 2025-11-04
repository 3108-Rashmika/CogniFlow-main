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

// Historical stock data for visualization
router.get("/zomato/stock-history", async (req, res) => {
  try {
    const currentPrice = 172.35;
    const history = [];
    for (let i = 49; i >= 0; i--) {
      const time = new Date();
      time.setMinutes(time.getMinutes() - i * 6); // every 6 minutes for 5 hours
      const price = currentPrice + (Math.random() - 0.5) * 10; // random variation
      history.push({
        time: time.toISOString(),
        price: parseFloat(price.toFixed(2))
      });
    }
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock history" });
  }
});

export default router;
