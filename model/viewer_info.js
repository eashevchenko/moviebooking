const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewerInfoSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    phoneNumber: String,
    profilePhotoName: String,
    profilePhotoUrl: String
});

const ViewerInfo = mongoose.model('viewer_info', viewerInfoSchema, 'viewer_info');

module.exports = ViewerInfo;
