const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    cylinderName: {
        type: String,
        required: true
    },
    cylinderWeight: {
        type: String,
        required: true
    },
    fullCylindersInStock: {
        type: Number,
        default: 0
    },
    emptyCylindersInStock: {
        type: Number,
        default: 0
    },
    ratePerCylinder: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Stock', stockSchema);
