const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { extractTextFromImage } = require('./ocrService');

const app = express();
const port = 3002;

app.use(bodyParser.json({ limit: '10mb' })); // for base64 image

app.post('/api/ocr', async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // Simpan file sementara
    const tmpPath = './temp.jpg';
    fs.writeFileSync(tmpPath, imageBuffer);

    // Eksekusi OCR
    const result = await extractTextFromImage(tmpPath);

    // Hapus file sementara
    fs.unlinkSync(tmpPath);

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`OCR service running on http://localhost:${port}`);
});
