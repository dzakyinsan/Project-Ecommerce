import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modalPaymentReq";
// import { PostCheckoutProduct, CheckOutGetProduct } from "./../redux/Actions";
// import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";

function OrderComplete() {
  const [dataOrderComplete, setdataOrderComplete] = useState([]);
  const [ModalDetail, setModalDetail] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const toggleModal = () => setmodalOpen(!modalOpen);

  const openToggleModal = index => {
    setModalDetail(dataOrderComplete[index]);
    setmodalOpen(true);
  };

  useEffect(() => {
    var IdUserRedux = localStorage.getItem("userId");
    Axios.get(`${APIURL}product/getordercomplete/${IdUserRedux}`)
      .then(res => {
        setdataOrderComplete(res.data);
      })
      .catch(err => {
        console.log("error get data");
      });
  }, []);

  const renderData = () => {
    return dataOrderComplete.map((val, index) => {
      console.log("dataOrderComplete", dataOrderComplete);
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
      <Modal toggle={toggleModal} modal={modalOpen} style={{ marginTop: "200px" }}>
        <div>
          <div>
            <img src={APIURLimage + ModalDetail.gambarBukti} alt="1" width="470px" height="400px" />
          </div>
        </div>
      </Modal>
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="orderComplete-title">
            <h3>
              <center>Order Complete</center>
            </h3>
          </div>

          <div className="row">
            <div className="col-md-4 orderComplete-option">
              <Button variant="contained">waiting admin approval </Button>
            </div>
            <div className="col-md-4">
              <div className="col-md-4 orderComplete-option">
                <Button variant="contained">Complete</Button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="col-md-4 orderComplete-option">
                <Button variant="contained">History</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
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
    </div>
  );
}
export default OrderComplete;
