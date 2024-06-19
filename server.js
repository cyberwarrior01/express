const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const stockRoutes = require('./routes/stockRoutes');
const billingRoutes = require('./routes/billingRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const shopRoutes = require('./routes/shopRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/employees', employeeRoutes); 
app.use('/api/shops', shopRoutes);

// Middleware for handling 404 and errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
