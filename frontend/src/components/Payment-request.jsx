import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
// import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modalPaymentReq";
import Modal2 from "./../components/modal";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ApproveTransaction } from "./../redux/Actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100px",
      height: "50px",
      backgroundColor: "#c48236",
      color: "white",
      fontSize: "15px"
    }
  }
}));

function PaymentRequest() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // ========================================= Global state =========================
  const dataPaymentReq = useSelector(state => state.PaymentReqReducer.dataPaymentRequest);
  const dataEachProductRedux = useSelector(state => state.PaymentReqReducer.dataEachProductRedux);
  console.log("dataPaymentReq", dataPaymentReq);
  console.log("dataEachProductRedux", dataEachProductRedux);
  // =========================================== state ================================
  const [ModalDetail, setModalDetail] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const toggleModal = () => setmodalOpen(!modalOpen);
  const [modalOpen2, setmodalOpen2] = useState(false);
  const toggleModal2 = () => setmodalOpen2(!modalOpen2);
  const [idDataApprove, setidDataApprove] = useState(0);

  // ======================================== useeffect =============================
  // get data nya di page adminPage

  const openToggleModal = index => {
    setModalDetail(dataPaymentReq[index]);
    setmodalOpen(true);
  };

  const openToggleApprove = index => {
    setmodalOpen2(true);
    setidDataApprove(index);
  };

  const ApproveData = () => {
    dispatch(ApproveTransaction(idDataApprove));
    setmodalOpen2(false);
  };

  if (dataPaymentReq.length === 0) {
    return (
      <div>
        <h1>there's no payment request from user</h1>
      </div>
    );
  }
  return dataPaymentReq.map((val, index) => {
    return (
      <div className="container-1-paymentReq">
        <Modal toggle={toggleModal} modal={modalOpen} style={{ marginTop: "200px" }}>
          <div className="row t">
            <div className="col-md-7">
              <img src={APIURLimage + ModalDetail.gambarBukti} alt="1" width="280px" height="400px" />
            </div>
            <div className="col-md-5">
              <h6>nama pengirim : {ModalDetail.username} </h6>
              <h6>
                alamat tujuan: {ModalDetail.alamat},{ModalDetail.kota}, {ModalDetail.provinsi}
              </h6>
              <h6> shipping : {ModalDetail.shipping}</h6>
              <h6> payment via: {ModalDetail.payment}</h6>
              <h6> telepon : {ModalDetail.telepon}</h6>
              <h6>
                {" "}
                total harga :
                <NumberFormat value={ModalDetail.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp. "} />
              </h6>
              <h6>catatan : {ModalDetail.catatan}</h6>
            </div>
          </div>
        </Modal>
        {/* ================================================= modal approve =========================================== */}
        <Modal2 title={`is the data correct?`} toggle={toggleModal2} modal={modalOpen2} actionfunc={ApproveData} btnTitle="Approve"></Modal2>

        <div className="container-2-paymentReq">
          <div>
            <h5>
              <AccountBoxIcon fontSize="large" className="icon-username" /> Request username : {val.username}
            </h5>
          </div>
          <hr />
          {dataEachProductRedux.map((val2, index) => {
            if (val2.idTransactionAddress === val.id) {
              return (
                <div className="row">
                  <div className="PR-kiri col-md-8">
                    <img src={APIURLimage + val2.gambar} alt="1" width="auto" height="150px" />
                    <div style={{ marginLeft: "60px", marginTop: "30px" }}>
                      <h5> {val2.namaProduk}</h5>
                      <h6>size : &nbsp;{val2.size} </h6>
                      <h6>quntity :{val2.jumlah}</h6>
                      <h6>pay at :{val2.updatedAt}</h6>
                    </div>
                  </div>
                  <div className="PR-kanan col-md-3">
                    <h5>
                      <NumberFormat value={val2.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
                    </h5>
                  </div>
                </div>
              );
            }
          })}
          <hr />
          <div className="row">
            <div className="PR-kiri col-md-8" />
            <div className="PR-kanan-bawah col-md-3">
              <h5>Total Pesanan :</h5>
              <h4>
                <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="PR-kiri col-md-8" />
            <div className="PR-kanan-bawah col-md-3">
              <div className={classes.root}>
                <Button onClick={() => openToggleModal(index)}>detail</Button>
                <Button>reject</Button>
                <Button onClick={() => openToggleApprove(val.id)}>approve</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  //   return (
  //     <div className="container-1-paymentReq">
  //       <div className="container-2-paymentReq">
  //         <div>
  //           <h4>
  //             <AccountBoxIcon fontSize="large" className="icon-username" /> Request username : Asyiap
  //           </h4>
  //         </div>
  //         <hr />
  //         <div className="row">
  //           <div className="PR-kiri col-md-8" >
  //             <img src="https://ncrsport.com/img/storage/large/AO3266-060-1.jpg" alt="1" width="100px" height="100px" />
  //             <div style={{ margin: "10px" }}>
  //               <h5> Nama Produk</h5>
  //               <h6>size : </h6>
  //               <h6>quntity :</h6>
  //               <h6>pay at :</h6>
  //             </div>
  //           </div>
  //           <div className="PR-kanan col-md-3">
  //             <h5>
  //               <NumberFormat value="10000" displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
  //             </h5>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="PR-kiri col-md-6" />
  //           <div className="PR-kanan-bawah col-md-5">
  //             <h6>Total Pesanan :</h6>
  //             <h4>
  //               <NumberFormat value="20000" displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
  //             </h4>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="PR-kiri col-md-6" />
  //           <div className="PR-kanan-bawah col-md-5">
  //             <button>detail</button>
  //             <button>approve</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
export default PaymentRequest;
