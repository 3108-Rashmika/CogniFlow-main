import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiInstagram, FiYoutube, FiExternalLink } from 'react-icons/fi';

const InfluencersTable = ({ data }) => {
  const getPlatformIcon = (platform) => {
    const platformLower = platform?.toLowerCase() || '';
    if (platformLower.includes('instagram')) return <FiInstagram />;
    if (platformLower.includes('youtube')) return <FiYoutube />;
    return <FiUser />;
  };

  const getStatusColor = (status) => {
    if (status?.includes('verified')) return '#10b981';
    return '#a8b3ff';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      className="chart-container"
    >
      <h3 className="chart-title">Influencers List</h3>
      <div className="tweets-table">
        {data.length > 0 ? (
          <table className="tweets-table-content">
            <thead>
              <tr>
                <th>Name</th>
                <th>Handle</th>
                <th>Platform</th>
                <th>Followers</th>
                <th>Status</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {data.map((influencer, index) => (
                <tr key={influencer._id || index}>
                  <td className="tweet-text-cell">
                    <div className="tweet-text" style={{ fontWeight: 600 }}>
                      {influencer.name || 'Unknown'}
                    </div>
                  </td>
                  <td className="tweet-text-cell">
                    <div className="tweet-text">
                      {influencer.handle || 'N/A'}
                    </div>
                  </td>
                  <td className="sentiment-cell">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      {getPlatformIcon(influencer.platform)}
                      <span>{influencer.platform || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="tweet-text-cell">
                    <div className="tweet-text">
                      {influencer.followers || 'N/A'}
                    </div>
                  </td>
                  <td className="sentiment-cell">
                    <span
                      className="sentiment-badge"
                      style={{ color: getStatusColor(influencer.status) }}
                    >
                      {influencer.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="engagement-cell">
                    {influencer.sample_post_url ? (
                      <a
                        href={influencer.sample_post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#a8b3ff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          textDecoration: 'none'
                        }}
                      >
                        <FiExternalLink />
                        View
                      </a>
                    ) : (
                      <span style={{ color: 'rgba(200, 210, 230, 0.5)' }}>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No influencers available</div>
        )}
      </div>
    </motion.div>
  );
};

export default InfluencersTable;
