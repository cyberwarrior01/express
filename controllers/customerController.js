const Customer = require('../models/customerModel');

// Create a new customer
exports.createCustomer = async (req, res) => {
    const { customerId, name, shopName, shopAddress, ownerPhoneNumber, managerPhoneNumber, fullCylindersInHand, emptyCylindersInHand, moneyToReceive } = req.body;
console.log(req.body);
    try {
        const customer = new Customer({
            customerId,
            name,
            shopName,
            shopAddress,
            ownerPhoneNumber,
            managerPhoneNumber,
            fullCylindersInHand,
            emptyCylindersInHand,
            moneyToReceive
        });

        await customer.save();
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, shopName, shopAddress, ownerPhoneNumber, managerPhoneNumber, fullCylindersInHand, emptyCylindersInHand, moneyToReceive } = req.body;

    try {
        const customer = await Customer.findByIdAndUpdate(
            id,
            { name, shopName, shopAddress, ownerPhoneNumber, managerPhoneNumber, fullCylindersInHand, emptyCylindersInHand, moneyToReceive },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findByIdAndRemove(id);

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        res.json({ msg: 'Customer removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
