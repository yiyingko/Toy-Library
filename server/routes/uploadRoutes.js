require('dotenv').config();
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs/promises');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('req.file:', req.file);

    const result = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    console.log('Cloudinary result:', result.secure_url);

    res.json({
      message: 'Upload successful',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
