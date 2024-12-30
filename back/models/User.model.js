const mongoose = require('mongoose')

const schema = mongoose.Schema({
    cin: Number,
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adresse: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' } ,
    resetKey: String,
    resetTimeout :Date


})
module.exports = mongoose.model ('User', schema)