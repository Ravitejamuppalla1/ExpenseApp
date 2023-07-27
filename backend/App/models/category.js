const mongoose = require('mongoose')
const {Schema} =mongoose

const categoryschema = new Schema ({
       name:{
            type:String,
            required:true
       },
       note:{
        type:String
       },
       userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    
       }
})

const categoryvariable = mongoose.model('category',categoryschema)

module.exports = categoryvariable