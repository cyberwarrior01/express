const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    shopAddress: {
        type: String,
        required: true
    },
    ownerPhoneNumber: {
        type: String,
        required: true
    },
    managerPhoneNumber: {
        type: String,
        required: true
    },
    fullCylinderInHand: {
        type: Number,
        default: 0
    },
    emptyCylinderInHand: {
        type: Number,
        default: 0
    },
    moneyToReceive: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
