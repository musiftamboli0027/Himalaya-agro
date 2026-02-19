const mongoose = require('mongoose');

const lotSchema = mongoose.Schema({
    lotCode: {
        type: String,
        required: true,
        unique: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: [true, 'Lot must be assigned to a farmer']
    },
    cropType: {
        type: String,
        required: [true, 'Please specify crop type']
    },
    initialWeight: {
        type: Number,
        required: [true, 'Initial weight is mandatory'],
        min: [0.1, 'Weight must be positive']
    },
    // Grading Results
    gradeAWeight: { type: Number, default: 0 },
    gradeBWeight: { type: Number, default: 0 },
    wasteWeight: { type: Number, default: 0 },

    // Freshness Timeline
    harvestDate: { type: Date },
    arrivalDate: { type: Date },
    qualityCheckDate: { type: Date },

    // Status Flow
    status: {
        type: String,
        enum: ['Received', 'Graded', 'Dispatched', 'Rejected'],
        default: 'Received'
    },

    // SOP Enforcement
    handledBy: {
        type: String, // Or ObjectId if we have Employee model, using String for now
        required: [true, 'Employee ID is mandatory for accountability']
    },

    // Audit Trail
    historyLabels: [{
        action: String,
        timestamp: { type: Date, default: Date.now },
        note: String
    }]
}, {
    timestamps: true
});

// Calculate total processed on the fly
lotSchema.methods.getProcessedTotal = function () {
    return this.gradeAWeight + this.gradeBWeight + this.wasteWeight;
};

module.exports = mongoose.model('Lot', lotSchema);
