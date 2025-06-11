const Tesseract = require('tesseract.js');

async function extractTextFromImage(imagePath) {
  try {
    const result = await Tesseract.recognize(imagePath, 'eng', {
      logger: m => console.log(m),
    });

    const text = result.data.text;

    const nominalMatch = text.match(/Rp[\s]*([\d.,]+)/i);
    const nominal = nominalMatch ? parseInt(nominalMatch[1].replace(/[^\d]/g, '')) : null;

    const dateMatch = text.match(/\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4}/);
    const date = dateMatch ? dateMatch[0] : null;

    const providerMatch = text.match(/Nama Issuer Bank ([A-Z]+)/i);
    const provider = providerMatch ? providerMatch[1] : null;

    return { nominal, date, provider, rawText: text };
  } catch (error) {
    console.error('OCR error:', error);
    return { error: error.message };
  }
}

module.exports = { extractTextFromImage };
