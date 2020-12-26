const mongoose = require('mongoose')
const {Schema}  = mongoose

const adminSchema = new Schema({
  name:{
    type: String,
    // required:true
  },
  email:{
    type:String,
    // required:true
  },
  password:{
  type: String,
  },
  userType:{
    type: String
  },
  avatar:{
    type: String
  },
  role: {
    type: String,
    default: "admin",
  },
  phone: Number,

  
})

module.exports = {Admin: mongoose.model('admin', adminSchema)}