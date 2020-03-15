import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modal";
import { CheckOutGetProduct } from "./../redux/Actions";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "600px",
      height: "40px",
      backgroundColor: "black",
      color: "white",
      fontSize: "15px"
    }
  }
}));

function CheckOut() {
  const classes = useStyles();

  // ================================== Global state ==========================
  const dataCheckoutRedux = useSelector(state => state.CheckoutReducer.dataCheckoutRedux);
  const dataTotalHarga = useSelector(state => state.CheckoutReducer.dataTotalHarga);
  // ==================================set dispatch ==========================
  const dispatch = useDispatch();
  // ==================================component didmount ==========================
//   useEffect(() => {
//     dispatch(CheckOutGetProduct());
//   }, []);

  console.log(dataCheckoutRedux, dataTotalHarga);

  const renderCheckout = () => {
    return dataCheckoutRedux.map((val, index) => {
      return (
        <div>
          <div className="yourorder-checkout">
            <td>
              {val.namaProduk} x {val.jumlah}
            </td>
            <td style={{ marginLeft: "auto" }}>
              <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
            </td>
          </div>
          <hr />
        </div>
      );
    });
  };

  return (
    <div className="cart-page" style={{ paddingTop: "80px" }}>
      <div className="checkout-title">
        <h1>
          <center>Checkout</center>
        </h1>
      </div>
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-4 checkout-left-box">
          <h5>BILING DETAILS</h5>
          <hr />
          <div className="form-group">
            <label for="inputNamaLengkap">
              <b>
                Nama Lengkap<span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <input type="text" className="form-control" placeholder="Nama Lengkap anda" />
          </div>
          <div className="form-group">
            <label for="inputAlamatLengkap">
              <b>
                Alamat Pengiriman<span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <input type="text" className="form-control" placeholder="Alamat yang akan dituju" />
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label for="inputProvinsi">
                <b>
                  Provinsi<span style={{ color: "red" }}>*</span>
                </b>
              </label>
              <input type="text" className="form-control" placeholder="Provinsi" />
            </div>
            <div className="col-md-6">
              <label for="inputKota">
                <b>
                  Kota<span style={{ color: "red" }}>*</span>
                </b>
              </label>
              <input type="text" className="form-control" placeholder="Kota" />
            </div>
          </div>
          <div className="form-group">
            <label for="inputNomorHp">
              <b>
                Telepon/WA<span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <input type="text" className="form-control" placeholder="Nomor telepon" />
          </div>
          <div className="form-group">
            <label for="catatan">
              <b>Catatan(optional)</b>
            </label>
            <textarea className="form-control" rows="3" placeholder="catatan untuk order dan pengiriman"></textarea>
          </div>
        </div>
        <div className="col-md-4 checkout-right-box">
          <h5 style={{ marginBottom: "20px" }}>YOUR ORDER</h5>
          <div className="yourorder-checkout">
            <th>PRODUCT</th>
            <th style={{ marginLeft: "auto" }}>TOTAL</th>
          </div>
          <hr />
          {renderCheckout()}
          <div className="yourorder-checkout">
            <th>SubTotal</th>
            <th style={{ marginLeft: "auto" }}>
              <NumberFormat value={dataTotalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
            </th>
          </div>
          <div className={classes.root}>
            <Button variant="contained" >
               Selesaikan Belanja
            </Button>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
      {/* <h1 style={{paddingTop:'300px'}}><center>checkout</center></h1> */}
    </div>
  );
}
export default CheckOut;
