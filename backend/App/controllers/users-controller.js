const uservariable = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
require('dotenv').config()
const userctlr = {}

userctlr.register = async(req,res)=>{
    try{
        const {body} =req
        const user = await uservariable.create(body)
        const saltvalue = await bcrypt.genSalt()
        const hashvalue = await bcrypt.hash(user.password,saltvalue)
        user.password =hashvalue
        const newuser = await user.save()
        res.json(newuser)
 }
    catch(e){
        res.json(e)
    }
}

userctlr.login = async(req,res)=>{
    try{
        const {body} = req
        const result = await uservariable.findOne({Email:body.Email})
        if(!result){
            res.json({
                error :"Invalid Email or password"
            })
        }
        else{
            const verifypassword =await  bcrypt.compare(body.password,result.password)
            if(verifypassword){
                const tokenData = {
                    id:result._id,
                    budget:result.budget,
                    Email:result.Email
                }
              const jwttoken = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
               res.json(
                {
                    token :`Bearer ${jwttoken}`
                }
                )
            }
            else{
                res.json({
                    errors:'Invalid Email or password'
                })
            }
        } }
    catch(e){
        res.json(e)
    }
 }
 
 userctlr.Account = async(req,res)=>{
    try{
           const accountDetails = await uservariable.findById(req.user.id)
          res.json(accountDetails)
    }
    catch(e){
        res.json(e)
    }
 }

 userctlr.destory = async(req,res)=>{
    const {id} = req.params
    try{
             const data =  await uservariable.findByIdAndDelete(id)
             res.json(data)

    }
    catch(e){
        res.json(e)
    }
 }

module.exports = userctlr