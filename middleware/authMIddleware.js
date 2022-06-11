const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = function(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.substring(7)

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).send({
                    "error" : true,
                    "message" : 'Unauthorized access, please login'
                });
            } else {
                next();
            }
        })
    } else {
        res.status('401').send({
            "error" : true,
            "message" : "Please login first"
        });
    }
}

module.exports = requireAuth;