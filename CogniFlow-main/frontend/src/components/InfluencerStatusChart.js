import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const InfluencerStatusChart = ({ data }) => {
  // Count influencers by status
  const statusCounts = data.reduce((acc, influencer) => {
    const status = influencer.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusCounts)
    .map(([status, count]) => ({ status, count }))
    .sort((a, b) => b.count - a.count);

  const getColor = (index) => {
    const colors = ['#7c8cff', '#a8b3ff', '#b19cd9', '#10b981'];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.0 }}
      className="chart-container"
    >
      <h3 className="chart-title">Influencer Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 170, 220, 0.2)" />
          <XAxis
            dataKey="status"
            stroke="rgba(200, 210, 230, 0.7)"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={100}
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
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default InfluencerStatusChart;
