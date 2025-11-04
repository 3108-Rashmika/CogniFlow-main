import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiTwitter,
  FiHeart,
  FiTrendingUp,
  FiMapPin,
  FiRefreshCw,
  FiActivity
} from 'react-icons/fi';
import logo from '../assets/Cogniflow_logo.png';
import StatCard from './StatCard';
import SentimentChart from './SentimentChart';
import LocationChart from './LocationChart';
import EngagementChart from './EngagementChart';
import HashtagChart from './HashtagChart';
import SentimentTrendChart from './SentimentTrendChart';
import EngagementBySentimentChart from './EngagementBySentimentChart';
import DailyActivityChart from './DailyActivityChart';
import SentimentScoreChart from './SentimentScoreChart';
import TopTweetsTable from './TopTweetsTable';
import PlatformDistributionChart from './PlatformDistributionChart';
import InfluencerStatusChart from './InfluencerStatusChart';
import InfluencersTable from './InfluencersTable';
import { fetchTweets, fetchInfluencers } from '../services/api';
import StockCard from './StockCard'; // 🟢 Import Stock Card

const Dashboard = () => {
  const [tweets, setTweets] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [tweetsData, influencersData] = await Promise.all([
        fetchTweets(),
        fetchInfluencers()
      ]);
      setTweets(tweetsData);
      setInfluencers(influencersData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load data. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🧮 Stats Calculation
  const stats = React.useMemo(() => {
    if (!tweets.length) return null;

    const sentimentCounts = tweets.reduce((acc, tweet) => {
      const label = tweet.sentiment?.label || 'neutral';
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});

    const totalEngagement = tweets.reduce((sum, tweet) => sum + (tweet.engagement || 0), 0);
    const avgEngagement = tweets.length > 0 ? Math.round(totalEngagement / tweets.length) : 0;

    const locationCounts = tweets.reduce((acc, tweet) => {
      const location = tweet.location || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    const positiveCount = sentimentCounts.positive || 0;
    const negativeCount = sentimentCounts.negative || 0;
    const neutralCount = sentimentCounts.neutral || 0;
    const positivePercentage = tweets.length > 0 
      ? Math.round((positiveCount / tweets.length) * 100) 
      : 0;

    return {
      totalTweets: tweets.length,
      sentimentCounts,
      totalEngagement,
      avgEngagement,
      locationCounts,
      positivePercentage,
    };
  }, [tweets]);

  // 🌀 Loading Screen
  if (loading && tweets.length === 0) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiRefreshCw size={48} />
        </motion.div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  // ⚠️ Error Screen
  if (error && tweets.length === 0) {
    return (
      <div className="error-container">
        <FiActivity size={48} />
        <p>{error}</p>
        <button onClick={loadData} className="retry-button">
          <FiRefreshCw /> Retry
        </button>
      </div>
    );
  }

  // 🧠 Main Dashboard
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            <img src={logo} alt="CogniFlow Logo" className="dashboard-logo" />
            CogniFlow Analytics Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Real-time social media sentiment analysis and insights
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadData}
          className="refresh-button"
          disabled={loading}
        >
          <FiRefreshCw className={loading ? 'spinning' : ''} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </motion.button>
      </header>

      {lastUpdated && (
        <p className="last-updated">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {stats && (
        <>
          {/* 🟢 Stats Section */}
          <div className="stats-grid">
            <StatCard
              title="Total Tweets"
              value={stats.totalTweets.toLocaleString()}
              icon={FiTwitter}
              color="#1da1f2"
              delay={0}
            />
            <StatCard
              title="Positive Sentiment"
              value={`${stats.positivePercentage}%`}
              icon={FiTrendingUp}
              color="#10b981"
              trend={`${stats.sentimentCounts.positive || 0} positive tweets`}
              delay={0.1}
            />
            <StatCard
              title="Total Engagement"
              value={stats.totalEngagement.toLocaleString()}
              icon={FiHeart}
              color="#ef4444"
              trend={`Avg: ${stats.avgEngagement}`}
              delay={0.2}
            />
            <StatCard
              title="Unique Locations"
              value={Object.keys(stats.locationCounts).length}
              icon={FiMapPin}
              color="#8b5cf6"
              delay={0.3}
            />
          </div>

          {/* 🧾 Charts Section */}
          <div className="charts-grid">
            <SentimentChart data={stats.sentimentCounts} />
            <LocationChart data={stats.locationCounts} />
            <EngagementChart data={tweets} />
            <HashtagChart data={tweets} />
            <StockCard />
          </div>

          <div className="charts-grid">
            <SentimentTrendChart data={tweets} />
            <EngagementBySentimentChart data={tweets} />
            <DailyActivityChart data={tweets} />
            <SentimentScoreChart data={tweets} />
          </div>

          <div className="charts-grid full-width">
            <TopTweetsTable data={tweets} />
          </div>

          {/* 🟣 Influencer Analytics Section */}
          {influencers.length > 0 && (
            <>
              <h2 style={{ 
                color: '#a8b3ff', 
                fontSize: '1.8rem', 
                marginTop: '40px', 
                marginBottom: '20px',
                fontWeight: 700
              }}>
                Influencer Analytics
              </h2>

              <div className="charts-grid">
                <PlatformDistributionChart data={influencers} />
                <InfluencerStatusChart data={influencers} />
              </div>

              <div className="charts-grid full-width">
                <InfluencersTable data={influencers} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
