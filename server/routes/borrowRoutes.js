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

router.get('/', async (req, res) => {
  console.log('GET /borrow-requests route hit');
  try {
    const [rows] = await db.query(`
      SELECT
    br.id,
    br.toy_id,
    t.name AS toy_name,
    br.borrower_name,
    br.borrower_email,
    br.message,
    br.borrow_status,
    br.created_at
  FROM borrow_requests br
  JOIN toys t ON br.toy_id = t.id
  ORDER BY br.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching borrow requests:', error);
    res.status(500).json({ message: 'Failed to fetch borrow requests' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, toy_id } = req.body;

  try {
    await db.query(
      `
      UPDATE borrow_requests
      SET borrow_status = ?
      WHERE id = ?
      `,
      [status, id],
    );

    if (status === 'approved') {
      await db.query(
        `
        UPDATE toys
        SET is_available = 0,
            status = 'unavailable'
        WHERE id = ?
        `,
        [toy_id],
      );
    }

    if (status === 'completed') {
      await db.query(
        `
        UPDATE toys
        SET is_available = 1,
            status = 'available'
        WHERE id = ?
        `,
        [toy_id],
      );
    }

    res.json({
      message: 'Borrow request updated successfully',
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: error.message,
    });
  }
});
module.exports = router;
