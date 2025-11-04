import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const SentimentScoreChart = ({ data }) => {
  // Categorize sentiment scores into ranges
  const scoreRanges = {
    'Very Negative\n(-1.0 to -0.5)': 0,
    'Negative\n(-0.5 to -0.1)': 0,
    'Neutral\n(-0.1 to 0.1)': 0,
    'Positive\n(0.1 to 0.5)': 0,
    'Very Positive\n(0.5 to 1.0)': 0
  };

  data.forEach(tweet => {
    const score = tweet.sentiment?.score || 0;
    if (score <= -0.5) {
      scoreRanges['Very Negative\n(-1.0 to -0.5)']++;
    } else if (score <= -0.1) {
      scoreRanges['Negative\n(-0.5 to -0.1)']++;
    } else if (score <= 0.1) {
      scoreRanges['Neutral\n(-0.1 to 0.1)']++;
    } else if (score <= 0.5) {
      scoreRanges['Positive\n(0.1 to 0.5)']++;
    } else {
      scoreRanges['Very Positive\n(0.5 to 1.0)']++;
    }
  });

  const chartData = Object.entries(scoreRanges).map(([range, count]) => ({
    range: range.split('\n')[0],
    count
  }));

  const getColor = (range) => {
    if (range.includes('Very Negative') || range.includes('Negative')) return '#ef4444';
    if (range.includes('Neutral')) return '#6b7280';
    return '#10b981';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="chart-container"
    >
      <h3 className="chart-title">Sentiment Score Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 170, 220, 0.2)" />
          <XAxis
            dataKey="range"
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
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => {
              const cellColor = getColor(entry.range);
              return <Cell key={`cell-${index}`} fill={cellColor} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SentimentScoreChart;
