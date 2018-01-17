const User = require('../model/user');
const Role = require('../model/user_roles');
const Invite = require('../model/invite');
const {getDefaultValues} = require('../helpers/appHelper');
const {initMessageObj, messages} = require('../helpers/messageHelper');
const {generateInviteCode} = require('../helpers/inviteHelper');
const {sendSMS, createCall} = require('../helpers/twilioHelper');
const userRoles = require('../enums/userRoles');


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

            const paginatedUsers = await User
                .paginate(pageRes, limitRes)
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
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json(initMessageObj(messages.notFoundUserMessage));
            }

            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

    searchUser: async (req, res, next) => {
        try {
            const {text} = req.query;

            const user = await User
                .search(text);

            if (!user) {
                return res.status(404).json(initMessageObj(messages.notFoundUserMessage));
            }

            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

    createViewer: async (req, res, next) => {
        try {
            const viewer = new User(req.body);

            const roleObj = {
                user: viewer,
                roleType: userRoles.VIEWER
            };
            const role = new Role(roleObj);

            viewer.roles.push(role);

            await viewer.save();
            await role.save();

            res.status(201).json(initMessageObj(messages.userSaved));
        } catch (err) {
            next(err);
        }
    },

    inviteManager: async (req, res, next) => {
        try {

            const {email} = req.query;

            const user = await User.findOne({email: email});

            if (user) {
                return res.status(409).send(messages.userExists);
            }

            const inviteCode = generateInviteCode();

            const inviteObj = {
                code: inviteCode,
                verified: false,
                email: email
            };

            //TODO send invite code by the sms

            const invite = new Invite(inviteObj);

            await invite.save();

            res.status(200).json({
                code: inviteCode
            });

        } catch (err) {
            next(err);
        }
    },

    createManager: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {code} = req.query;

            const manager = new User(req.body);

            const roleObj = {
                user: manager,
                roleType: userRoles.MANAGER
            };

            const role = new Role(roleObj);

            const invite = await Invite
                .findOne({
                    email: email,
                    code: code,
                    verified: false
                });

            if (!invite) {
                return res.status(400).send(messages.inviteCodeNotFound);
            }

            await invite.update({verified: true});

            await user.save();
            await role.save();

            res.status(201).json(initMessageObj(messages.userSaved));
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

            if (!user) {
                return res.status(404).json(initMessageObj(messages.notFoundUserMessage))
            }

            res.status(205).json(initMessageObj(messages.removedUserMessage));
        } catch (err) {
            next(err);
        }
    },

    notifyUser: async (req, res, next) => {
        try {
            const {body, to, from} = req.body;
            const smsResponse = await sendSMS(body, to, from);
            res.status(200).json(smsResponse);
        } catch (err) {
            res.status(400).json(err);
            next(err)
        }
    }
};