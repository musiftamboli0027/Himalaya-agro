const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    phone: {
        type: String,
        required: [true, 'Please add your phone number']
    },
    message: {
        type: String,
        required: [true, 'Please add your message']
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
