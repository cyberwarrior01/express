const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Route to create a new shop
router.post('/', shopController.createShop);

// Route to get all shops
router.get('/', shopController.getAllShops);

// Route to update a shop by shopId
router.put('/:shopId', shopController.updateShop);

// Route to delete a shop by shopId
router.delete('/:shopId', shopController.deleteShop);

module.exports = router;
