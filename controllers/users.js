const User = require('../model/user');

module.exports = {

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = new User(req.body);
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await User.findByIdAndUpdate(id);
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    },

    removeUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.findByIdAndRemove(id);
            console.log(user);
            res.status(205).json(MessageHelper.initMessageObj(MessageHelper.messages.removedUserMessage));
        } catch (err) {
            next(err);
        }
    }
};