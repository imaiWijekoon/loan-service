const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const loanRoutes = require('./routes/loanRoutes');
const { swaggerUi, specs } = require('./swagger/swagger');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/loans', loanRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`Loan Service running on port ${PORT}`);
});
