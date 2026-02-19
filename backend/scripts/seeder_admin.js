const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
// Adjust paths as this script is in backend root
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const email = 'admin@himalaya.com';
        const password = 'admin123';

        console.log(`Setting up admin user: ${email}`);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            adminExists.password = hashedPassword;
            await adminExists.save();
            console.log('Existing admin password reset to: admin123');
        } else {
            await Admin.create({
                email,
                password: hashedPassword
            });
            console.log('New admin created with password: admin123');
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();
