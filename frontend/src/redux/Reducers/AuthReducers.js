import {
    AUTH_LOADING,
    AUTH_SYSTEM_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from './../Actions/types'

const INITIAL_STATE={
    username:'',
    email:'',
    status:'',
    error:'',
    token:'',
    register:false,
    authchecked:false,
    loading:false
}
export default(state=INITIAL_STATE,action)=>{
    switch (action.type){
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE,register:true}
        case AUTH_SYSTEM_ERROR :
            return{...INITIAL_STATE, error: action.payload,authchecked:true}
        case AUTH_LOADING:
            return {...state,error:'',loading:true}
        case USER_LOGOUT:
            return {...INITIAL_STATE,authchecked:true}
        default:
            return state  
    }    
}