const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    code: Number,
    verified: Boolean,
    email: String,
});

const Invite = mongoose.model('invite', inviteSchema);
module.exports = Invite;
