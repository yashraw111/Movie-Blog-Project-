const { Schema, model } = require("mongoose");

const common = {
    type:String,
    required:true,
    unique:true,
    trim:true
}
const Admin = new Schema({
    username:common,
    email:common,
    password:{
        ...common,
        // type:
    },
    profile_image:String,
    token:String
},{timestamps:true})

const admin = model('Admin',Admin)

module.exports = admin