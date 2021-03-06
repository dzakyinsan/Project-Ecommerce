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

  useEffect(() => {
    var IdUserRedux = localStorage.getItem("userId");
    Axios.get(`${APIURL}product/getwaitingapproval/${IdUserRedux}`)
      .then(res => {
        setdataWaitingAdmin(res.data);
      })
      .catch(err => {
      });
  }, []);

  const renderData = () => {
    return dataWaitingAdmin.map((val, index) => {
      return (
        <TableRow key={val.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.nama}</TableCell>
          <TableCell>
            {val.alamat},{val.kota},{val.provinsi}
          </TableCell>
          <TableCell>{val.status}</TableCell>
          <TableCell>{val.tanggal}</TableCell>
          <TableCell style={{ fontWeight: "bold" }}>
            <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
          </TableCell>
          <TableCell>
            <button className="btn-delete-cart" onClick={() => openToggleModal(index)}>
              View
            </button>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="cart-page" style={{ paddingTop: "80px" }}>
      <div className="row">
        <div className="col-md-3">
          <div className="left-box-apaya-bingung">
            <div style={{ display: "flex" }}>
              <span style={{ fontSize: "50px", marginLeft: "10px", color: "grey" }}>
                <i className="fas fa-user-circle"></i>
              </span>
              <div style={{ marginTop: "13px", marginLeft: "20px" }}>
                <h4>{username}</h4>
                <h6 style={{ color: "grey" }}> #FTS{idUser}</h6>
              </div>
            </div>
            <div className="dashboard">DASHBOARD</div>
            <hr />
            <div className="title-account-detail">
              <Link to={"/accountDetails"} style={{ color: "#b7b7b7" }}>
                <div>ACCOUNT DETAILS</div>
              </Link>
              <hr />
              <Link to={"/waitingAdminApproval"} style={{ color: "#c48236" }}>
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
            <h4>
              <center>Your Account</center>
            </h4>
            <h6>
              <center>Waiting Admin Approval</center>
            </h6>
          </div>
          <div className="cart-page" style={{ paddingTop: "25px" }}>
            <Modal toggle={toggleModal} modal={modalOpen} style={{ marginTop: "200px" }}>
              <div>
                <div>
                  <img src={APIURLimage + ModalDetail.gambarBukti} alt="1" width="470px" height="400px" />
                </div>
              </div>
            </Modal>
            {dataWaitingAdmin.length === 0 ? (
              <div className="checkout-page" style={{ paddingTop: "100px", textAlign: "center" }}>
                <h1 style={{ fontSize: "50px" }}>You're not buying anything yet</h1>
                <div className="checkorder-button-user">
                  <Link to={"/catalogs3"}>
                    <Button variant="contained">Buy something </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <Table hover>
                <TableHead>
                  <TableRow>
                    <TableCell>NO</TableCell>
                    <TableCell>NAMA PEMESAN</TableCell>
                    <TableCell>ALAMAT</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>TANGGAL</TableCell>
                    <TableCell>TOTAL </TableCell>
                    <TableCell>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderData()}</TableBody>
              </Table>
            )}
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
}
export default OrderComplete;
