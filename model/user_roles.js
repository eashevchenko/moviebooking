const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    roleType: String,
    user: {
       type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;
