import {
  EDIT_DETAILS_SUCCESS,
  EDIT_DETAILS_ERROR,
  EDIT_DETAILS_LOADING,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_ERROR,
  GET_DETAILS_LOADING,
  PASS_CHANGE_SUCCESS,
  PASS_CHANGE_ERROR,
  PASS_CHANGE_LOADING
} from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Axios from "axios";
import Swal from "sweetalert2";

//   ====================================== function edit account details ========================
export const GetUserDetails = () => {
  return dispatch => {
    var IdUserRedux = localStorage.getItem("userId");
    dispatch({ type: GET_DETAILS_LOADING });
    Axios.get(`${APIURL}auth/getuserdetais/${IdUserRedux}`)
      .then(res => {
        // console.log("masuk redux", res.data[0]);
        dispatch({ type: GET_DETAILS_SUCCESS, payload: res.data[0] });
      })
      .catch(err => {
        console.log("error get user details");
        dispatch({ type: GET_DETAILS_ERROR, payload: "error get user details" });
      });
  };
};
//   ====================================== function edit account details ========================
export const PutUserDetail = dataPostDetails => {
  return dispatch => {
    var IdUserRedux = localStorage.getItem("userId");
    dispatch({ type: EDIT_DETAILS_LOADING });
    Axios.put(`${APIURL}auth/edituserdetails/${IdUserRedux}`, { dataPostDetails }).then(res => {
      if (res.data.message == "data detail harus mengisi semuanya") {
        dispatch({ type: EDIT_DETAILS_SUCCESS, payload: res.data.message });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `OK, Account changed`,
          showConfirmButton: false,
          timer: 2500
        })
          .then(res2 => {
            // dispatch({ type: EDIT_DETAILS_SUCCESS, payload: res.data.message });
            dispatch(GetUserDetails());
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: EDIT_DETAILS_ERROR, payload: "error put user details" });
          });
      }
    });
  };
};
export const PutChangePass = dataNewPass => {
  return dispatch => {
    var IdUserRedux = localStorage.getItem("userId");
    dispatch({ type: PASS_CHANGE_LOADING });
    Axios.put(`${APIURL}auth/changepassword/${IdUserRedux}`, { dataNewPass }).then(res => {
      if (res.data.message === "password lama anda salah" || res.data.message === "confirmasi password berbeda") {
        dispatch({ type: PASS_CHANGE_SUCCESS, payload: res.data.message });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `OK, Password changed`,
          showConfirmButton: false,
          timer: 2500
        })
          .then(res => {
            // dispatch({ type: PASS_CHANGE_SUCCESS, payload: res.data.message });
            dispatch(GetUserDetails());
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: PASS_CHANGE_ERROR, payload: "error put change password" });
          });
      }
    });
  };
};
