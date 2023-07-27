const mongoose = require('mongoose')
const {Schema} = mongoose

const expenseschema = new Schema({
    amount:{
        type:Number,
        required:true,
        min:0
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
       
    },
    note:{
        type:String
    },
    expenseDate:{
        type:Date,
        required:true,
        default: new Date()
    },
    isDeleted:{
        type:Boolean, //init
        default:false  //0
    }
})

const Expensevariable = mongoose.model('Expense',expenseschema)

module.exports = Expensevariable