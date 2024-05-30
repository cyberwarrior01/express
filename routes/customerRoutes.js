const express = require('express');
const {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

const router = express.Router();

// Create a new customer
router.post('/', createCustomer);

// Get all customers
router.get('/', getAllCustomers);

// Update customer by ID
router.put('/:id', updateCustomer);

// Delete customer by ID
router.delete('/:id', deleteCustomer);

module.exports = router;
