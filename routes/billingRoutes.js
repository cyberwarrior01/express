const express = require('express');
const {
    createBilling,
    getAllBilling,
    updateBilling,
    deleteBilling
} = require('../controllers/billingController');

const router = express.Router();

// Create a new billing record
router.post('/', createBilling);

// Get all billing records
router.get('/', getAllBilling);

// Update billing record by ID
router.put('/:id', updateBilling);

// Delete billing record by ID
router.delete('/:id', deleteBilling);

module.exports = router;
