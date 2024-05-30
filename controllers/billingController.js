const Billing = require('../models/billingModel');

// Create a new billing record
exports.createBilling = async (req, res) => {
    const { customerId, employeeId, cylindersDelivered, totalAmount, paymentStatus, paymentType, amountReceived, notes } = req.body;

    try {
        const billing = new Billing({
            customerId,
            employeeId,
            cylindersDelivered,
            totalAmount,
            paymentStatus,
            paymentType,
            amountReceived,
            notes
        });

        await billing.save();
        res.json(billing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all billing records
exports.getAllBilling = async (req, res) => {
    try {
        const billings = await Billing.find().populate('customerId employeeId');
        res.json(billings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update billing record
exports.updateBilling = async (req, res) => {
    const { id } = req.params;
    const { customerId, employeeId, cylindersDelivered, totalAmount, paymentStatus, paymentType, amountReceived, notes } = req.body;

    try {
        const billing = await Billing.findByIdAndUpdate(
            id,
            { customerId, employeeId, cylindersDelivered, totalAmount, paymentStatus, paymentType, amountReceived, notes },
            { new: true }
        );

        if (!billing) {
            return res.status(404).json({ msg: 'Billing record not found' });
        }

        res.json(billing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete billing record
exports.deleteBilling = async (req, res) => {
    const { id } = req.params;

    try {
        const billing = await Billing.findByIdAndRemove(id);

        if (!billing) {
            return res.status(404).json({ msg: 'Billing record not found' });
        }

        res.json({ msg: 'Billing record removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
