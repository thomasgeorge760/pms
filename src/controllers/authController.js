const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middleware/authMiddleware');

// Register a new user
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    // Create a token
    const token = generateToken(user._id);
    res.status(201).json({ token });
};

// Login a user
exports.loginUser = async (req, res) => {
    //checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
        console.log(user);
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a token
    const token = generateToken(user._id);
    res.json({ token });
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};
