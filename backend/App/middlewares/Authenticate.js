const jwt = require('jsonwebtoken')
require('dotenv').config()
const Authenticateuser = (req,res,next)=>{
    const token = req.header('Authorization').split(' ')[1]
     const data = jwt.verify(token,process.env.SECRET_KEY)
     const userdata = {
                 id:data.id
               }
   req.user = userdata
    next()
}

module.exports =Authenticateuser