import axios from '../config/axios'
import Swal from 'sweetalert2'
export const CREATE_EXPENSE = "CREATE_EXPENSE"
export const CATEGORY_WISE_EXPENSE = "CATEGORY_WISE_EXPENSE"
export const TOTAL_SUM = "TOTAL_SUM"
export const UPDATE_EXPENSE = "UPDATE_EXPENSE"
export const SOFT_DELETE = "SOFT_DELETE"
export const SUM = "SUM"
export const startcreateexpense = (formData) => {
   console.log('1')
   return (dispatch) => {
      axios.post('/api/expense', formData, {
         headers: {
            'Authorization': localStorage.getItem('token')
         }
      })

         .then((result) => {
            dispatch(createexpense(result.data))
         })
         .catch((err) => {
            console.log(err)
         })
   }
}

const createexpense = (data) => {
   return {
      type: CREATE_EXPENSE,
      payload: data
   }
}

export const startexpensespercategory = (id) => {

   return (dispatch) => {
      axios.get(`/api/categoryexpense/${id}?type=all`, {
         headers: {
            'Authorization': localStorage.getItem('token')
         }
      })
         .then((result) => {
            dispatch(categoryexpense(result.data))
         })
         .catch((err) => {
            console.log(err)
         })
   }
}

const categoryexpense = (data) => {
   return {
      type: CATEGORY_WISE_EXPENSE,
      payload: data

   }
}

export const startsoftdelete = (id, formData) => {
   return (dispatch) => {
      axios.delete(`/api/expense/${id}?type=soft`, {
         headers: {
            'Authorization': localStorage.getItem('token')
         }
      })
         .then((result) => {
            dispatch(softDelete(result.data))
         })
         .catch((err) => {
            console.log(err.message)
         })
   }
}

const softDelete = (data) => {
   console.log(data)
   return {
      type: SOFT_DELETE,
      payload: data
   }
}

export const startTotalexpense = (id) => {
   return (dispatch) => {
      axios.get(`/api/Totalexpense/${id}`, {
         headers: {
            'Authorization': localStorage.getItem('token')
         }
      })
         .then((result) => {
            dispatch(Totalexpense(result.data))
         })
         .catch((err) => {
            console.log(err)
         })

   }
}

const Totalexpense = (total) => {
   return {
      type: TOTAL_SUM,
      payload: total

   }
}

export const startdeleteexpensecategorywise = (id) => {
   return (dispatch) => {
      axios.delete(`/api/categorywiseexpense/${id}`, {
         headers: {
            'Authorization': localStorage.getItem('token')
         }
      })
         .then((result) => {
            console.log(result.data)
         })
         .catch((err) => {
            console.log(err.message)
         })
   }
}

export const startexpenseupdate = (id, formData) => {
   return (dispatch) => {
      axios.put(`/api/expense/${id}`, formData, {
         headers: {
            'Authorization': localStorage.getItem('token')
         }
      })
         .then((result) => {
            console.log(result.data, 'update')
            dispatch(updateExpense(result.data))
         })
         .catch((err) => {
            console.log(err)
         })
   }

}

const updateExpense = (data) => {
   return {
      type: UPDATE_EXPENSE,
      payload: data
   }
}
const getExpense = (data) => {
   return {
      type: SUM,
      payload: data
   }
}
export const startGetExpense = () => {
   return (dispatch) => {
      axios.get('/api/expense', { headers: { 'authorization': localStorage.getItem('token') } })
         .then((response) => {
            console.log(response.data)
            const result = response.data
            dispatch(getExpense(result))
         })
         .catch((err) => {
            console.log(err.message)
         })
   }
}

export const startdeleteexpense_user = (id) => {
   return (dispatch) => {
      axios.delete(`/api/deleteexpense/${id}`, {
         headers: {
            'Authorization': localStorage.getItem('token')
         }
      })
         .then((result) => {
            console.log(result.data, 'e')
         })
         .catch((err) => {
            console.log(err.message)
         })
   }
}



export const startPermanentDelete = (id)=>{
   return(dispatch)=>{
      try{
            axios.delete(`/api/expense/${id}`,{headers:{
               'Authorization':localStorage.getItem('token')
            }})
            .then((result)=>{
                const permanentDeleteDate = (result.data)
               Swal.fire('Permanently deleted the record')
            })
      }
      catch(err){
           console.log(err.message)
      }
   }
}