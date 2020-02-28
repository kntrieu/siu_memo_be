const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
    username: String,
    email: String,
    fullname: String,
    password: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('users', UserSchema);