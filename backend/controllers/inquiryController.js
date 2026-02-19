const asyncHandler = require('express-async-handler');
const Inquiry = require('../models/Inquiry');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = asyncHandler(async (req, res) => {
    const { name, phone, message, productId } = req.body;

    if (!name || !phone || !message) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const inquiry = await Inquiry.create({
        name,
        phone,
        message,
        productId: productId || null
    });

    res.status(201).json(inquiry);
});

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
const getInquiries = asyncHandler(async (req, res) => {
    const inquiries = await Inquiry.find({}).populate('productId', 'name price');
    res.json(inquiries);
});

const deleteInquiry = asyncHandler(async (req, res) => {
    const inquiry = await Inquiry.findById(req.params.id);

    if (inquiry) {
        await inquiry.deleteOne();
        res.json({ message: 'Inquiry removed' });
    } else {
        res.status(404);
        throw new Error('Inquiry not found');
    }
});

module.exports = {
    createInquiry,
    getInquiries,
    deleteInquiry
};
