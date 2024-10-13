// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});
const upload = multer({ storage: storage });

// Route to handle user submission with multiple file uploads
router.post('/submit', upload.array('images', 5), async (req, res) => {
  const { name, socialHandle } = req.body;
  const imagePaths = req.files.map((file) => file.path); // Get paths of uploaded images

  try {
    const newUser = new User({ name, socialHandle, images: imagePaths });
    await newUser.save();
    res.status(201).json({ message: 'User submitted successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting user', error });
  }
});

// Route to fetch all user submissions (for admin dashboard)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
