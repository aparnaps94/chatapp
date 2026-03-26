const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash
        });

        res.status(201).json(user);

    } catch (error) {
        console.log("REGISTER ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "invalid" });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "invalid" });
        const tokens = generateTokens(user);
        res.status(200).json(tokens);

    } catch (error) {
        console.log("LOGIN ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.refresh = (req, res) => {
    try {
        const { refreshToken } = req.body;
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const access = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "20m" });
        res.status(200).json({ access });

    } catch (error) {
        console.log("REFRESH ERROR:", error.message);
        res.status(500).json({ message: error.message });
    }
};
