const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    creditCard: {
        number: Number,
        cvc: Number,
        expYear: Number
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
