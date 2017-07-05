const User = require('../model/user');
const {getDefaultValues} = require('../helpers/appHelper');
const {initMessageObj, messages} = require('../helpers/messageHelper');
const {decodePassword} = require('../helpers/passwordHelper');

module.exports = {

    getUsers: async (req, res, next) => {
        try {
            const users = await User
                .find({})
                .select({password: 0, tickets: 0});

            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    },

    getUsersByPagination: async (req, res, next) => {
        try {

            const {page, limit, sort} = req.query;

            const pageRes = parseInt(page) || getDefaultValues.defaultPage;
            const limitRes = parseInt(limit) || getDefaultValues.defaultLimit;
            const sortRes = sort || getDefaultValues.defaultSort;

            const skipRes = (pageRes * limitRes) - limitRes;
            const paginatedUsers = await User
                .find({})
                .skip(skipRes)
                .limit(limitRes)
                .sort({title: sortRes})
                .select({password: 0, tickets: 0});

            res.status(200).json(paginatedUsers);
        } catch (err) {
            next(err);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User
                .findById(id);

            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = new User(Object.assign(req.body, {password: await decodePassword(req.body.password)}));
            await user.save();

            res.status(201).json(initMessageObj(messages.userSaved));
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await User
                .findByIdAndUpdate(id);

            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    },

    removeUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User
                .findByIdAndRemove(id);

            if (!user) {
                return res.status(404).json(initMessageObj(messages.notFoundUserMessage))
            }

            res.status(205).json(initMessageObj(messages.removedUserMessage));
        } catch (err) {
            next(err);
        }
    }
};