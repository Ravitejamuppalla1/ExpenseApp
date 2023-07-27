const express = require('express')
const app = express()
const cors = require('cors')
const configmongodb = require('./config/database')
const router = require('./config/Routes')
const port = 3020
app.use(express.json())
app.use(cors())
app.use(router)
app.listen(port,(req,res)=>{
    console.log( `welcome to port ${port}`)
})
configmongodb()