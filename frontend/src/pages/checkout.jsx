import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modal";
import { PostCheckoutProduct, CheckOutGetProduct } from "./../redux/Actions";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "max-content",
      height: "40px",
      backgroundColor: "black",
      color: "white",
      fontSize: "15px",
      marginTop: "30px"
    }
  }
}));

function CheckOut() {
  const classes = useStyles();

  // ================================== Global state ==========================
  const dataCheckoutRedux = useSelector(state => state.CheckoutReducer.dataCheckoutRedux);
  const dataTotalHarga = useSelector(state => state.CheckoutReducer.dataTotalHarga);
  const messageRedux = useSelector(state => state.CheckoutReducer.message);
  const checkoutValid = useSelector(state => state.CheckoutReducer.checkoutValid);
  // ================================== Local state ==========================
  const [PostCheckout, setPostCheckout] = useState({});
  const [goToCompletePage,setgoToCompletePage]=useState(false)
  // ==================================set dispatch ==========================
  const dispatch = useDispatch();
  // ==================================component didmount ==========================
  useEffect(() => {
    // console.log(IdUserRedux);
    var userid = localStorage.getItem("userId");
    setPostCheckout({ ...PostCheckout, userId: userid, term: false });
    dispatch(CheckOutGetProduct());
  }, []);

  // console.log(dataCheckoutRedux, dataTotalHarga);

  const onChangeCheckout = e => {
    const { name, value } = e.target;
    setPostCheckout({ ...PostCheckout, [name]: value });
    console.log("PostCheckout", PostCheckout);
  };

  const FinishCheckout = () => {
    dispatch(PostCheckoutProduct(PostCheckout, dataCheckoutRedux));
    setgoToCompletePage(true)
    dispatch(CheckOutGetProduct())
    // if (messageRedux === "berhasil post") {
    //   dispatch(PutCheckoutProduct(dataCheckoutRedux));
    // }
    // console.log("messageRedux", messageRedux);
  };

  console.log("messageRedux luar", messageRedux);

  const messageErrorNotif = () => {
    if (messageRedux) {
      return <h4 style={{ color: "red" }}> {messageRedux}</h4>;
    }
  };
  console.log("dataCheckoutRedux", dataCheckoutRedux);

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
  console.log("checkoutValid", checkoutValid);
  console.log("dataCheckoutRedux.length", dataCheckoutRedux.length);

  if (dataCheckoutRedux.length === 0) {
    return (
      <div style={{ marginTop: "100px" }}>
        <h1>tidak ada barang di checkout</h1>
      </div>
    );
  }
  if (goToCompletePage) {
    return <Redirect to={"/ordercomplete"} />;
  }

  // return (
  //   <div style={{ marginTop: "100px" }}>
  //     <h1>tidak ada barang di checkout</h1>
  //   </div>
  // );
  // else if(dataCheckoutRedux.length === 0 && messageRedux==="berhasil post dan update"){
  //   return <Redirect to={"/ordercomplete"} />;

  // }

  return (
    <div className="cart-page" style={{ paddingTop: "80px" }}>
      <div className="checkout-title">
        <h3>
          <center>Checkout</center>
        </h3>
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
            <input type="text" name="nama" className="form-control" placeholder="Nama Pengirim" onChange={onChangeCheckout} />
          </div>
          <div className="form-group">
            <label for="inputAlamatLengkap">
              <b>
                Alamat Pengiriman<span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <input type="text" name="alamat" className="form-control" placeholder="Alamat yang akan dituju" onChange={onChangeCheckout} />
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label for="inputProvinsi">
                <b>
                  Provinsi<span style={{ color: "red" }}>*</span>
                </b>
              </label>
              <input type="text" name="provinsi" className="form-control" placeholder="Provinsi" onChange={onChangeCheckout} />
            </div>
            <div className="col-md-6">
              <label for="inputKota">
                <b>
                  Kota<span style={{ color: "red" }}>*</span>
                </b>
              </label>
              <input type="text" name="kota" className="form-control" placeholder="Kota" onChange={onChangeCheckout} />
            </div>
          </div>
          <div className="form-group">
            <label for="inputNomorHp">
              <b>
                Telepon/WA<span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <input type="number" name="telepon" className="form-control" placeholder="Nomor telepon" onChange={onChangeCheckout} />
          </div>
          <div className="form-group">
            <label for="catatan">
              <b>Catatan(optional)</b>
            </label>
            <textarea className="form-control" name="catatan" rows="3" placeholder="catatan untuk order dan pengiriman" onChange={onChangeCheckout}></textarea>
          </div>
          <div className="mt-5">{messageErrorNotif()}</div>
        </div>
        <div className="col-md-4 checkout-right-box">
          <div className="checkout-right-box-dalam">
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
            <hr />
            <div className="shipping">
              <th>Shipping</th>
            </div>
            <div className="shipping">
              <input type="radio" name="shipping" value="Gojek" onChange={onChangeCheckout} /> Gojek
            </div>
            <div className="shipping">
              <input type="radio" name="shipping" value="Pengambilan Pesanan Di Toko" onChange={onChangeCheckout} /> Pengambilan Pesanan Di Toko
            </div>
            <div className="shipping">
              <input type="radio" name="shipping" value="JNE / JNT / SICEPAT" onChange={onChangeCheckout} /> JNE / JNT / SICEPAT
            </div>
            <hr />
            <div className="shipping">
              <th>payment</th>
            </div>
            <input type="radio" className="shipping" name="payment" value="Bank Mandiri Bni" onChange={onChangeCheckout} /> <b>Bank Mandiri / Bank BNI</b>
            <div className="shipping">
              <img src="https://upload.wikimedia.org/wikipedia/id/thumb/f/fa/Bank_Mandiri_logo.svg/1280px-Bank_Mandiri_logo.svg.png" width="300px" height="60px" />
              <img src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png" width="300px" height="50px" />
            </div>
            <hr />
            <input type="radio" className="shipping" name="payment" value="Convenience Store" onChange={onChangeCheckout} />
            <b> Convenience Store</b>
            <div className="shipping">
              <img src="https://www.reclays.id/wp-content/plugins/nicepay_cvs/alfa-indo.png" width="500px" height="80px" />
            </div>
            <hr />
            <input type="checkbox" /> <b>I have read and agree to the website terms and conditions *</b>
            <div className={classes.root}>
              <Button variant="contained" onClick={FinishCheckout}>
                Selesaikan Belanja
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
      {/* <h1 style={{paddingTop:'300px'}}><center>checkout</center></h1> */}
    </div>
  );
}
export default CheckOut;
