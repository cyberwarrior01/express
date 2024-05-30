const Stock = require('../models/stockModel');

// Create new stock
exports.createStock = async (req, res) => {
    const { stockType, quantity, pricePerUnit } = req.body;

    try {
        const stock = new Stock({
            stockType,
            quantity,
            pricePerUnit
        });

        await stock.save();
        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all stock
exports.getAllStock = async (req, res) => {
    try {
        const stock = await Stock.find();
        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update stock
exports.updateStock = async (req, res) => {
    const { id } = req.params;
    const { stockType, quantity, pricePerUnit } = req.body;

    try {
        const stock = await Stock.findByIdAndUpdate(
            id,
            { stockType, quantity, pricePerUnit },
            { new: true }
        );

        if (!stock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }

        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete stock
exports.deleteStock = async (req, res) => {
    const { id } = req.params;

    try {
        const stock = await Stock.findByIdAndRemove(id);

        if (!stock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }

        res.json({ msg: 'Stock removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
