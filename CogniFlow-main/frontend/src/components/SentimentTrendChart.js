import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const SentimentTrendChart = ({ data }) => {
  // Group sentiment by date
  const sentimentByDate = data.reduce((acc, tweet) => {
    const date = tweet.created_at || 'Unknown';
    const sentiment = tweet.sentiment?.label || 'neutral';
    
    if (!acc[date]) {
      acc[date] = { date, positive: 0, negative: 0, neutral: 0 };
    }
    acc[date][sentiment] = (acc[date][sentiment] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.values(sentimentByDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-15); // Last 15 days

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="chart-container"
    >
      <h3 className="chart-title">Sentiment Trends Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 170, 220, 0.2)" />
          <XAxis
            dataKey="date"
            stroke="rgba(200, 210, 230, 0.7)"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="rgba(200, 210, 230, 0.7)" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 35, 55, 0.95)',
              border: '1px solid rgba(100, 120, 200, 0.3)',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          />
          <Legend wrapperStyle={{ color: '#ffffff' }} />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 3 }}
            name="Positive"
          />
          <Line
            type="monotone"
            dataKey="neutral"
            stroke="#6b7280"
            strokeWidth={2}
            dot={{ fill: '#6b7280', r: 3 }}
            name="Neutral"
          />
          <Line
            type="monotone"
            dataKey="negative"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 3 }}
            name="Negative"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SentimentTrendChart;
