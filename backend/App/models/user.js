const mongoose = require('mongoose')
const {Schema} = mongoose
const isEmail = require('validator/lib/isEmail')

const userschema = new Schema({
    Email:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return 'Invalid a Email'
            }
        }
    },
    password:{
        type:String,
        required:true,
        maxlength:128
       
    },
    budget:{
        type:Number,
        required:true,
        min:0
    }
})

const uservariable = mongoose.model('user',userschema)

module.exports = uservariable
