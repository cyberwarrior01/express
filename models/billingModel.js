const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    cylindersDelivered: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cash', 'credit', 'debit'], // Add 'cash' as a valid enum value
        required: true
    },
    amountReceived: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
