const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    decodePassword: async (password) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            return bcrypt.hash(password, salt);
        } catch (err) {
            return new Error(err);
        }

    },

    comparePassword: async (password, hash) => {
        try {
           return bcrypt.compare(password, hash);
        } catch (err) {
            return new Error(err);
        }
    }
};