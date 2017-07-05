const jwt = require('jsonwebtoken');
const User = require('../model/user');

const {secret} = require('../config');

module.exports = {

    generateToken: (userId) => {
        return jwt.sign({ _id: userId }, secret.secretKey, {
            expiresIn: secret.sessionExpiration,
        });
    },

    authenticate: (req, res, next) => {
        const {authorization} = req.headers;

        console.log('token:  ', req.headers);

        jwt.verify(authorization, secret.secretKey, async (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }

            try {
                const user = await User.findById(decoded._id);
                if (!user) {
                    return res.sendStatus(401);
                }
                req.currentUser = user;
                next();
            } catch (err) {
                next(err);
            }
        });
    }
};
