const express = require('express');
const router = express.Router();
const db = require('../db');
const checkJwt = require('../middleware/checkJwt');

router.get('/', async (req, res) => {
  const all = req.query.all === 'true';
  console.log('GET /toys called');

  try {
    if (all) {
      const [rows] = await db.query('SELECT * FROM toys');
      return res.json({ toys: rows, total: rows.length });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const search = `%${req.query.search}%`;

    const offset = (page - 1) * limit;

    console.log({
      page,
      limit,
      offset,
    });
    const [rows] = await db.query(
      `SELECT *
   FROM toys
   WHERE name LIKE ?
      OR description LIKE ?
      OR tags LIKE ?
   LIMIT ? OFFSET ?`,
      [search, search, search, limit, offset],
    );

    const [[total]] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM toys
      `,
    );
    res.json({
      toys: rows,
      total: total.total,
    });
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

// DELETE  /toys/:id
router.delete('/:id', checkJwt, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      `
      DELETE FROM toys
      WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Toy not found',
      });
    }

    res.json({
      message: 'Toy deleted successfully',
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: error.message,
    });
  }
});

router.patch('/:id', checkJwt, async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const {
    name,
    description,
    age_group,
    tags,
    image_path,
    is_available,
    status,
  } = req.body;

  if (
    !name ||
    !description ||
    !age_group ||
    !tags ||
    !image_path ||
    is_available === undefined ||
    !status
  ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await db.query(
      `
      UPDATE toys
      SET 
        name = ?,
        description = ?,
        age_group = ?,
        tags = ?,
        image_path = ?,
        is_available = ?,
        status = ?
      WHERE id = ?
      `,
      [
        name,
        description,
        age_group,
        tags,
        image_path,
        is_available,
        status,
        id,
      ],
    );

    res.json({
      message: 'Toy info updated successfully',
    });
  } catch (error) {
    console.error('Error updating toy:', error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

router.post('/', checkJwt, async (req, res) => {
  const { name, description, age_group, tags, image_path } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'Toy name is required.',
    });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO toys (name, description, age_group, tags, image_path)
   VALUES (?, ?, ?, ?, ?)`,
      [name, description, age_group, tags, image_path],
    );

    res.status(201).json({
      message: 'New toy added successfully.',
      toyId: result.insertId,
    });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
