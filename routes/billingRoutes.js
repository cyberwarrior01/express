const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

router.post('/', billingController.createBilling);
router.get('/', billingController.getAllBillings);
router.get('/:id', billingController.getBillingById);

module.exports = router;
