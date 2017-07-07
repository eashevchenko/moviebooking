const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {decodePassword} = require('../helpers/passwordHelper');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    role:{
        type: Schema.Types.ObjectId,
        ref: 'role'
    },
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

userSchema.methods.createHashedPassword = async function () {
    this.password =  await decodePassword(this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
