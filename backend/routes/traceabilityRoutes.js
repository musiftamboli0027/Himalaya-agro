const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/traceabilityController');
const { generateAnalysis } = require('../controllers/traceabilityAiController');
const { protect } = require('../middleware/authMiddleware');

// Validations are inside Controller for better Error Throwing
router.route('/lots')
    .post(protect, createLot)
    .get(protect, getLots);

router.route('/lots/:id')
    .put(protect, updateLot)
    .delete(protect, deleteLot);

router.route('/lots/:id/grading')
    .put(protect, updateGrading);

router.route('/farmers')
    .post(protect, createFarmer)
    .get(protect, getFarmers);

router.route('/farmers/:id')
    .delete(protect, deleteFarmer);

router.route('/orders/link-lot')
    .post(protect, linkOrderToLot);

router.route('/ai-analysis')
    .post(protect, generateAnalysis);

router.route('/public/:code')
    .get(getLotByCode);

module.exports = router;
