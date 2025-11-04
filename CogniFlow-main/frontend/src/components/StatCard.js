import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="stat-card"
      style={{ '--card-color': color }}
    >
      <div className="stat-card-icon" style={{ background: `${color}15` }}>
        <Icon style={{ color }} size={32} />
      </div>
      <div className="stat-card-content">
        <p className="stat-card-title">{title}</p>
        <h3 className="stat-card-value">{value}</h3>
        {trend && (
          <p className="stat-card-trend" style={{ color }}>
            {trend}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
