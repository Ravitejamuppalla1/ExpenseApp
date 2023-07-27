const Expensevariable = require('../models/Expense')

const Expensectlr = {}

Expensectlr.add = async (req, res) => {
    try {
        const { body } = req
        const expense = await Expensevariable.create({ ...body, userId: req.user.id })
        const expenseData = await expense.save()
        res.json(expenseData)

    }
    catch (e) {
        res.json(e)
    }
}

Expensectlr.update = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const updatedata = await Expensevariable.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        res.json(updatedata)
    }
    catch (e) {
        res.json(e)
    }
}

Expensectlr.destroy = async (req, res) => {
    try {
        const type = req.query.type
        const { id } = req.params
        let data
        if (type == 'soft') {
            data = await Expensevariable.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true })
        }
        else {
            data = await Expensevariable.findByIdAndDelete(id)
        }
        res.json(data)
    }
    catch (e) {
        res.json(e)
    }
}
Expensectlr.lists = async (req, res) => {
    const id = req.params.id
    const type = req.query.type
    try {
        let data
        if (type == 'Archieve') {
            data = await Expensevariable.find({ isDeleted: true, categoryId: id })
        }
        else if (type == 'all') {
            data = await Expensevariable.find({ isDeleted: false, categoryId: id })
        }
        res.json(data)

    }
    catch (e) {
        res.json(e)
    }
}

Expensectlr.categorywiseexpense = async (req, res) => {
    let id = req.params.id
    try {
        const expenseLists = await Expensevariable.find({ categoryId: id, isDeleted: false })
        if (expenseLists) {
            res.json(expenseLists)
        }
        else {
            res.status(404).json({
                errors: 'No Expenses are present '
            })
        }

    }
    catch (e) {
        res.status(500).json('erro')
    }
}

Expensectlr.getsum = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Expensevariable.find({ categoryId: id })
        let sum = 0
        if (data) {
            data.map(ele => {
                console.log(ele.amount)
                return sum += ele.amount
            })
        }
        else {
            sum = 0
        }
        res.json({ total: sum, categoryId: id })

    }

    catch (e) {
        res.json(e)
    }

}
Expensectlr.categorydestroy = async (req, res) => {
    const id = req.params.id
    try {
        const expenses_delete_category = await Expensevariable.findOneAndDelete({ categoryId: id }, { new: true, runValidators: true })
        res.json(expenses_delete_category)
    }
    catch (e) {
        res.json(e)
    }
}
Expensectlr.sum = async (req, res) => {
    try {
        const expense = await Expensevariable.find({ userId: req.user.id, isDeleted: false })
        if (expense) {
            res.json(expense)
        } else {
            res.json({})
        }
    }
    catch (e) {
        res.json(e)
    }
}

Expensectlr.delete = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Expensevariable.deleteMany({ userId: id })
        res.json(data)
    }
    catch (e) {
        res.json(e)
    }
}
module.exports = Expensectlr