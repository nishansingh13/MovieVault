const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    try {
        const decoded_data = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded_data;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = { authenticate };


