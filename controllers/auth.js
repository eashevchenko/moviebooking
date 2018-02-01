const User = require('../model/user');
const {initMessageObj, messages} = require('../helpers/messageHelper');
const {comparePassword} = require('../helpers/passwordHelper');
const {generateToken} = require('../helpers/authHelper');

module.exports = {

    login: async (req, res, next) => {
        // try {
        //
        //     const {email, password} = req.body;
        //     const user = await User.findOne({email: email});
        //
        //     if (!user) {
        //
        //         return res.status(404).json(initMessageObj(messages.notFoundUserMessage));
        //     }
        //
        //     const isSamePassword = await comparePassword(password, user.password);
        //
        //     if (!isSamePassword) {
        //         return res.status(404).send('provide your credentials');
        //     }
        //
        //     const token = generateToken(user._id);
        //
        //     res.status(200).json({token: token});
        //
        // } catch (err) {
        //     next(err);
        // }

        throw new Error('test error');
    }
};
