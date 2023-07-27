import { ACCOUNT_DETAILS } from "../actions/useraction"
const initialreducer = {
    data:{},
    notice:''
}

 export const Userreducer = (state=initialreducer,action)=>{
    switch (action.type){
       case ACCOUNT_DETAILS:{
        return {...state,data:action.payload}
       }
        default :{
            return state
        }
    }
}

