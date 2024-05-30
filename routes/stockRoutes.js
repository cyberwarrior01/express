const express = require('express');
const {
    createStock,
    getAllStock,
    updateStock,
    deleteStock
} = require('../controllers/stockController');

const router = express.Router();

// Create new stock
router.post('/', createStock);

// Get all stock
router.get('/', getAllStock);

// Update stock by ID
router.put('/:id', updateStock);

// Delete stock by ID
router.delete('/:id', deleteStock);

module.exports = router;
