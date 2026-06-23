const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/dashboard-summary', async (req, res) => {
  try {
    const [[borrowResult]] = await db.query(
      `
      SELECT COUNT(*) AS count
      FROM borrow_requests
      WHERE borrow_status = 'pending'
      `,
    );

    const [[messageResult]] = await db.query(
      `
      SELECT COUNT(*) AS count
      FROM contact_messages
      WHERE status = 'new'
      `,
    );

    res.json({
      pendingBorrowRequests: borrowResult.count,
      unreadMessages: messageResult.count,
    });
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);

    res.status(500).json({
      message: 'Failed to fetch dashboard summary',
    });
  }
});
module.exports = router;
