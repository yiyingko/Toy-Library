require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');

const toyRoutes = require('./routes/toyRoutes');
const borrowRequestRoutes = require('./routes/borrowRoutes');
const contactMessageRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const checkJwt = require('./middleware/checkJwt');

const app = express();

// app.use(cors());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://toylibrary.netlify.app'],
    credentials: true,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/toys', toyRoutes);
app.use('/borrow-requests', borrowRequestRoutes);
app.use('/contacts', contactMessageRoutes);
app.use('/admin', checkJwt, adminRoutes);
app.use('/uploads', checkJwt, uploadRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL');
    connection.release();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
  }
}

startServer();
