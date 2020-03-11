 import{
    GET_CART_SUCCESS,
    GET_CART_ERROR,
    GET_CART_LOADING,
    CART_DELETE_LOADING,
    CART_DELETE_ERROR
} from "./types"
import { APIURL } from "./../../helper/ApiUrl";
import Axios from "axios";

export const CartGetProduct =(IdUserRedux)=>{
    return dispatch =>{
        dispatch({type:GET_CART_LOADING});
        Axios.get(`${APIURL}product/getCart/${IdUserRedux}`)
        .then(res=>{
            console.log('masuk axios get ')
            dispatch({type:GET_CART_SUCCESS,payload:res.data.dataCart})
        })
        .catch(err=>{
            console.log('error axios get',err)
            dispatch({type:GET_CART_ERROR})
        })
    }
}
export const DeleteCartAction =(idDelete,IdUserRedux)=>{
    return dispatch=>{
        dispatch({ type: CART_DELETE_LOADING });
        Axios.delete(`${APIURL}product/deletecart/${idDelete}/${IdUserRedux}`)
        .then(res=>{
            dispatch({type:GET_CART_SUCCESS,payload:res.data.dataCart})
        })
        .catch(err=>{
            dispatch({type:CART_DELETE_ERROR})
        })
    }
}

