import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiMessageCircle } from 'react-icons/fi';

const TopTweetsTable = ({ data }) => {
  // Get top 10 tweets by engagement
  const topTweets = [...data]
    .sort((a, b) => (b.engagement || 0) - (a.engagement || 0))
    .slice(0, 10);

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return '#10b981';
    if (sentiment === 'negative') return '#ef4444';
    return '#6b7280';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="chart-container"
    >
      <h3 className="chart-title">Top Performing Tweets</h3>
      <div className="tweets-table">
        {topTweets.length > 0 ? (
          <table className="tweets-table-content">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Tweet</th>
                <th>Sentiment</th>
                <th>Engagement</th>
              </tr>
            </thead>
            <tbody>
              {topTweets.map((tweet, index) => (
                <tr key={tweet._id || index}>
                  <td className="rank-cell">
                    <span className="rank-badge">{index + 1}</span>
                  </td>
                  <td className="tweet-text-cell">
                    <div className="tweet-text">
                      {tweet.text?.substring(0, 100)}
                      {tweet.text?.length > 100 && '...'}
                    </div>
                    {tweet.hashtags && tweet.hashtags.length > 0 && (
                      <div className="hashtags">
                        {tweet.hashtags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="hashtag-tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="sentiment-cell">
                    <span
                      className="sentiment-badge"
                      style={{ color: getSentimentColor(tweet.sentiment?.label) }}
                    >
                      {tweet.sentiment?.label?.charAt(0).toUpperCase() + tweet.sentiment?.label?.slice(1) || 'Neutral'}
                    </span>
                  </td>
                  <td className="engagement-cell">
                    <div className="engagement-value">
                      <FiTrendingUp />
                      {tweet.engagement?.toLocaleString() || 0}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No tweets available</div>
        )}
      </div>
    </motion.div>
  );
};

export default TopTweetsTable;
