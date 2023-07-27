import { Chart } from 'react-google-charts'
import { startshow } from '../actions/categoryaction'
import { startGetExpense } from '../actions/Expenseaction'
import { startAccountDetails } from '../actions/useraction'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'


const ChartsDisplay = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetExpense())
        dispatch(startAccountDetails())
    }, [dispatch])

    const result = useSelector((state) => {
        return state.userdata.data
    })

    const result1 = useSelector((state) => {
        return state.expensedata.data
    })
    console.log(result, result1)
    const expense = result1.reduce((iv, pv) => {
        return iv + pv.amount
    }, 0)

    const budget1 = result.budget
    console.log(expense, budget1)
    const data = [
        ["Expense", "Amount"],
        ['Total Expenses', expense],
        ['Total Budget', budget1],
    ]


    const options = {
        title: "My Expense App",
        pieHole: 0,
    }
    return (<div>
        <h2 style={{ color: 'Violet' }}> Total Budget - {budget1}</h2>
        <h2 style={{ color: 'DodgerBlue' }}> Estimated Expenses - {expense} </h2>
        <h2 style={{ color: 'Red' }}> Remaining Budget -{(budget1) - expense} </h2>
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    </div>
    )
}


export default ChartsDisplay