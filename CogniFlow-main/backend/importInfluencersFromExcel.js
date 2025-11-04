import XLSX from 'xlsx';
import Influencer from "./Models/influencer.js";

async function importInfluencersFromExcel() {
  const influencersToSave = [];
  let processedCount = 0;
  let savedCount = 0;

  return new Promise((resolve, reject) => {
    try {
      const workbook = XLSX.readFile('./Updated_Influencers_2023_2025.xlsx');
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log(`Found ${jsonData.length} rows in Excel file`);

      jsonData.forEach((row, index) => {
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
            engagement_estimate: '', // Not present in new Excel
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

      // Wait for all save operations to complete
      Promise.all(influencersToSave)
        .then((results) => {
          // Filter out null values (failed saves)
          const successfulSaves = results.filter(result => result !== null);

          console.log(`\n✓ Successfully saved ${successfulSaves.length} out of ${influencersToSave.length} influencers to MongoDB`);

          if (successfulSaves.length < influencersToSave.length) {
            console.log(`✗ Failed to save ${influencersToSave.length - successfulSaves.length} influencers`);
          }

          resolve(successfulSaves);
        })
        .catch(err => {
          console.error('Error during save operation:', err);
          reject(err);
        });

    } catch (err) {
      console.error('Error reading Excel file:', err);
      reject(err);
    }
  });
}

export default importInfluencersFromExcel;
