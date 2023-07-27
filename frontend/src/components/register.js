import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { startuserregister } from '../actions/useraction'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { isEmail } from 'validator'
const Register = (props) => {
    const [Email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [budget, setbudget] = useState('')
    const [formErrors, setformErrors] = useState({})
    const errors = {}


    const dispatch = useDispatch()

    const handlemailchange = (e) => {
        const input = e.target.value
        setEmail(input)
    }
    const handlepasswordchange = (e) => {
        const input = e.target.value
        setpassword(input)
    }
    const handlebudget = (e) => {
        const input = e.target.value
        setbudget(input)
    }
    const runValidations = () => {
        if (Email.length === 0) {
            errors.Email = 'Email cannot be blank'
        }
        else if (!isEmail(Email)) {
            errors.Email = 'Invalid Email format'
        }
        if (password.length === 0) {
            errors.password = 'Password cannot be blank'
        }
        if (budget.length === 0) {
            errors.budget = 'Budget cannot be blank'
        }
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setformErrors({})
            const formData = {
                Email,
                password,
                budget
            }

            dispatch(startuserregister(formData))
            props.history.push('/login')
        }
        else {
            setformErrors(errors)
        }

    }


    return (
        <div>
            <Row className="justify-content-md-center">
              <center> <Col md="auto" ><h3 style={{ color: "DarkBlue" }} >Register</h3></Col></center> 
            </Row>
            <center>
            <Form  >
                <Form.Group as={Row}  className='mt-5'>
                    <Form.Label className="mx-5" column md={2}>Email</Form.Label>
                    <Col md={5}>
                        <Form.Control type="email" placeholder='Enter Email' value={Email} onChange={handlemailchange} />

                        <Form.Text className="text-muted">
                            {formErrors.Email ? <span>{formErrors.Email}</span> : "We'll never share your email with anyone else."}
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label className="mx-5" column md={2}>Password</Form.Label>
                    <Col md={5}>
                        <Form.Control type="password" placeholder='Enter a Password' value={password} onChange={handlepasswordchange} />
                        <Form.Text className="text-muted">
                            {formErrors.password ? <span>{formErrors.password}</span> : "We'll never share your email with anyone else."}
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label className="mx-5" column md={2}>Budget</Form.Label>
                    <Col md={5}>
                        <Form.Control type="Budget" placeholder='Enter your budget' value={budget} onChange={handlebudget} />
                        <Form.Text className="text-muted">
                            {formErrors.budget && <span>{formErrors.budget}</span>}
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Button variant="secondary" type="submit" onClick={handlesubmit}>
                    Register
                </Button>

            </Form>
            </center>
        </div>
    )
}

export default Register