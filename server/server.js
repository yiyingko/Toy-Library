require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');
const toyRoutes = require('./routes/toyRoutes');
const borrowRequestRoutes = require('./routes/borrowRoutes');
const contactMessageRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/toys', toyRoutes);
app.use('/borrow-requests', borrowRequestRoutes);
app.use('/contact', contactMessageRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL');
    connection.release();

    const [rows] = await db.query('SELECT * FROM toys');
    console.log('Rows on startup:', rows);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
  }
}

startServer();
