const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, category, description, usage, dosage, supportedCrops, price, countInStock, isFeatured } = req.body;

    // Handle image upload (assuming middleware puts urls in req.files or req.file)
    // The simplified version usually expects frontend to upload to cloudinary first OR backend upload.
    // For MERN stack with Multer, normally we get req.file/req.files.
    // However, here we will assume the request contains image URLs or we handle upload logic.
    // User asked for "Upload product images using Multer -> Store in Cloudinary -> Save URL".
    // So logic should be here or in route. We will handle uploading in route or here.
    // Let's assume req.files contains the files and we upload them here.

    let imageUrls = [];
    if (req.files) {
        // Upload logic if using multer-storage-cloudinary or manual upload
        // Assuming simple manual upload if using memory storage
        // Or if using multer-storage-cloudinary, req.files already has path.
        // Let's assume req.files contains file paths (from multer-storage-cloudinary or similar)
        req.files.forEach(file => {
            imageUrls.push(file.path);
        });
    }

    // Fallback if images are sent as URLs (already uploaded)
    if (req.body.images) {
        if (Array.isArray(req.body.images)) {
            imageUrls = [...imageUrls, ...req.body.images];
        } else {
            imageUrls.push(req.body.images);
        }
    }

    const product = new Product({
        name,
        category,
        description,
        usage,
        dosage,
        supportedCrops: JSON.parse(supportedCrops || '[]'), // Assuming it supports form-data string
        price,
        countInStock,
        isFeatured,
        images: imageUrls
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, description, usage, dosage, supportedCrops, price, countInStock, isFeatured, images } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.category = category || product.category;
        product.description = description || product.description;
        product.usage = usage || product.usage;
        product.dosage = dosage || product.dosage;
        product.price = price || product.price;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;

        if (supportedCrops) {
            try {
                product.supportedCrops = JSON.parse(supportedCrops);
            } catch (error) {
                // If not valid JSON, assume it's a single string or fallback
                // But since we send JSON.stringify from frontend, it should work.
            }
        }

        // Image Update Logic
        // 1. Start with filtered existing images (if sent) or keep all current
        let updatedImages = product.images;

        if (req.body.existingImages) {
            updatedImages = []; // Reset if we are defining explicit list
            const existing = Array.isArray(req.body.existingImages)
                ? req.body.existingImages
                : [req.body.existingImages];
            updatedImages = existing;
        }

        // 2. Append new uploads
        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(file => file.path);
            updatedImages = [...updatedImages, ...newImageUrls];
        }

        product.images = updatedImages;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
