const mongoose = require('mongoose')
const {Schema} =mongoose

const studentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    phone: {
        type: Number
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
    },
    dateRegistered:{
        type:Date,
        default:Date.now()
    },
    studentID:{
        type: String
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    role: {
        type: String,
        default: "student"
    }
})

module.exports = {Student: mongoose.model('Student', studentSchema)}