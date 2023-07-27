const categoryvariable = require('../models/category')
const categoriesctlr = {}

categoriesctlr.write = async(req,res)=>{
    try{
        const {body} = req
       const newnote = await categoryvariable.create({name:body.name,note:body.note,userId:req.user.id})
       const newdata = await newnote.save()
        res.json(newdata)

    }
    catch(e){
        res.json(e)
    }
}

categoriesctlr.lists = async(req,res)=>{
     try{
           const data = await categoryvariable.find({userId:req.user.id})
           console.log(data)
             if(data){
               res.json(data)
                 }}
    catch(e){
        res.json(e)
    }
}
categoriesctlr.destroy = async(req,res)=>{
         const {id} =req.params
    try{
        const data = await categoryvariable.findByIdAndDelete(id,{new:true,runValidators:true})
        res.json(data)

    }
    catch(e){
        res.json(e)
    }
}

categoriesctlr.delete = async(req,res)=>{
    const {id} =req.params
try{
   const data = await categoryvariable.deleteMany({userId:id})
   res.json(data)

}
catch(e){
   res.json(e)
}
}

module.exports = categoriesctlr