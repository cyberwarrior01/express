const Billing = require('../models/billingModel');

// Create a new billing entry
exports.createBilling = async (req, res) => {
    const { shopName, employeeId, cylinderType, cylinderName, fullCylindersDelivered, emptyReceived, emptyBalance, extraEmpty, totalEmpty, paymentType, totalAmount, amountReceived, pendingPayment, oldPaymentReceived } = req.body;

    try {
        const billing = new Billing({
            shopName,
            employeeId,
            cylinderType,
            cylinderName,
            fullCylindersDelivered,
            emptyReceived,
            emptyBalance,
            extraEmpty,
            totalEmpty,
            paymentType,
            totalAmount,
            amountReceived,
            pendingPayment,
            oldPaymentReceived
        });

        await billing.save();
        res.status(201).json(billing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all billing entries
exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find();
        res.json(billings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a single billing entry by ID
exports.getBillingById = async (req, res) => {
    const { id } = req.params;

    try {
        const billing = await Billing.findById(id);

        if (!billing) {
            return res.status(404).json({ msg: 'Billing not found' });
        }

        res.json(billing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


