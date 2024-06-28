const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    cylinderType: {
        type: String,
        required: true
    },
    cylinderName: {
        type: String,
        required: true
    },
    fullCylindersDelivered: {
        type: Number,
        required: true
    },
    emptyReceived: {
        type: Number,
        required: true
    },
    emptyBalance: {
        type: Number,
        required: true
    },
    extraEmpty: {
        type: Number,
        default: 0
    },
    totalEmpty: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cash', 'online', 'balance'],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    amountReceived: {
        type: Number,
        required: true
    },
    pendingPayment: {
        type: Number,
        required: true
    },
    oldPaymentReceived: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
