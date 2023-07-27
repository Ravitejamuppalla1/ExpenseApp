import axios from '../config/axios'
export const CREATE_CATEGORY = "CREATE_CATEGORY"
export const DELETE_CATHEGORY = "DELETE_CATHEGORY"
export const SHOW_ALL = "SHOW_ALL"
export const ARCHIEVE_EXPENSE = "ARCHIEVE_EXPENSE"
export const startcreatecategory = (formData) => {
    return (dispatch) => {
        axios.post('/api/note', formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
                dispatch(newcategory(result.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const newcategory = (data) => {
    return {
        type: CREATE_CATEGORY,
        payload: data
    }
}

export const startshow = () => {
    return (dispatch) => {
        axios.get('/api/category', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
                if (result) {
                    dispatch(showcategories(result.data))
                }
                else {
                    alert("No Data found")
                }

            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

const showcategories = (data) => {

    return {
        type: SHOW_ALL,
        payload: data
    }
}

export const startdeletecategory = (id) => {
    return (dispatch) => {
        axios.delete(`/api/deletecategory/${id}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((result) => {
                dispatch(deletedcategory((result.data)))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

const deletedcategory = (data) => {
    console.log(data, 'delte')
    return {
        type: DELETE_CATHEGORY,
        payload: data
    }
}

export const startDisplayDeleteExpense = (id) => {
    return (dispatch) => {
        axios.get(`api/expense/${id}?type=Archieve`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
                dispatch(ArchieveExpense(result.data))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

}

const ArchieveExpense = (data) => {
    return {
        type: ARCHIEVE_EXPENSE,
        payload: data
    }
}

export const startdeletecategory_user = (id) => {
    return (dispatch => {
        axios.delete(`/api/delete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((result) => {
                console.log(result.data, 'c')
            })
            .catch((err) => {
                console.log(err.message)
            })
    })
}