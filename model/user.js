const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {decodePassword} = require('../helpers/passwordHelper');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'role'
    }],
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'ticket'
    }],
    creditCard: {
        number: Number,
        cvc: Number,
        expYear: Number
    }
});

userSchema.statics.byEmail = function (email) {
    return this.find({email: email});
};

userSchema.statics.findUserWithRole = function (userId) {
  return this.findOne(userId).populate('role');
};

userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    });

userSchema.methods.createHashedPassword = async function (next) {
    try {
        this.password = await decodePassword(this.password);
        return next();
    } catch (err) {
        return next(err);
    }
};

// bcrypt password before save user to the DB
userSchema.pre('save', async function (next) {
    try {
        this.password = await decodePassword(this.password);
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('user', userSchema, 'user');

module.exports = User;
