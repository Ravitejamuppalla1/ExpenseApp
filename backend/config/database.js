const mongoose = require('mongoose')

const configmongodb = async(req,res)=>{
    try{
        const mon = await mongoose.connect('mongodb://127.0.0.1:27017/Academy-project')
        console.log('successfully connected')
    }
    catch(e){
        console.log(e)
    }
}

module.exports = configmongodb