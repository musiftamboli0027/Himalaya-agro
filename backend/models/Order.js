const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lot',
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Linked', 'Shipped', 'Delivered'],
        default: 'Linked'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
