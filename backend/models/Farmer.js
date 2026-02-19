const mongoose = require('mongoose');

const farmerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: true
    },
    village: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 5, // 1-5 scale
        min: 1,
        max: 5
    },
    totalSupplyKg: {
        type: Number,
        default: 0
    },
    joinedDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Farmer', farmerSchema);
