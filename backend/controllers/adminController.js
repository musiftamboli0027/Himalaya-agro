const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const ShopOrder = require('../models/ShopOrder');
const Inquiry = require('../models/Inquiry');
const Lot = require('../models/Lot');
const generateToken = require('../utils/generateToken');

// @desc    Register new admin
// @route   POST /api/admin/register
// @access  Public (should be protected or removed in prod)
const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
        email,
        password: hashedPassword,
    });

    if (admin) {
        res.status(201).json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
});

// @desc    Authenticate a admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for admin email
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

const getDashboardStats = asyncHandler(async (req, res) => {
    const productCount = await Product.countDocuments();
    const orderCount = await ShopOrder.countDocuments();
    const inquiryCount = await Inquiry.countDocuments();
    const recentLotCount = await Lot.countDocuments();

    // Calculate total sales from shop orders
    const orders = await ShopOrder.find({ status: { $ne: 'Cancelled' } });
    const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    // Get recent orders for the dashboard
    const recentOrders = await ShopOrder.find().sort({ createdAt: -1 }).limit(5);

    res.json({
        totalSales,
        activeOrders: orderCount,
        totalProducts: productCount,
        totalInquiries: inquiryCount,
        recentLots: recentLotCount,
        recentOrders
    });
});

module.exports = {
    registerAdmin,
    loginAdmin,
    getDashboardStats
};
