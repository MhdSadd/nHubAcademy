const mongoose = require('mongoose')
const {Schema} = mongoose

const outlineSchema = new Schema({
  outline:[
    {
      courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
      },
      outlineName:{
        type:String,
      },
      outlineContent:{
        type:String
      }
    }
  ]
})

module.exports = {Outline: mongoose.model('outline',outlineSchema )}