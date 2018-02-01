const jwt = require('jsonwebtoken');

module.exports = {

    generateToken: (userId) => {
        return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        });
    }
};
