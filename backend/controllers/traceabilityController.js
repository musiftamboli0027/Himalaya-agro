const asyncHandler = require('express-async-handler');
const Lot = require('../models/Lot');
const Farmer = require('../models/Farmer');

// @desc    Create a new Lot (Arrival)
// @route   POST /api/traceability/lots
// @access  Private/Admin
const createLot = asyncHandler(async (req, res) => {
    const { farmerId, cropType, weight, employeeId } = req.body;

    // VALIDATION RULE 1: Mandatory Farmer
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
        res.status(400);
        throw new Error('SOP Violation: Cannot create Lot without valid Farmer ID');
    }

    // VALIDATION RULE 2: Positive Weight
    if (!weight || weight <= 0) {
        res.status(400);
        throw new Error('SOP Violation: Invalid Weight');
    }

    // Generate readable Lot Code (Simple logic for demo: DATE-RANDOM)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const lotCode = `LOT-${dateStr}-${randomSuffix}`;

    const lot = await Lot.create({
        lotCode,
        farmer: farmerId,
        cropType,
        initialWeight: weight,
        handledBy: employeeId || 'Admin', // In real app, from req.user
        historyLabels: [{ action: 'Created', note: `Arrived with ${weight}kg` }]
    });

    // Update Farmer Stats
    farmer.totalSupplyKg += Number(weight);
    await farmer.save();

    res.status(201).json(lot);
});

// @desc    Update Lot Grading (Segregation)
// @route   PUT /api/traceability/lots/:id/grading
// @access  Private/Admin
const updateGrading = asyncHandler(async (req, res) => {
    const { gradeA, gradeB, waste, employeeId } = req.body;
    const lot = await Lot.findById(req.params.id);

    if (!lot) {
        res.status(404);
        throw new Error('Lot not found');
    }

    // VALIDATION RULE 3: Balance Check
    const totalProcessed = Number(gradeA) + Number(gradeB) + Number(waste);
    // Allow slight tolerance (e.g., 1% moisture loss), but for now strict
    if (totalProcessed > lot.initialWeight) {
        res.status(400);
        throw new Error(`SOP Violation: Output (${totalProcessed}kg) exceeds Input (${lot.initialWeight}kg). checks scales.`);
    }

    lot.gradeAWeight = Number(gradeA);
    lot.gradeBWeight = Number(gradeB);
    lot.wasteWeight = Number(waste);
    lot.status = 'Graded';
    lot.handledBy = employeeId || lot.handledBy; // Update who did the grading
    lot.historyLabels.push({
        action: 'Graded',
        note: `A:${gradeA}, B:${gradeB}, Waste:${waste}`
    });

    const updatedLot = await lot.save();
    res.json(updatedLot);
});

// @desc    Get all Lots
// @route   GET /api/traceability/lots
// @access  Private/Admin
const getLots = asyncHandler(async (req, res) => {
    const lots = await Lot.find({}).populate('farmer', 'name village');
    res.json(lots);
});

// @desc Create Farmer
const createFarmer = asyncHandler(async (req, res) => {
    const { name, phone, village } = req.body;
    const farmer = await Farmer.create({ name, phone, village });
    res.status(201).json(farmer);
});
// @desc Get Farmers
const getFarmers = asyncHandler(async (req, res) => {
    const farmers = await Farmer.find({});
    res.json(farmers);
});


// @desc    Get Lot by Code (Public)
// @route   GET /api/traceability/public/:code
// @access  Public
const getLotByCode = asyncHandler(async (req, res) => {
    const lot = await Lot.findOne({ lotCode: req.params.code }).populate('farmer', 'name village phone');

    if (!lot) {
        res.status(404);
        throw new Error('Lot not found. Please check the code.');
    }

    res.json(lot);
});

// @desc Delete Farmer
const deleteFarmer = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
        res.status(404);
        throw new Error('Farmer not found');
    }
    await farmer.deleteOne();
    res.json({ message: 'Farmer removed' });
});

// @desc Delete Lot
const deleteLot = asyncHandler(async (req, res) => {
    const lot = await Lot.findById(req.params.id);
    if (!lot) {
        res.status(404);
        throw new Error('Lot not found');
    }
    await lot.deleteOne();
    res.json({ message: 'Lot removed' });
});

// @desc Update Lot (Admin)
const updateLot = asyncHandler(async (req, res) => {
    const lot = await Lot.findById(req.params.id);
    if (!lot) {
        res.status(404);
        throw new Error('Lot not found');
    }

    const { status, harvestDate, arrivalDate, qualityCheckDate } = req.body;

    if (status) lot.status = status;
    if (harvestDate) lot.harvestDate = harvestDate;
    if (arrivalDate) lot.arrivalDate = arrivalDate;
    if (qualityCheckDate) lot.qualityCheckDate = qualityCheckDate;

    lot.historyLabels.push({
        action: 'Updated',
        note: `Status changed to ${status || lot.status}`
    });

    const updatedLot = await lot.save();
    res.json(updatedLot);
});

// @desc Link Order to Lot
const linkOrderToLot = asyncHandler(async (req, res) => {
    const { orderId, lotId, customerPhone, deliveryDate } = req.body;

    const lot = await Lot.findById(lotId);
    if (!lot) {
        res.status(404);
        throw new Error('Lot not found');
    }

    const Order = require('../models/Order');
    const order = await Order.create({
        orderId,
        lot: lotId,
        customerPhone,
        deliveryDate
    });

    res.status(201).json(order);
});

module.exports = {
    createLot,
    updateGrading,
    getLots,
    createFarmer,
    getFarmers,
    getLotByCode,
    deleteFarmer,
    deleteLot,
    updateLot,
    linkOrderToLot
};
