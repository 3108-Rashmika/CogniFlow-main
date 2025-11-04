import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const EngagementBySentimentChart = ({ data }) => {
  // Calculate total engagement by sentiment
  const engagementBySentiment = data.reduce((acc, tweet) => {
    const sentiment = tweet.sentiment?.label || 'neutral';
    const engagement = tweet.engagement || 0;
    
    if (!acc[sentiment]) {
      acc[sentiment] = { sentiment, engagement: 0, count: 0 };
    }
    acc[sentiment].engagement += engagement;
    acc[sentiment].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(engagementBySentiment).map(item => ({
    sentiment: item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1),
    engagement: item.engagement,
    average: Math.round(item.engagement / item.count)
  }));

  const colors = {
    Positive: '#10b981',
    Negative: '#ef4444',
    Neutral: '#6b7280'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="chart-container"
    >
      <h3 className="chart-title">Engagement by Sentiment</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 170, 220, 0.2)" />
          <XAxis
            dataKey="sentiment"
            stroke="rgba(200, 210, 230, 0.7)"
            style={{ fontSize: '12px' }}
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
          <Bar dataKey="engagement" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.sentiment] || '#a8b3ff'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EngagementBySentimentChart;