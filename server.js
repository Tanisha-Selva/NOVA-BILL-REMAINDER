const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { Dropbox } = require('dropbox');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Dropbox Client
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

// 1. Connect to MongoDB Atlas (Cleaned up, no legacy options)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Successfully connected to MongoDB Atlas!'))
.catch((err) => console.error('MongoDB connection error:', err));

// 2. Define Bill Mongoose Schema
const billSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: String, required: true },
  dueDate: { type: String, required: true },
  receiptUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Bill = mongoose.model('Bill', billSchema);

// --- API ROUTES ---

// Get all bills for logged-in user
app.get('/api/bills', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'User email is required' });

    const bills = await Bill.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
});

// Add a new bill (with optional Dropbox receipt upload)
app.post('/api/bills', upload.single('receipt'), async (req, res) => {
  try {
    const { name, amount, dueDate, userEmail } = req.body;
    let receiptUrl = '';

    // If an image was attached, upload it to Dropbox
    if (req.file) {
      const dropboxPath = `/receipts/${Date.now()}_${req.file.originalname}`;
      const response = await dbx.filesUpload({
        path: dropboxPath,
        contents: req.file.buffer
      });
      receiptUrl = response.result.path_display;
    }

    // Save bill to MongoDB Atlas
    const newBill = new Bill({
      userEmail,
      name,
      amount,
      dueDate,
      receiptUrl
    });

    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    console.error('Error adding bill:', error);
    res.status(500).json({ error: 'Failed to save bill' });
  }
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});