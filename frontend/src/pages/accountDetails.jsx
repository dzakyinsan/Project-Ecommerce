import React, { useEffect, useState } from "react";
import Axios from "axios";
import { APIURL, APIURLimage } from "../helper/ApiUrl";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "../components/modalPaymentReq";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderComplete() {
  // ============================ GLOBAL STATE =============================
  const username = useSelector(state => state.auth.username);
  const idUser = useSelector(state => state.auth.id);

  const [dataWaitingAdmin, setdataWaitingAdmin] = useState([]);
  const [ModalDetail, setModalDetail] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const toggleModal = () => setmodalOpen(!modalOpen);

  const openToggleModal = index => {
    setModalDetail(dataWaitingAdmin[index]);
    setmodalOpen(true);
  };

  useEffect(() => {}, []);

  return (
    <div className="cart-page" style={{ paddingTop: "80px" }}>
      <div className="row">
        <div className="col-md-3">
          <div style={{ padding: "10px", marginLeft: "100px", marginRight: "50px" }}>
            <div style={{ display: "flex" }}>
              <span style={{ fontSize: "80px", marginLeft: "10px", color: "grey" }}>
                <i className="fas fa-user-circle"></i>
              </span>
              <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                <h2>{username}</h2>
                <h6 style={{ color: "grey" }}> #FTS{idUser}</h6>
              </div>
            </div>
            <hr />
            <div className="dashboard">DASHBOARD</div>
            <hr />
            <div className="title-account-detail">
              <Link to={"/accountDetails"} style={{ color: "#c48236" }}>
                <div>ACCOUNT DETAILS</div>
              </Link>
              <hr />
              <Link to={"/"} style={{ color: "#b7b7b7" }}>
                <div>ADDRESS</div>
              </Link>

              <hr />
              <Link to={"/waitingAdminApproval"} style={{ color: "#b7b7b7" }}>
                <div>WAITING ADMIN APPROVAL</div>
              </Link>
              <hr />
              <Link to={"/completePurchased"} style={{ color: "#b7b7b7" }}>
                <div>COMPLETE TRANSACTION</div>
              </Link>
              <hr />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="orderComplete-title">
            <h3>
              <center>Your Account</center>
            </h3>
            <h6>
              <center>Account Details</center>
            </h6>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
}
export default OrderComplete;
