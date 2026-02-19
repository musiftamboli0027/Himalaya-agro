const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');

// Route files
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');

const traceabilityRoutes = require('./routes/traceabilityRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS with options
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Mount routers
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/traceability', traceabilityRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Base route
app.get('/', (req, res) => {
    res.send('Himalaya Agro API is running...');
});

// Production Setup for serving frontend (Optional / Traditional hosting)
if (process.env.NODE_ENV === 'production') {
    // Placeholder for static serving if deployed on same server
    // app.use(express.static(path.join(__dirname, '../frontend/dist')));
    // app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html')));
}

// Error handler middleware
app.use(errorHandler);

module.exports = app;
