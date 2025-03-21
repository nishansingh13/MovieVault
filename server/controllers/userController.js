const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(404).json({ error: "All fields are required" });
        }
        const userexist = await User.findOne({ username });
        if (userexist) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const emailexist = await User.findOne({ email });
        if (emailexist) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error.message.startsWith("E11000") ? "Username or email already exists" : "Please fill all fields" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ error: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, email: email }, process.env.JWT_SECRET);

        res.status(200).json({ message: "User logged in successfully", token: token });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", error: error.message });
    }
};

module.exports = { registerUser, loginUser };
