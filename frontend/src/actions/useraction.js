import axios from '../config/axios'
import Swal from 'sweetalert2'
export const ACCOUNT_DETAILS = "ACCOUNT_DETAILS"

export const startuserregister = (props) => {
    console.log(props)
    return (dispatch) => {
        axios.post('/api/register', props)
            .then((result) => {
                console.log(result.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}
export const startAccountDetails = (props) => {
    return (dispatch) => {
        axios.get('/api/Account', {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((result) => {
                console.log(result.data)

                dispatch(Account_Details(result.data))

            })
            .catch((err) => {
                console.log(err)
            })
    }
}
export const startuserlogin = (formdata, props) => {
    return (dispatch) => {
        axios.post('/api/login', formdata)
            .then((result) => {
                localStorage.setItem('token', result.data.token)
                if (localStorage.getItem('token') != 'undefined') {
                    Swal.fire('successfully logged in')
                    props.history.push('/')
                    dispatch(startAccountDetails(localStorage.getItem('token')))

                }
                else {
                    props.history.push('/login')
                    Swal.fire('Invalid Email or password')
                }
            })
            .catch((err) => {
                console.log({
                    errors: "Invaild Email and Password"
                })
            })
    }
}

const Account_Details = (data) => {
    return {
        type: ACCOUNT_DETAILS,
        payload: data
    }
}


export const startdeleteuser = (id, props, setisloggedin) => {
    return (dispatch) => {
        axios.delete(`api/Account/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result, 'req')
                if (result.hasOwnProperty('Email')) {
                    props.history.push('/register')
                    setisloggedin(false)
                    localStorage.removeItem('token')
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

