import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const LocationChart = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="chart-container"
    >
      <h3 className="chart-title">Top Locations</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 170, 220, 0.2)" />
          <XAxis
            dataKey="location"
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
          <Bar dataKey="count" fill="#7c8cff" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LocationChart;
