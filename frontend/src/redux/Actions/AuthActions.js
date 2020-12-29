import axios from "axios";
import { USER_REGIS_SUCCESS, USER_LOGIN_SUCCESS, AUTH_SYSTEM_REGIS_ERROR, AUTH_SYSTEM_LOGIN_ERROR, AUTH_LOADING, USER_LOGOUT } from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Swal from "sweetalert2";

export const onUserRegister = (username, email, password, confirmpass) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    if (username === "" || email === "" || password === "" || confirmpass === "") {
      dispatch({ type: AUTH_SYSTEM_REGIS_ERROR, payload: "form regis wajib diisi" });
    } else if (password !== confirmpass) {
      dispatch({ type: AUTH_SYSTEM_REGIS_ERROR, payload: "confirm pass tidak sesuai" });
    } else {
      axios
        .post(`${APIURL}auth/registerver`, {
          username,
          email,
          password,
        })
        .then((res) => {
          if (res.data.status === "error") {
            dispatch({ type: AUTH_SYSTEM_REGIS_ERROR, payload: res.data.message });
          } else if (res.data.status === "success") {
            // localStorage.setItem('username',username)
            dispatch({ type: USER_REGIS_SUCCESS });
          }
        })
        .catch((err) => {
          dispatch({ type: AUTH_SYSTEM_REGIS_ERROR, payload: "System Error" });
        });
    }
  };
};
export const onUserlogin = (usernameLogin, passwordLogin) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING });

    if (usernameLogin === "" || passwordLogin === "") {
      dispatch({ type: AUTH_SYSTEM_LOGIN_ERROR, payload: "form login wajib diisi!" });
    } else {
      axios
        .get(`${APIURL}auth/login`, {
          params: {
            username: usernameLogin,
            password: passwordLogin,
          },
        })
        .then((res) => {
          if (res.data.status === "notmatch") {
            dispatch({ type: AUTH_SYSTEM_LOGIN_ERROR, payload: res.data.error });
          } else if (res.data.status === "success") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.id);
            dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Signed in successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          dispatch({ type: AUTH_SYSTEM_LOGIN_ERROR, payload: "System Error" });
        });
    }
  };
};

export const onUserloginRepeat = (resdata) => {
  return (dispatch) => {
    localStorage.setItem("token", resdata.token);
    localStorage.setItem("userId", resdata.id);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: resdata });
  };
};

export const onUserlogOut = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: USER_LOGOUT });
  };
};
