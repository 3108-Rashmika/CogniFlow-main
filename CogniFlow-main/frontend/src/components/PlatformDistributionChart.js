import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const PlatformDistributionChart = ({ data }) => {
  // Count influencers by platform
  const platformCounts = {};
  data.forEach(influencer => {
    const platforms = (influencer.platform || '').split('/').map(p => p.trim()).filter(p => p);
    platforms.forEach(platform => {
      platformCounts[platform] = (platformCounts[platform] || 0) + 1;
    });
  });

  const COLORS = ['#7c8cff', '#a8b3ff', '#b19cd9', '#10b981', '#ef4444', '#f59e0b', '#ec4899'];

  const chartData = Object.entries(platformCounts)
    .map(([platform, count]) => ({ name: platform, value: count }))
    .sort((a, b) => b.value - a.value);

  const RADIAN = Math.PI / 180;
  
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="chart-container"
    >
      <h3 className="chart-title">Platform Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 35, 55, 0.95)',
              border: '1px solid rgba(100, 120, 200, 0.3)',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          />
          <Legend wrapperStyle={{ color: '#ffffff' }} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PlatformDistributionChart;
