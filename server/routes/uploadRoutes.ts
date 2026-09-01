require('dotenv').config();
import type { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const fs = require('fs/promises');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

router.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      // console.log('req.file:', req.file);

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await cloudinary.uploader.upload(req.file.path);

      const optimizedUrl = cloudinary.url(result.public_id, {
        width: 800,
        crop: 'limit',
        quality: 'auto',
        fetch_format: 'auto',
      });

      await fs.unlink(req.file.path);

      console.log('Cloudinary result:', result.secure_url);

      res.json({
        message: 'Upload successful',
        imageUrl: optimizedUrl,
        publicId: result.public_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Upload failed' });
    }
  },
);

module.exports = router;
