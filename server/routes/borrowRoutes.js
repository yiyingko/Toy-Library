const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    const { toy_id, borrower_name, borrower_email, message } = req.body;

    if (!toy_id || !borrower_name || !borrower_email) {
      return res.status(400).json({
        error: 'Toy ID, name, and email are required',
      });
    }

    const [result] = await db.query(
      `INSERT INTO borrow_requests 
   (toy_id, borrower_name, borrower_email, message, borrow_status)
   VALUES (?, ?, ?, ?, 'pending')`,
      [toy_id, borrower_name, borrower_email, message || null],
    );

    await db.query(`UPDATE toys SET status = 'pending' WHERE id = ?`, [toy_id]);

    res.status(201).json({
      message: 'Borrow request created successfully',
      borrowRequestId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating borrow request:', error.message);
    res.status(500).json({ error: 'Failed to create borrow request' });
  }
});

module.exports = router;
