import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const EngagementChart = ({ data }) => {
  // Group engagement by date
  const engagementByDate = data.reduce((acc, tweet) => {
    const date = tweet.created_at || 'Unknown';
    acc[date] = (acc[date] || 0) + (tweet.engagement || 0);
    return acc;
  }, {});

  const chartData = Object.entries(engagementByDate)
    .map(([date, engagement]) => ({ date, engagement }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-15); // Last 15 days

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="chart-container"
    >
      <h3 className="chart-title">Engagement Trends</h3>
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
            dataKey="engagement"
            stroke="#a8b3ff"
            strokeWidth={3}
            dot={{ fill: '#a8b3ff', r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default EngagementChart;
