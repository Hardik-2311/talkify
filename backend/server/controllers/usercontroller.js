const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asynchandler = require("express-async-handler");
// how to register user

exports.registerUser = asynchandler(async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({ success: true, message: 'registration successful', newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// login functionality

exports.loginUser = asynchandler(async (req, res) => {
    try {
        const { email, password } = req.body;


        // empty fields
        if (!email || !password) {
            res.status(404);
            throw new Error("all fields are required");
        }
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user && isPasswordMatch) {
            const accesstoken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );
            res.cookie('accessToken', accesstoken, {
                httpOnly: true,
            });
            res.status(200).json({ success: true, message: 'Login successful', accessToken: accesstoken });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// current user
exports.currentUser = asynchandler(async (req, res) => {
    res.status(200).json(req.user);
});

// update
exports.updateUser = asynchandler(async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.params.userId;

        // Update user information
        await User.findByIdAndUpdate(userId, { username, email });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete the account
exports.deleteUserAccount = asynchandler(async (req, res) => {
    try {
        const userId = req.params.userId;

        // Delete user account
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.logoutUser = asynchandler(async (req, res) => {
    res.status(200).json({ message: 'User successfully logged out' });
});

exports.getAllUsers = asynchandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});