const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: true,
        unique: true
    },
    shopName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    areaNo: {
        type: String,
        required: true
    },
    shopNumbers: {
        type: [String], // Array of strings for multiple phone numbers
        required: true
    },
    pendingEmptyCylinders: {
        type: Number,
        default: 0
    },
    totalCylinders: {
        type: Number,
        default: 0
    },
    pendingPayment: {
        type: Number,
        default: 0
    },
    lastPayment: {
        type: Number,
        default: 0
    },
    lastPaymentDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
