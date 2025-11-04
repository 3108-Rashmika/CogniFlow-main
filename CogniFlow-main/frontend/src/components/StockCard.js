import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const StockCard = () => {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stockHistory, setStockHistory] = useState([]);

  const fetchStock = async () => {
    try {
      const [stockResponse, historyResponse] = await Promise.all([
        fetch("http://localhost:4000/zomatoapi/zomato/stocks"),
        fetch("http://localhost:4000/zomatoapi/zomato/stock-history")
      ]);
      const stockData = await stockResponse.json();
      const historyData = await historyResponse.json();

      setStock(stockData);
      setStockHistory(historyData.map(item => ({
        time: new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: item.price
      })));
    } catch (error) {
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
    const interval = setInterval(fetchStock, 30000); // auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading || !stock) {
    return (
      <motion.div
        className="stat-card"
        whileHover={{ scale: 1.03 }}
        style={{
          background: "#111827",
          color: "#fff",
          padding: "20px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <FiRefreshCw className="spinning" size={24} />
        <h3 style={{ marginTop: "10px" }}>Loading Zomato Stock...</h3>
      </motion.div>
    );
  }

  // ✅ Handle both string or numeric changes
  const changeValue =
    typeof stock.change === "string"
      ? parseFloat(stock.change.replace(/[^\d.-]/g, ""))
      : stock.change;
  const percentValue =
    typeof stock.percentChange === "string"
      ? parseFloat(stock.percentChange.replace(/[^\d.-]/g, ""))
      : stock.percentChange;

  const isPositive = changeValue >= 0;
  const trendColor = "#8b5cf6"; // Purple color

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="chart-container"
    >
      <h3 className="chart-title">{stock.symbol} Stock Price</h3>

      <div style={{ marginBottom: "10px" }}>
        <h2 style={{ fontSize: "2rem", margin: "0 0 5px 0", color: "#fff" }}>
          ₹{stock.marketPrice?.toFixed ? stock.marketPrice.toFixed(2) : stock.marketPrice}
        </h2>
        <p style={{ color: trendColor, margin: 0, fontSize: "1rem" }}>
          {isPositive ? "+" : ""}{changeValue.toFixed(2)} ({percentValue.toFixed(2)}%)
        </p>
      </div>

      <div style={{ height: "200px", marginTop: "15px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stockHistory} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              domain={['dataMin - 1', 'dataMax + 1']}
              tickFormatter={(value) => `₹${value.toFixed(0)}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500
              }}
              labelStyle={{ color: '#a8b3ff' }}
              formatter={(value, name) => [`₹${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke={trendColor}
              strokeWidth={2}
              fill={trendColor}
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </motion.div>
  );
};

export default StockCard;
