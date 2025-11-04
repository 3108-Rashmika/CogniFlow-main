import express from 'express';
import Influencer from '../Models/influencer.js';
import importInfluencersFromCSV, { importInfluencersFromXLSX } from '../importInfluencers.js';
import importInfluencersFromExcel from '../importInfluencersFromExcel.js';

const router = express.Router();

// POST import influencers from CSV
router.post('/influencers/import', async (req, res) => {
  try {
    console.log('Starting CSV import...');
    const results = await importInfluencersFromCSV();
    res.status(200).json({ 
      message: 'CSV import completed', 
      imported: results.length,
      influencers: results 
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Error importing CSV', error: error.message });
  }
});

// GET all influencers
router.get('/', async (req, res) => {
  try {
    const influencers = await Influencer.find();
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET influencer by id
router.get('/influencers/:id', async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    res.json(influencer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST import influencers from XLSX
router.post('/influencers/import-xlsx', async (req, res) => {
  try {
    console.log('Starting XLSX import...');
    const results = await importInfluencersFromXLSX();
    res.status(200).json({
      message: 'XLSX import completed',
      imported: results.length,
      influencers: results
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Error importing XLSX', error: error.message });
  }
});

// POST import influencers from Excel (zomato_influencers_updated_2025.xlsx)
router.post('/import-excel', async (req, res) => {
  try {
    console.log('Starting Excel import from zomato_influencers_updated_2025.xlsx...');
    const results = await importInfluencersFromExcel();
    res.status(200).json({
      message: 'Excel import completed',
      imported: results.length,
      influencers: results
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Error importing Excel', error: error.message });
  }
});

export default router;
