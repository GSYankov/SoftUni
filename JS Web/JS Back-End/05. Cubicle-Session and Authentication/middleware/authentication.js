const { userModel } = require('../models');
const jwt = require('jsonwebtoken');
const secret = 'MySuperPrivateSecret';

function auth(a) {
    return (req, res, next) => {
        const token = req.cookies['auth_cookie'];
        if (token) {
            const data = jwt.verify(token, secret) || null;
            userModel.findOne({ '_id': data.userId }).then(authUser => {
                if (!authUser) {
                    res.status(401).send('401');
                    return;
                }
                req.user = authUser;
                next();
            });
            return;
        }
        next();
    }
};

module.exports = { auth };