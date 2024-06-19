const Stock = require('../models/stockModel');

// Create a new stock entry
exports.createStock = async (req, res) => {
    const { cylinderName, cylinderWeight, ratePerCylinder ,fullCylindersInStock , emptyCylindersInStock } = req.body;

    try {
        const stock = new Stock({
            cylinderName,
            cylinderWeight,
            ratePerCylinder,
            fullCylindersInStock, emptyCylindersInStock
        });

        await stock.save();
        res.status(201).json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all stocks
exports.getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get stock by ID
exports.getStockById = async (req, res) => {
    const { id } = req.params;

    try {
        const stock = await Stock.findById(id);
        if (!stock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }
        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update stock by ID
exports.updateStockById = async (req, res) => {
    const { id } = req.params;
    const { cylinderName, cylinderWeight, fullCylindersInStock, emptyCylindersInStock, ratePerCylinder } = req.body;

    try {
        const updatedFields = {
            cylinderName,
            cylinderWeight,
            fullCylindersInStock,
            emptyCylindersInStock,
            ratePerCylinder,
            lastUpdated: Date.now()
        };

        const stock = await Stock.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!stock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }

        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete stock by ID
exports.deleteStockById = async (req, res) => {
    const { id } = req.params;

    try {
        const stock = await Stock.findByIdAndDelete(id);

        if (!stock) {
            return res.status(404).json({ msg: 'Stock not found' });
        }

        res.json({ msg: 'Stock removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
