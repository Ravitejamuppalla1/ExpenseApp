import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startcreatecategory, startshow, startdeletecategory } from '../actions/categoryaction'
import { startdeleteexpensecategorywise } from '../actions/Expenseaction'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col, Form } from 'react-bootstrap'
const Settings = (props) => {
    const [name, setname] = useState('')
    const [note, setnote] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startshow())
    }, [dispatch])
    const categorylists = useSelector((state) => {
        return state.categories.data
    })
    console.log(categorylists, 'clll')

    const handlenamechange = (e) => {
        const input = e.target.value
        setname(input)
    }
    const handlenotechange = (e) => {
        const input = e.target.value
        setnote(input)

    }
    const handlesubmit = (e) => {
        e.preventDefault()
        const formData = {
            name,
            note
        }

        dispatch(startcreatecategory(formData))
        setname('')
        setnote('')
    }
    const handledelete = (id) => {
        dispatch(startdeletecategory(id))
        dispatch(startdeleteexpensecategorywise(id))
    }
    return (
        <div>
            <Row className="justify-content-md-center">
                <Col md="auto" ><h3 style={{ color: "DarkBlue" }}>Categories</h3></Col>
            </Row>
            <center>
                <Form>
                    <Form.Group as={Row} className="mt-5 mb-3"  >
                        <Form.Label className="mx-3" column md={2}>Category name</Form.Label>
                        <Col md={5}>
                            <Form.Control type="text" placeholder='Enter category name' value={name} onChange={handlenamechange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label className="mx-3" column md={2}>Note</Form.Label>
                        <Col md={5}>
                            <Form.Control as="textarea" row={2} value={note} placeholder='Enter comments' onChange={handlenotechange} />
                        </Col>
                    </Form.Group>

                    <Button variant="secondary" type="submit" onClick={handlesubmit}>
                        Submit
                    </Button>

                </Form>
            </center>

            {
                categorylists ? <ul>{categorylists.map(ele => {
                    console.log(ele)
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Link to={`/expense/${ele._id}`}><Card.Title>{ele.name}</Card.Title></Link>
                                <Card.Text>
                                    The Expenses spent on {ele.name}
                                </Card.Text>
                                <Button variant="outline-secondary"  className="btn btn-danger"  onClick={() => { handledelete(ele._id) }}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )


                })
                }
                </ul>
                    : <p>loading</p>
            }

        </div>
    )
}

export default Settings