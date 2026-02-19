const asyncHandler = require('express-async-handler');
const ShopOrder = require('../models/ShopOrder');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
    const { customerName, customerPhone, deliveryAddress, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }

    const order = new ShopOrder({
        customerName,
        customerPhone,
        deliveryAddress,
        items,
        totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await ShopOrder.find({}).sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await ShopOrder.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
    const order = await ShopOrder.findById(req.params.id);

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus,
    getOrderById
};
