import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modal";
import { DeleteCartAction, CartGetProduct, CheckOutGetProduct } from "./../redux/Actions";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function CartPage() {
  // ================================== Global state ==========================
  const dataCartRedux = useSelector((state) => state.CartReducer.dataCartRedux);
  const IdUserRedux = useSelector((state) => state.auth.id);
  const dataTotalHarga = useSelector((state) => state.CartReducer.dataTotalHarga);

  // ================================== Local state ==========================
  const [modalDelete, setmodalDelete] = useState(false);
  const [idDelete, setidDelete] = useState(0);
  const [Redirectcheckout, setRedirectcheckout] = useState(false);

  // ==================================set dispatch ==========================
  const dispatch = useDispatch();

  // ==================================component didmount ==========================
  // useEffect(() => {
  //   dispatch(CartGetProduct(IdUserRedux));
  // }, []);

  // ============================================= delete ==============================
  const OpenToggleDelete = (index) => {
    setmodalDelete(!modalDelete);
    setidDelete(index);
  };
  const Deletedata = () => {
    dispatch(DeleteCartAction(idDelete, IdUserRedux));
    setmodalDelete(!modalDelete);
  };
  // ==============================================================================================
  const onCheckOutClick = () => {
    for (var i = 0; i < dataCartRedux.length; i++) {
      var data = {
        id: dataCartRedux[i].id,
        userId: dataCartRedux[i].userId,
        productId: dataCartRedux[i].productId,
        size: dataCartRedux[i].size,
        jumlah: dataCartRedux[i].jumlah,
        harga: dataCartRedux[i].harga,
        totalHarga: dataCartRedux[i].totalHarga,
        status: "checkout",
      };
      var id = data.id;
      console.log("data", data);

      Axios.put(`${APIURL}product/checkoutcart/${id}`, { data })
        .then((res) => {
          dispatch(CartGetProduct());
          dispatch(CheckOutGetProduct());

          //  <Redirect to={"/checkout"} />;
        })
        .catch((err) => {
          console.log("error axios checkout click ");
        });
    }
    setRedirectcheckout(true);
  };

  // console.log('Redirectcheckout',Redirectcheckout)

  const renderCart = () => {
    return dataCartRedux.map((val, index) => {
      return (
        // <div className="cart-page" style={{ paddingTop: "80px" }}>

        <div className="container-1-paymentReq-cart">
          {/* ================= modal delete ==================== */}
          <Modal title={`delete cart`} toggle={OpenToggleDelete} modal={modalDelete} actionfunc={Deletedata} btnTitle="delete"></Modal>
          <div className="container-2-paymentReq">
            <div style={{ display: "flex" }}>
              <div className="PR-kiri ">
                <img src={APIURLimage + val.gambar} alt="1" width="auto" height="120px" />
                <div className='cart-specs' >
                  <h6> {val.namaProduk}</h6>
                  <p>size : &nbsp;{val.size} </p>
                  {/* <h6>quntity :{val.jumlah}</h6> */}
                </div>
              </div>
              <div className="PR-kanan-cart " style={{ marginLeft: "140px",minWidth:'185px' }}>
                <h6>
                  <NumberFormat value={val.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
                </h6>
              </div>
              <div className="PR-kanan-cart " style={{width:'127px'}}>
                <h6>X&nbsp;{val.jumlah}</h6>
              </div>

              <div className="PR-kanan-cart" style={{ color: "#c48236",width:'192px'}}>
                <h6>
                  <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
                </h6>
              </div>
              <div style={{ margin: "50px" }}>
                <button className="btn-delete-cart" onClick={() => OpenToggleDelete(val.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        // </div>
      );
    });
  };

  if (Redirectcheckout === true) {
    return <Redirect to={"/checkout"} />;
  }
  if (dataCartRedux === undefined || dataCartRedux.length === 0) {
    return (
      <div className="checkout-page" style={{ paddingTop: "100px", textAlign: "center" }}>
        <div className="checkout-title">
          <h3>
            <center>YOUR CART</center>
          </h3>
        </div>
        <img src="https://store.topekazoo.org/resources/images/common/empty-cart.png" />
        <h1 style={{ marginTop: "50px", fontSize: "30px" }}>cart is empty</h1>
        <div className="checkorder-button">
          <Link to={"/waitingAdminApproval"}>
            <Button variant="contained">Check you order</Button>
          </Link>
          <Link to={"/checkout"}>
            <Button variant="contained">Go to Checkout</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-page" style={{ paddingTop: "80px" }}>
      <div className="checkout-title">
          <h3>
            <center>YOUR CART</center>
          </h3>
        </div>
      <div className="container-all-cart">
        <div className="a">
          <h6>Produk</h6>
          <h6 style={{ marginLeft: "530px" }}>Harga Satuan</h6>
          <h6 style={{ marginLeft: "130px" }}>Jumlah</h6>
          <h6 style={{ marginLeft: "130px" }}>Total Harga</h6>
          <h6 style={{ marginLeft: "140px" }}>Aksi</h6>
        </div>
      </div>
      {renderCart()}
      <div className="SubTotal-container-cart">
        <div className='isi-subtotal' >
          <h6>SubTotal untuk {dataCartRedux.length} Produk :</h6>
          <h3>
            <NumberFormat value={dataTotalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
          </h3>
        </div>
          <div className="checkorder-cart-button">
            <Button variant="contained" onClick={onCheckOutClick}>CHECKOUT</Button>
          </div>
      </div>
    </div>
  );
}
export default CartPage;
