import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";
import { APIURLimage } from "./../helper/ApiUrl";
// import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modalPaymentReq";
import Modal2 from "./../components/modal";
import NumberFormat from "react-number-format";
// import { Redirect } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ApproveTransaction, RejectTransaction } from "./../redux/Actions";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80px",
      height: "40px",
      backgroundColor: "#c48236",
      color: "white",
      fontSize: "12px"
    }
  }
}));

function PaymentRequest() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // ========================================= Global state =========================
  const dataPaymentReq = useSelector(state => state.PaymentReqReducer.dataPaymentRequest);
  const dataEachProductRedux = useSelector(state => state.PaymentReqReducer.dataEachProductRedux);
  const loading = useSelector(state => state.PaymentReqReducer.loading);

  // =========================================== state ================================
  const [ModalDetail, setModalDetail] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const toggleModal = () => setmodalOpen(!modalOpen);
  // ======== modal approve ===============
  const [modalOpen2, setmodalOpen2] = useState(false);
  const toggleModal2 = () => setmodalOpen2(!modalOpen2);
  const [idDataApprove, setidDataApprove] = useState(0);
  // =========== modal reject ===============
  const [modalOpen3, setmodalOpen3] = useState(false);
  const toggleModal3 = () => setmodalOpen3(!modalOpen3);
  const [idDataReject, setidDataReject] = useState(0);

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
  const openToggleReject = index => {
    setmodalOpen3(true);
    setidDataReject(index);
  };

  const ApproveData = () => {
    dispatch(ApproveTransaction(idDataApprove));
    setmodalOpen2(false);
  };
  const RejectData = () => {
    dispatch(RejectTransaction(idDataReject));
    setmodalOpen3(false);
  };
  if (loading) {
    return (
      <div>
        <div style={{ minHeight: "1000px", paddingTop: "300px", paddingLeft: "300px" }}>
        <h1 style={{ fontSize: "100px", color: "#c48236" }}>FOOTBOOTS2020</h1>
        <h1 style={{ fontSize: "80px", marginLeft: "250px" }}>loading...</h1>
      </div>
      </div>
    );
  }
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
          <div className="row ">
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
        {/* ================================================= modal reject =========================================== */}
        <Modal2 title={`Reject data?`} toggle={toggleModal3} modal={modalOpen3} actionfunc={RejectData} btnTitle="Reject"></Modal2>

        <div className="container-2-paymentReq">
          <div className='nama-usernya'>          
              <i className="far fa-user-circle" style={{fontSize:'20px'}}></i>
              &nbsp;
               Request username : {val.username}
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
              <h6>Total Pesanan :</h6>
              <h5>
                <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="PR-kiri col-md-8" />
            <div className="PR-kanan-bawah col-md-3">
              <div className={classes.root}>
                <Button onClick={() => openToggleModal(index)}>detail</Button>
                <Button onClick={() => openToggleReject(val.id)}>reject</Button>
                <Button onClick={() => openToggleApprove(val.id)}>approve</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
export default PaymentRequest;
