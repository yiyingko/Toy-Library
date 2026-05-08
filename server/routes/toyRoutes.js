const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /toys
router.get('/', async (req, res) => {
  console.log('GET /toys called');

  try {
    const [rows] = await db.query('SELECT * FROM toys');
    res.json(rows);
  } catch (error) {
    console.error('Error in /toys:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /toys/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM toys WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Toy not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error in /toys/:id:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
