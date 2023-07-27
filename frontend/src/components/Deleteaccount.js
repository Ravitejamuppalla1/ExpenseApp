import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startdeleteuser } from "../actions/useraction";
import { startdeletecategory_user } from "../actions/categoryaction";
import { startdeleteexpense_user } from "../actions/Expenseaction";


const Deleteaccount = (props) => {
  const { id } = props.match.params
  
  const dispatch = useDispatch()
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          const promise = Promise.all([dispatch(startdeletecategory_user(id)), dispatch(startdeleteexpense_user(id))])
          dispatch(startdeleteuser(id,props,props.setisloggedin))
}

    })
  }

  return (
       <div>

            <h4 style={{ color: 'Black' }} className="mt-4"> Click below to delete your account...</h4>
            <button className='btn btn-danger mt-2' onClick={handleDelete}> Delete Account </button>

        </div>
   
  )
}

export default Deleteaccount