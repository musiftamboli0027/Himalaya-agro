const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage: storage });

router.route('/')
    .get(getProducts)
    .post(protect, upload.array('images', 5), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, upload.array('images', 5), updateProduct)
    .delete(protect, deleteProduct);

module.exports = router;
