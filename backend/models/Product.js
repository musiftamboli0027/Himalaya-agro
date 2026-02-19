const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Seeds', 'Fertilizers', 'Pesticides', 'Equipment']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    usage: {
        type: String,
        required: [true, 'Please add usage instructions']
    },
    dosage: {
        type: String,
        required: [true, 'Please add dosage information']
    },
    supportedCrops: {
        type: [String],
        required: true,
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
