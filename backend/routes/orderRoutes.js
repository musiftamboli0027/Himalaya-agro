const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    updateOrderStatus,
    getOrderById
} = require('../controllers/orderController');

// Public route for creating orders
router.post('/', createOrder);

// These should ideally be protected by admin middleware
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
