import { GET_PAYREQ_SUCCESS, GET_PAYREQ_ERROR, GET_PAYREQ_LOADING, GET_EACH_SUCCESS, GET_EACH_ERROR, GET_EACH_LOADING, PUT_APPROVE_SUCCESS, PUT_APPROVE_ERROR, PUT_APPROVE_LOADING } from "./types";
import { APIURL } from "./../../helper/ApiUrl";
import Axios from "axios";
import Swal from "sweetalert2";

export const GetPaymentRequest = () => {
  return (dispatch) => {
    dispatch({ type: GET_PAYREQ_LOADING });
    Axios.get(`${APIURL}product/getpaymentrequest`)
      .then((res) => {
        dispatch({ type: GET_PAYREQ_SUCCESS, payload: res.data.dataPaymentRequest });
      })
      .catch((err) => {
        dispatch({ type: GET_PAYREQ_ERROR, payload: "error get data payment request" });
      });
  };
};
export const GetEachDataPayment = () => {
  return (dispatch) => {
    dispatch({ type: GET_EACH_LOADING });
    Axios.get(`${APIURL}product/geteachdata`)
      .then((res) => {
        dispatch({ type: GET_EACH_SUCCESS, payload: res.data.dataEachProduct });
      })
      .catch((err) => {
        dispatch({ type: GET_EACH_ERROR, payload: "error get each product" });
      });
  };
};
export const ApproveTransaction = (id) => {
  return (dispatch) => {
    dispatch({ type: PUT_APPROVE_LOADING });
    Axios.put(`${APIURL}product/approvepayment/${id}`)
      .then((res) => {
        let timerInterval;
        Swal.fire({
          title: "Approving",
          html: " <b></b> ",
          timer: 2000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          },
        })
          .then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
          })
          .then((res2) => {
            dispatch(GetPaymentRequest());
            dispatch(GetEachDataPayment());
          });
      })
      .catch((err) => {});
  };
};

export const RejectTransaction = (id) => {
  return (dispatch) => {
    // dispatch({ type: PUT_APPROVE_LOADING });
    Axios.put(`${APIURL}product/rejectpayment/${id}`)
      .then((res) => {
        let timerInterval;
        Swal.fire({
          title: "Rejecting",
          html: " <b></b> ",
          timer: 2000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          },
        })
          .then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
          })
          .then((res2) => {
            dispatch(GetPaymentRequest());
            dispatch(GetEachDataPayment());
          });
      })
      .catch((err) => {});
  };
};
