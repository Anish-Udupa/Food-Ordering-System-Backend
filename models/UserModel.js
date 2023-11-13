const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    address: String,
    email: String,
    phone: Number,
    password_hash: String,
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;