const mongoose  = require('mongoose')
const {Schema} = mongoose

const courseSchema = new Schema({
  courseImage:{
    type: String,
    required: true
  },
  courseName:{
      type: String,
      required: true
  },
  price:{
    type:Number,
    required:true
  },
  duration:{
    type:String,
  },
  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Instructor'
  },
  category:{
    type: String,
    required:true
  },
  dateCreated:{
    type:Date,
    default:Date.now(),
  },
  promo: String,
  description:String,
  author: String,



})

module.exports = {Course: mongoose.model('courses', courseSchema)}