import { CREATE_EXPENSE,CATEGORY_WISE_EXPENSE,TOTAL_SUM,UPDATE_EXPENSE,SOFT_DELETE,SUM } from "../actions/Expenseaction"
const initialreducer = {
    data:[],
    notice:''
}

export const Expensereducer = (state=initialreducer,action)=>{
    switch(action.type){
        case CREATE_EXPENSE:{
            return {...state,data:[...state.data,action.payload]}
        }
        case CATEGORY_WISE_EXPENSE:{
            
            return {...state,data:action.payload}
        }
        case TOTAL_SUM:{
            return {...state,data:[...state.data,action.payload]}
        }
       
       case UPDATE_EXPENSE :{
            return {...state,data:state.data.map(ele=>{
                if(ele._id == action.payload._id && ele._isDeleted !== action.payload.isDeleted){
                      return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
            })} 
        } 
        case SOFT_DELETE:{
           return {...state,data:state.data.filter(ele=>{
           
                 if(ele._id !== action.payload._id && ele.isDeleted == false){
                    return {...ele}
                 }
           })}

        }
         case SUM:{
            return {...state,data:action.payload}
         }
          default :{
            return state
        }
    }
}