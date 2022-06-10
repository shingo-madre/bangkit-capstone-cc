const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = function(req, res, next) {
    const token = req.body.token

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).send('Unauthorized access, please login');
            } else {
                next();
            }
        })
    } else {
        res.status('401').send("Please login first");
    }
}

module.exports = requireAuth;