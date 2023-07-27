import { createStore, combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Userreducer } from '../reducers/userreducer'
import { Categoryreducer } from '../reducers/Categoryreducer'
import { Expensereducer } from '../reducers/Expensereducer'
const Configurestore = () => {
    const store = createStore(combineReducers({
        userdata: Userreducer,
        categories: Categoryreducer,
        expensedata: Expensereducer

 }), applyMiddleware(thunk))
    return store


}
export default Configurestore