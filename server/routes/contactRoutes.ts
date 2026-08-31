import type { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const db = require('../db');
const checkJwt = require('../middleware/checkJwt');

router.post('/', async (req: Request, res: Response) => {
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
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  console.log('GET /contact-requests route hit');
  try {
    const [rows] = await db.query(`
      SELECT
    id,
    name,
    email,
    subject,
    status,
    created_at
  FROM contact_messages
  
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching borrow requests:', error);
    res.status(500).json({ message: 'Failed to fetch contact messages' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'messages not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error in /contacts/:id:', error);
    res.status(500).json({ message: 'Failed to fetch contact message' });
  }
});

router.delete('/:id', checkJwt, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      `
      DELETE FROM contact_messages
      WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Message not found',
      });
    }

    res.json({
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to delete contact messages',
    });
  }
});

module.exports = router;
