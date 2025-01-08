const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Path to your credentials file
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Route to fetch sheet data
app.get('/api/sheet-data', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: '2025!A:H', // Include column H (8th column) in the range
    });

    console.log('Data fetched successfully:', response.data.values); // Debugging
    res.json(response.data.values);
  } catch (error) {
    console.error('Error fetching sheet data:', error.message); // Debugging
    console.error('Error details:', error.response ? error.response.data : 'No additional details'); // Debugging
    res.status(500).json({ error: error.message });
  }
});

// Route to update the Completed column in Google Sheets
app.put('/api/update-row/:id', async (req, res) => {
  const { id } = req.params; // Row ID
  const { completed } = req.body; // New completed status

  try {
    // Update the 8th column (H) in the specified row
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `2025!H${id}`, // Update the 8th column (H) for the specified row
      valueInputOption: 'RAW',
      resource: {
        values: [[completed]], // Update the cell with the new completed status
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating row:', error);
    res.status(500).json({ error: 'Failed to update row' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});