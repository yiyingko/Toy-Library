const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'Name, email and message are required.' });
  }

  try {
    await db.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES (?, ?, ?, ?)`,
      [name, email, subject || null, message],
    );

    res.status(201).json({ message: 'Message received successfully.' });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
