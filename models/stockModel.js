const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    cylinderType: {
        type: String,
        required: true
    },
    fullCylinders: {
        type: Number,
        default: 0
    },
    emptyCylinders: {
        type: Number,
        default: 0
    },
    pricePerCylinder: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);
