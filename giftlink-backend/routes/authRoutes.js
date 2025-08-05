const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.put('/update', 
    [
        body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
    ], 
    async (req, res) => {
        // Task 2: Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error('Validation errors in update request', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Task 3: Check email in headers
            const email = req.headers.email;
            if (!email) {
                logger.error('Email not found in the request headers');
                return res.status(400).json({ error: "Email not found in the request headers" });
            }

            // Task 4: Connect to MongoDB
            const db = await connectToDatabase();
            const collection = db.collection("users");

            // Task 5: Find user credentials
            const existingUser = await collection.findOne({ email });
            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            // Update user data
            existingUser.name = req.body.name || existingUser.name;
            existingUser.email = req.body.email || existingUser.email;
            existingUser.updatedAt = new Date();

            // Task 6: Update user in database
            const updatedUser = await collection.findOneAndUpdate(
                { email },
                { $set: existingUser },
                { returnDocument: 'after' }
            );

            // Task 7: Create JWT
            const payload = {
                user: {
                    id: updatedUser._id.toString(),
                },
            };
            const authtoken = jwt.sign(payload, JWT_SECRET);

            res.json({ 
                success: true,
                message: "Profile updated successfully",
                authtoken,
                user: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            });
        } catch (e) {
            logger.error('Error in profile update:', e);
            return res.status(500).send('Internal server error');
        }
    }
);