import {
    GET_HOME_ERROR,
    GET_HOME_LOADING,
    GET_FOOTBALL_SUCCESS,
    GET_BASKETBALL_SUCCESS,
    GET_RUNNING_SUCCESS
} from "./types";
  import { APIURL } from "./../../helper/ApiUrl";
  import Axios from "axios";
  
  // =============================== function get home =====================
  export const GetHotItems =()=>{
      return dispatch=>{
        dispatch({ type: GET_HOME_LOADING });
        Axios.get(`${APIURL}product/gethotitems`)
        .then(res=>{
            dispatch({type:GET_FOOTBALL_SUCCESS,payload:res.data.football})
            dispatch({type:GET_BASKETBALL_SUCCESS,payload:res.data.basketball})
            dispatch({type:GET_RUNNING_SUCCESS,payload:res.data.running})
        })
        .catch(err=>{
            dispatch({type:GET_HOME_ERROR})
        })
      }
  }
