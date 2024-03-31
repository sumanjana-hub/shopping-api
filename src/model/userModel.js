const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{type: String, default: null},
    email:{type: String, default: null},
    password:{type: String, default: null},
    accessToken: { type: String, default: null },
    createdAt: { type: Number, default: Date.now },
},{timestamps:true})

module.exports = mongoose.model("user",userSchema)