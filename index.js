const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Load environment variables from a .env file if available
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
