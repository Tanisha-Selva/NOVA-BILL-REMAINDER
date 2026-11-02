const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { Dropbox } = require('dropbox');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: true }));
app.use(express.json());

// Initialize Dropbox client dynamically
const getDbx = () => new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

// Cached Database Connection for serverless environment
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Bill Mongoose Schema & Model
const billSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  amount: String,
  dueDate: String,
  receiptUrl: String,
  createdAt: { type: Date, default: Date.now }
});
const Bill = mongoose.models.Bill || mongoose.model('Bill', billSchema);

// API Routes
app.get('/api/bills', async (req, res) => {
  try {
    const { email } = req.query;
    const bills = await Bill.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
});

app.post('/api/bills', upload.single('receipt'), async (req, res) => {
  try {
    const { name, amount, dueDate, userEmail } = req.body;
    let receiptUrl = '';
    
    if (req.file) {
      const dbx = getDbx();
      const dropboxPath = `/receipts/${Date.now()}_${req.file.originalname}`;
      const response = await dbx.filesUpload({ path: dropboxPath, contents: req.file.buffer });
      receiptUrl = response.result.path_display;
    }

    const newBill = new Bill({ userEmail, name, amount, dueDate, receiptUrl });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to save bill' });
  }
});

// CRITICAL: Export the app for Vercel (instead of app.listen)
module.exports = app;