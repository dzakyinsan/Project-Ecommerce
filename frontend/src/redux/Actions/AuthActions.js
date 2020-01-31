import axios from "axios";
import { USER_LOGIN_SUCCESS, AUTH_SYSTEM_ERROR, AUTH_LOADING, USER_LOGOUT } from "./types";
import { APIURL } from "./../../helper/ApiUrl";

export const onUserRegister = (username, email, password) => {
  console.log("masuk username", username);
  return dispatch => {
    dispatch({ type: AUTH_LOADING });
    if (username === "" || email === "" || password === "") {
      dispatch({ type: AUTH_SYSTEM_ERROR, payload: { error: "form wajib diisi" } });
    } else {
        console.log('masuk axios post')
      axios
        .post(`${APIURL}auth/registerver`, {
          username,
          email,
          password
        })
        .then(res => {
          if (res.data.status === "error") {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message });
          } else if (res.data.status === "success") {
            // localStorage.setItem('username',username)
            dispatch({ type: USER_LOGIN_SUCCESS });
          }
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: AUTH_SYSTEM_ERROR, payload: { error: "System Error" } });
        });
    }
  };
};
