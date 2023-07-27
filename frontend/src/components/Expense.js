import { useState, useEffect } from 'react'
import { startcreateexpense, startexpensespercategory, startsoftdelete, startexpenseupdate, startPermanentDelete } from '../actions/Expenseaction'
import { startDisplayDeleteExpense } from '../actions/categoryaction'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Row, Col, Form } from 'react-bootstrap'


const Expense = (props) => {
    const [amount, setamount] = useState('')
    const [categoryId, setcategoryId] = useState('')
    const [expenseid, setexpenseid] = useState('')
    const [edit, setEdit] = useState(false)
    const [deleted, setdeleted] = useState(false)
    const [Restored, setRestored] = useState(false)
    const [permanentDelete, setpermanentDelete] = useState(false)

    const { id } = props.match.params
    const dispatch = useDispatch()
    useEffect(() => {
        setcategoryId(id)
        dispatch(startDisplayDeleteExpense(id))
    }, [deleted, permanentDelete])
    useEffect(() => {
        dispatch(startexpensespercategory(categoryId))
    }, [categoryId, Restored])
    const handleamountchange = (e) => {
        const input = e.target.value
        setamount(input)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        const formData = {
            amount,
            categoryId

        }
        {
            edit ? dispatch(startexpenseupdate(expenseid, { amount, expenseDate: new Date() })) :
                dispatch(startcreateexpense(formData))
        }
        setamount('')
    }
    const expenseDatapercategory = useSelector((state) => {
        return state.expensedata.data
    })
    const handlesoftdelete = (id) => {
        setdeleted(!deleted)
        dispatch(startsoftdelete(id))
    }
    const handleRestore = (ele) => {
        const formData = {
            isDeleted: !ele.isDeleted
        }
        setRestored(!Restored)
        setdeleted(!deleted)

        dispatch(startexpenseupdate(ele._id, formData))
    }
    const handlePermanentDelete = (id) => {
        setpermanentDelete(!permanentDelete)
        dispatch(startPermanentDelete(id))
    }
    const handleEdit = (ele) => {
        setEdit(!edit)
        setamount(ele.amount)
        setexpenseid(ele._id)
    }
    const deletedExpenses = useSelector((state) => {
        return state.categories.data
    })

    const handleShowEvent = () => {

    }
    return (
        <div>
            <Row className="justify-content-md-center">
                <Col md="auto" ><h3 style={{ color: "DarkBlue" }}>Expenses page</h3></Col>
            </Row>
            <center>
                <Form>
                    <Form.Group as={Row} className="mt-4 mb-3" >
                        <Form.Label className="mx-3" column md={2}>Amount</Form.Label>
                        <Col md={5}>
                            <Form.Control type="number" placeholder='Enter the Amount' value={amount} onChange={handleamountchange} />
                        </Col>
                    </Form.Group>
                    <Button variant="secondary" type="submit" onClick={handlesubmit}>
                        Submit
                    </Button>
                </Form>
            </center>
            {
               /* expenseDatapercategory ? <ul>
                    {
                        expenseDatapercategory.map(ele => {
                            return <>
                                <li key={ele._id}><b>Date</b>:{(ele.expenseDate).slice(0,10)},<b>Amount</b>:{ele.amount}</li><button onClick={() => { handlesoftdelete(ele._id) }}>Delete</button>
                                <button onClick={() => { handleEdit(ele) }}>Edit</button>
                            </>
                        })
                    }
                </ul> : <p>Loading</p>
                */ }
          

            {
                expenseDatapercategory ?
                    <div>
                        <h1> Lists of Expenses </h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="col">S.No</th>
                                    <th className="col">Expense Amount</th>
                                    <th className="col" >Expense Date</th>
                                    <th className="col">Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    expenseDatapercategory.map((ele, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{ele.amount}</td>
                                            <td>{(ele?.expenseDate)?.slice(0, 10)}</td>
                                            <td><button onClick={() => { handleEdit(ele) }} className="btn btn-info">Edit</button>
                                                <button onClick={() => { handlesoftdelete(ele._id) }} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <p style={{ color: 'Red' }}>No Events are scheduled </p>
            }
              <h3 style={{ color: "DarkBlue" }}>Restore Expenses</h3>
            {
                deletedExpenses.length > 0 ? <ul>{
                    deletedExpenses.map(ele => {
                        return <>
                            <li key={ele._id}><b>Date</b>:{(ele?.expenseDate)?.slice(0,10)},<b>Amount</b>:{ele.amount}</li>
                            <button className="btn btn-success" onClick={() => { handleRestore(ele) }}>Restore</button>
                            <button  className="btn btn-danger" onClick={() => { handlePermanentDelete(ele._id) }}>Delete</button>
                        </>
                    })} </ul> : <p style={{ color: 'Red' }}>No Restore Data  </p>
            }
        </div>

    )
}

export default Expense