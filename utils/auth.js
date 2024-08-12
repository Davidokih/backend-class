const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(401).json({ message: "Json web token is required" });

        const token = req.headers.authorization.split(" ")[ 1 ];
        const payload = jwt.verify(token, process.env.JWTSECRET, (err, response) => {
            if (err) {
                return "expired token";
            }
            return response;
        });

        if (payload === 'expired token') return res.status(403).json({ message: 'expired token' });

        req.user = payload;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "User can not perform this operation" });
    }
};