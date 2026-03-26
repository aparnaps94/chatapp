const jwt = require("jsonwebtoken");
exports.generateTokens = (user) => {
    const access = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "20m" });
    const refresh = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return { access, refresh };
}