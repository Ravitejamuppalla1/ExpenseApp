import Home from "./Home"
import Register from './register'
import Login from "./login"
import Settings from './Settings'
import Expense from './Expense'
import Summary from "./Summary"
import Deleteaccount from "./Deleteaccount"
import { startAccountDetails } from "../actions/useraction"
import { Link, Route, withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'


const Navgar = () => {
   const [isloggedin, setisloggedin] = useState(false)
   const dispatch = useDispatch()
   const userData = useSelector((state) => {
      return state.userdata.data
   })
   console.log(userData)
   useEffect(() => {
      if (userData?.hasOwnProperty('Email')) {
         setisloggedin(true)
      } else if (localStorage.getItem('token')) {
         dispatch(startAccountDetails(localStorage.getItem('token')))

      }

   }, [userData])

   return (
      <div>
         {

            isloggedin ?
               <>
                  <div className="container-fluid">
                     <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "DodgerBlue" }}>
                        <h1 className="navbar-brand" ><span style={{ backgroundColor: "Orange" }}>EXPENSE APP</span></h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                           <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                           <ul className="navbar-nav mr-auto">
                              <li className="nav-item active">
                                 <Link className="nav-link" to='/'><li>Home</li></Link>

                              </li>
                              <li className="nav-item active">
                                 <Link className="nav-link" to='/setting'><li>Category</li></Link>
                              </li>
                              <li className="nav-item active">
                                 <Link className="nav-link" to='/summary'><li>Summary</li></Link>
                              </li>
                              <li className="nav-item active">
                                 <Link className="nav-link" to={`/delete_account/${userData._id}`}><li>Delete Account</li></Link>
                              </li>
                              <li className="nav-item active">
                                 <Link className="nav-link" to='/login'><li onClick={() => {
                                    Swal.fire('successfully logged out')
                                    localStorage.removeItem('token')
                                    setisloggedin(false)
                                 }}>Logout</li></Link>
                              </li>
                           </ul>
                        </div>

                     </nav>
                  </div>
               </>
               :

               <div className="container-fluid">
                  <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "DodgerBlue" }}>
                     <h1 className="navbar-brand" ><span style={{ backgroundColor: "Orange" }}>EXPENSE APP</span></h1>
                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>
                     <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mr-auto">
                           <li className="nav-item active">
                              <Link className="nav-link" to='/register'> Register</Link>
                           </li>
                           <li className="nav-item active">
                              <Link className="nav-link" to='/login'> LogIn </Link>
                           </li>
                        </ul>
                     </div>
                  </nav>
               </div>




         }
         {isloggedin ?
            <div>
               <Route path='/' component={Home} exact={true} />
               <Route path='/setting' component={Settings} exact={true} />
               <Route path='/expense/:id' component={Expense} exact={true} />
               <Route path='/delete_account/:id' render={(props) => {
                  return <Deleteaccount  {...props} setisloggedin={setisloggedin} />
               }} />
               <Route path='/summary' component={Summary} />
            </div>
            :
            <div>
               <Route path='/register' component={Register} exact={true} />
               <Route path='/login' render={(props) => {
                  return <Login  {...props} setisloggedin={setisloggedin} />
               }} />
            </div>
         }
      </div>

   )


}

export default withRouter(Navgar)