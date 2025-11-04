import csv from 'csv-parser';
import fs from 'fs';
import XLSX from 'xlsx';
import Influencer from "./Models/influencer.js";

async function importInfluencersFromCSV() {
  const influencersToSave = [];
  let processedCount = 0;
  let savedCount = 0;

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream('../zomato_influencers_verified_partial_22.csv')
      .pipe(csv());

    stream.on('error', (err) => {
      console.error('Error reading CSV file:', err);
      reject(err);
    });

    stream.on('data', (row) => {
      try {
        // Skip empty rows
        if (!row.name || row.name.trim() === '') {
          return;
        }

        const influencer = new Influencer({
          name: row.name || '',
          handle: row.handle || '',
          platform: row.platform || '',
          sample_post_url: row.sample_post_url || '',
          followers: row.followers || '',
          engagement_estimate: row.engagement_estimate || '',
          contact: row.contact || '',
          status: row.status || '',
          source: row.source || '',
        });

        processedCount++;
        
        // Store the save promise with proper error handling
        const savePromise = influencer.save()
          .then((savedInfluencer) => {
            savedCount++;
            console.log(`Saved influencer ${savedCount}/${processedCount}: ${savedInfluencer.name}`);
            return savedInfluencer;
          })
          .catch(err => {
            console.error('Error saving influencer:', err.message);
            console.error('Influencer data:', {
              name: row.name?.substring(0, 50) + '...',
            });
            return null; // Return null for failed saves
          });

        influencersToSave.push(savePromise);
      } catch (err) {
        console.error('Error processing row:', err.message, row);
      }
    });

    stream.on('end', async () => {
      try {
        console.log(`\nFinished reading CSV. Processing ${influencersToSave.length} influencers...`);
        
        // Wait for all save operations to complete
        const results = await Promise.all(influencersToSave);
        
        // Filter out null values (failed saves)
        const successfulSaves = results.filter(result => result !== null);
        
        console.log(`\n✓ Successfully saved ${successfulSaves.length} out of ${influencersToSave.length} influencers to MongoDB`);
        
        if (successfulSaves.length < influencersToSave.length) {
          console.log(`✗ Failed to save ${influencersToSave.length - successfulSaves.length} influencers`);
        }
        
        resolve(successfulSaves);
      } catch (err) {
        console.error('Error during save operation:', err);
        reject(err);
      }
    });
  });
}

async function importInfluencersFromXLSX() {
  const influencersToSave = [];
  let processedCount = 0;
  let savedCount = 0;

  try {
    const workbook = XLSX.readFile('./Updated_Influencers_2023_2025.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    for (const row of jsonData) {
      try {
        // Skip empty rows
        if (!row.Name || row.Name.trim() === '') {
          continue;
        }

        const influencer = new Influencer({
          name: row.Name || '',
          handle: row.Handle || '',
          platform: row.Platform || '',
          sample_post_url: row['Sample Post Url'] || '',
          followers: row.Followers || '',
          engagement_estimate: '', // Not in XLSX
          contact: row.Contact || '',
          status: row.Status || '',
          source: row.Source || '',
        });

        processedCount++;

        // Store the save promise with proper error handling
        const savePromise = influencer.save()
          .then((savedInfluencer) => {
            savedCount++;
            console.log(`Saved influencer ${savedCount}/${processedCount}: ${savedInfluencer.name}`);
            return savedInfluencer;
          })
          .catch(err => {
            console.error('Error saving influencer:', err.message);
            console.error('Influencer data:', {
              name: row.Name?.substring(0, 50) + '...',
            });
            return null; // Return null for failed saves
          });

        influencersToSave.push(savePromise);
      } catch (err) {
        console.error('Error processing row:', err.message, row);
      }
    }

    console.log(`\nFinished reading XLSX. Processing ${influencersToSave.length} influencers...`);

    // Wait for all save operations to complete
    const results = await Promise.all(influencersToSave);

    // Filter out null values (failed saves)
    const successfulSaves = results.filter(result => result !== null);

    console.log(`\n✓ Successfully saved ${successfulSaves.length} out of ${influencersToSave.length} influencers to MongoDB`);

    if (successfulSaves.length < influencersToSave.length) {
      console.log(`✗ Failed to save ${influencersToSave.length - successfulSaves.length} influencers`);
    }

    return successfulSaves;
  } catch (err) {
    console.error('Error reading XLSX file:', err);
    throw err;
  }
}

export { importInfluencersFromXLSX };
export default importInfluencersFromCSV;
