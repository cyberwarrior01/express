const Shop = require('../models/shopModel');

// Create a new shop
exports.createShop = async (req, res) => {
    const { shopId, shopName, area, areaNo, shopNumbers, pendingEmptyCylinders, totalCylinders, pendingPayment, lastPayment, lastPaymentDate } = req.body;

    try {
        const shop = new Shop({
            shopId,
            shopName,
            area,
            areaNo,
            shopNumbers,
            pendingEmptyCylinders,
            totalCylinders,
            pendingPayment,
            lastPayment,
            lastPaymentDate
        });

        await shop.save();
        res.json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all shops
exports.getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.json(shops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update shop details
exports.updateShop = async (req, res) => {
    const { shopId } = req.params;
    const { shopName, area, areaNo, shopNumbers, pendingEmptyCylinders, totalCylinders, pendingPayment, lastPayment, lastPaymentDate } = req.body;

    try {
        const updatedFields = {
            shopName,
            area,
            areaNo,
            shopNumbers,
            pendingEmptyCylinders,
            totalCylinders,
            pendingPayment,
            lastPayment,
            lastPaymentDate
        };

        const shop = await Shop.findOneAndUpdate(
            { shopId },
            updatedFields,
            { new: true }
        );

        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        res.json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a shop
// Delete shop
exports.deleteShop = async (req, res) => {
    const { shopId } = req.params;

    try {
        const shop = await Shop.findOneAndDelete({ shopId });

        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        res.json({ msg: 'Shop removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};