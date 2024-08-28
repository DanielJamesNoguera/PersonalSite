const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: ['https://pay.wonderful.one', 'http://pay.wonderful.one'],  // Allow these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true  // Allow cookies to be sent
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Import and use the API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});