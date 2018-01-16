const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
    },

    authWithRole: (userRoles = []) => {
        return function (req, res, next) {
            const {authorization} = req.headers;

            jwt.verify(authorization, secret.secretKey, async (err, decoded) => {
                if (err) {
                    return res.sendStatus(401);
                }

                try {
                    const user = await User.findById(decoded._id).populate('roles', 'roleType');

                    if (!user) {
                        return res.sendStatus(401);
                    }

                    const { roles } = user;
                    const checkedRoles = roles.map(role => role.roleType);

                    if (userRoles.length > 0 && !_.intersection(userRoles, checkedRoles).length) {
                        res.status(403);
                        res.send('Not permitted');
                        return;
                    }

                    next();

                } catch (err) {
                    next(err);
                }
            });
        }
    }
};
