const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

const shopOrderSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Unpaid', 'Paid'],
        default: 'Unpaid'
    },
    orderNumber: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

// Helper to generate a unique order number
shopOrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        this.orderNumber = 'HA-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    next();
});

module.exports = mongoose.model('ShopOrder', shopOrderSchema);
