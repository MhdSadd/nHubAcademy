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
  },
  dateCreated:{
    type:Date,
    default:Date.now(),
  },
  promo: String,
  description:String,
  author: String,



})

module.exports = {Course: mongoose.model('Course', courseSchema)}