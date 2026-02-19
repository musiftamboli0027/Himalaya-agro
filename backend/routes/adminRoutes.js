const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getDashboardStats } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/stats', getDashboardStats);

module.exports = router;
