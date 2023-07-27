const express = require('express')
const router = express.Router()
const userctlr = require('../App/controllers/users-controller')
const categoriesctlr = require('../App/controllers/categories-controller')
const Expensectlr = require('../App/controllers/Expenses-controller')

const Authenticateuser = require('../App/middlewares/Authenticate')

router.post('/api/register', userctlr.register)
router.post('/api/login', userctlr.login)
router.get('/api/Account', Authenticateuser, userctlr.Account)
router.delete('/api/Account/:id', Authenticateuser, userctlr.destory)

router.post('/api/note', Authenticateuser, categoriesctlr.write)
router.get('/api/category', Authenticateuser, categoriesctlr.lists)
router.delete('/api/deletecategory/:id', Authenticateuser, categoriesctlr.destroy)
router.delete('/api/delete/:id', Authenticateuser, categoriesctlr.delete)


router.post('/api/expense', Authenticateuser, Expensectlr.add)
router.put('/api/expense/:id', Authenticateuser, Expensectlr.update)
router.delete('/api/expense/:id', Authenticateuser, Expensectlr.destroy)
router.get('/api/expense/:id', Authenticateuser, Expensectlr.lists)
router.get('/api/categoryexpense/:id', Authenticateuser, Expensectlr.categorywiseexpense)
router.get('/api/Totalexpense/:id', Authenticateuser, Expensectlr.getsum)
router.get('/api/expense', Authenticateuser, Expensectlr.sum)
router.delete('/api/categorywiseexpense/:id', Authenticateuser, Expensectlr.categorydestroy)
router.delete('/api/deleteexpense/:id', Authenticateuser, Expensectlr.delete)





module.exports = router

