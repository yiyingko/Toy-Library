import type { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const db = require('../db');
const checkJwt = require('../middleware/checkJwt');

//GET/toys

router.get('/', async (req: Request, res: Response) => {
  const all = req.query.all === 'true';
  console.log('GET /toys called');

  try {
    //All = true, select all return rows and total immediately
    if (all) {
      const [rows] = await db.query('SELECT * FROM toys');
      return res.json({ toys: rows, total: rows.length });
    }
    // two stages to get rows and total
    //Search and/or age filter (if there is age condition push extra query and params)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const search = `%${req.query.search || ''}%`;
    const age = req.query.age || '';
    const availableOnly = req.query.available === 'true';

    const offset = (page - 1) * limit;

    console.log({
      page,
      limit,
      offset,
    });

    const conditions = [`(name LIKE ? OR description LIKE ? OR tags LIKE ?)`];
    const params: (string | number)[] = [search, search, search];

    if (typeof age === 'string') {
      const [minAge, maxAge] = age.split('-').map(Number);

      conditions.push(
        `CAST(SUBSTRING_INDEX(age_group, '-', 1) AS UNSIGNED) <= ?
     AND CAST(SUBSTRING_INDEX(age_group, '-', -1) AS UNSIGNED) >= ?`,
      );

      params.push(maxAge, minAge);
    }

    if (availableOnly) {
      conditions.push(`status = ?`);
      params.push('available');
    }

    const [rows] = await db.query(
      `SELECT *
   FROM toys
   WHERE ${conditions.join(' AND ')}
   LIMIT ? OFFSET ?`,
      [...params, limit, offset],
    );

    //getting the params and condition from previous for total
    const [[total]] = await db.query(
      `
  SELECT COUNT(*) AS total
  FROM toys
  WHERE ${conditions.join(' AND ')}
  `,
      params,
    );
    // finally return rows and total
    res.json({
      toys: rows,
      total: total.total,
    });
  } catch (error) {
    console.error('Error in /toys:');
    res.status(500).json({ message: 'Toys not found' });
  }
});

// GET /toys/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM toys WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Toy not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error in /toys/:id:', error);
    res.status(500).json({ message: 'Toy Id not found' });
  }
});

// DELETE  /toys/:id
router.delete('/:id', checkJwt, async (req: Request, res: Response) => {
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
    console.error(error);

    res.status(500).json({
      message: 'Toy deletion failed',
    });
  }
});

router.patch('/:id', checkJwt, async (req: Request, res: Response) => {
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
    console.error('Error updating toy:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

router.post('/', checkJwt, async (req: Request, res: Response) => {
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
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
