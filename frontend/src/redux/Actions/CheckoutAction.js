import {GET_CHECKOUT_SUCCESS,GET_CHECKOUT_ERROR,GET_CHECKOUT_LOADING} from "./types"
import {APIURL} from './../../helper/ApiUrl'
import Axios from 'axios'

export const CheckOutGetProduct =()=>{
    return dispatch=>{
        var IdUserRedux=localStorage.getItem('userId')
        dispatch({type:GET_CHECKOUT_LOADING})
        Axios.get(`${APIURL}product/getCheckout/${IdUserRedux}`)
        .then(res=>{
            var dataTotalHarga = 0;
        res.data.dataCheckout.forEach(val => {
          dataTotalHarga += val.totalHarga;

          dispatch({ type: GET_CHECKOUT_SUCCESS, payload: { dataCheckout: res.data.dataCheckout, dataTotalHarga } });

        });
        })
        .catch(err=>{
            console.log(err)
            dispatch({type:GET_CHECKOUT_ERROR})
        })

    }
}