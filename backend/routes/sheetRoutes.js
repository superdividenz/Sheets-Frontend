const express = require('express');
const sheets = require('../config/googleAuth');
const router = express.Router();

router.get('/sheet-data', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A1:D10',
    });
    res.json(response.data.values);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
