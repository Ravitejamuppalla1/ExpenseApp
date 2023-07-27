import { CREATE_CATEGORY,DELETE_CATHEGORY,ARCHIEVE_EXPENSE } from "../actions/categoryaction"
import {SHOW_ALL} from "../actions/categoryaction"

const initialreducer = {
    data :[],
    notice:''
}

 export const Categoryreducer = (state=initialreducer,action)=>{
   
    switch(action.type){
        case SHOW_ALL:{
            return{...state,data:action.payload}
        }
        case CREATE_CATEGORY:{

          return {...state,data:[...state.data,action.payload]}
        }
        case DELETE_CATHEGORY:{
           
            return {...state,data:state.data.filter(ele=>{
                if( ele._id != action.payload._id){
                         return {...ele}
                } 
            })

        }
    }
    case ARCHIEVE_EXPENSE :{
       return {...state,data:action.payload}
    }
        default:{
            return state
        }
    }

}


