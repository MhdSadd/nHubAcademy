const mongoose = require("mongoose");
// const validator = require("validator");
const {Schema} = mongoose;

const instructorSchema = new Schema({
    instructorApproved: {
        type: Boolean,
        default: false
    },
    availability:{
        type:Boolean
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
        // validate: (value) => {
        //     return validator.isEmail(value)
        // }
    },         
    role: {
        type: String,
        default: "instructor"
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String
    },
    
    instructorAvatar: {
        type: String,
    },
    skills:mongoose.Schema.Types.Array,
    experience: {
        type: Array
    },
    instructorId: {
        type: String
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },
    specialty:String,
  
})

module.exports = {Instructor: mongoose.model("Instructor", instructorSchema) };