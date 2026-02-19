const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Farmer = require('./models/Farmer');
const Lot = require('./models/Lot');

dotenv.config();

const farmers = [
    { name: 'Ramesh Kumar', phone: '9876543210', village: 'Manali' },
    { name: 'Suresh Singh', phone: '9876543211', village: 'Kullu' },
    { name: 'Anita Devi', phone: '9876543212', village: 'Shimla' },
    { name: 'Vikram Thakur', phone: '9876543213', village: 'Mandi' },
];

const crops = ['Apple', 'Potato', 'Tomato', 'Garlic'];

const seedTraceability = async () => {
    try {
        await connectDB();

        await Lot.deleteMany({});
        await Farmer.deleteMany({});

        console.log('Cleared existing traceability data...');

        // Create Farmers
        const createdFarmers = await Farmer.insertMany(farmers);
        console.log(`Created ${createdFarmers.length} farmers`);

        const lots = [];

        // Generate 50 Lots
        for (let i = 0; i < 50; i++) {
            const farmer = createdFarmers[Math.floor(Math.random() * createdFarmers.length)];
            const crop = crops[Math.floor(Math.random() * crops.length)];
            const initialWeight = Math.floor(Math.random() * 500) + 50; // 50-550kg

            // Randomly simulate grading (some good, some bad)
            let gradeA = 0, gradeB = 0, waste = 0;
            const qualityRandom = Math.random();

            if (qualityRandom > 0.8) {
                // High Wastage (Bad Batch)
                waste = Math.floor(initialWeight * 0.25);
                gradeB = Math.floor(initialWeight * 0.40);
                gradeA = initialWeight - waste - gradeB;
            } else {
                // Good Batch
                waste = Math.floor(initialWeight * 0.05); // 5% waste
                gradeB = Math.floor(initialWeight * 0.15);
                gradeA = initialWeight - waste - gradeB;
            }

            const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const lotCode = `LOT-${dateStr}-${1000 + i}`;

            lots.push({
                lotCode,
                farmer: farmer._id,
                cropType: crop,
                initialWeight,
                gradeAWeight: gradeA,
                gradeBWeight: gradeB,
                wasteWeight: waste,
                status: 'Graded',
                handledBy: 'System Seeder',
                historyLabels: [
                    { action: 'Created', note: `Arrived with ${initialWeight}kg`, timestamp: new Date(Date.now() - 10000000 * Math.random()) },
                    { action: 'Graded', note: `Grading Complete`, timestamp: new Date() }
                ]
            });
        }

        await Lot.insertMany(lots);
        console.log(`Created ${lots.length} traceability lots`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedTraceability();
