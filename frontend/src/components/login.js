import React, { useEffect } from 'react'
import {useState} from 'react'
import { startAccountDetails, startuserlogin } from '../actions/useraction'
import { useSelector,useDispatch } from 'react-redux'
import {Button,Row,Col,Form} from 'react-bootstrap'
import {isEmail} from 'validator'

const Login = (props)=>{
    const[Email,setEmail] = useState('')
    const[password,setpassword] = useState('')
    const  [formErrors, setformErrors] = useState({})
    const  errors = {} 
    const dispatch = useDispatch()
    const {setisloggedin} = props
  
   
    const handleemailchange = (e)=>{
        const input = e.target.value
        setEmail(input)
    }
    
    const handlepasswordchange = (e)=>{
        const input = e.target.value
        setpassword(input)
    }
    const runValidations = ()=>{
        if(Email.length === 0){
            errors.Email = 'Email cannot be blank'
        }
        else if(!isEmail(Email)){
            errors.Email = 'Invalid Email format'
        }
        if(password.length === 0){
            errors.password = 'Password cannot be blank'
        }
       
    }

    const handlesubmit = (e)=>{
        e.preventDefault()
       runValidations()
       if(Object.keys(errors).length === 0){
        setformErrors({})
        const formData ={
            Email,
            password
        }
        dispatch(startuserlogin(formData,props,setisloggedin))
        setEmail('')
        setpassword('')
       }
       else{
        setformErrors(errors)
       }
    }
    
    return(
        <div>
            <Row className="justify-content-md-center">
                    <Col md="auto" ><h3 style={{ color: "DarkBlue" }}>Login</h3></Col>
            </Row>
            <center>
            <Form>
            <Form.Group as={Row} className='mt-5' >
                       <Form.Label className="mx-5"  column md={2}>Email</Form.Label>
                       <Col md={5}>
                       <Form.Control type="email" placeholder='Enter your Email' value={Email} onChange={handleemailchange} />
                       <Form.Text className="text-muted">
                       {formErrors.Email ?<span>{formErrors.Email}</span> : "We'll never share your email with anyone else."}
                       </Form.Text>
                       </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" >
                       <Form.Label className="mx-5"  column md={2}>Password</Form.Label>
                       <Col md={5}>
                       <Form.Control type="password" placeholder='Enter your password' value={password} onChange={handlepasswordchange} />
                       <Form.Text className="text-muted">
                          {formErrors.password ?<span>{formErrors.password}</span> : "We'll never share your email with anyone else."}                       
                     </Form.Text>
                       </Col>
              </Form.Group>
           
              <Button variant="secondary" type="submit" className="mx-5" onClick={handlesubmit}>
                Login
                </Button>
             
             </Form>
             </center>
        </div>
    )
}

export default Login