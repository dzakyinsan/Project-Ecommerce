import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modal";
import { DeleteCartAction, CartGetProduct, CheckOutGetProduct } from "./../redux/Actions";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

function CartPage() {
  // ================================== Global state ==========================
  const dataCartRedux = useSelector(state => state.CartReducer.dataCartRedux);
  const IdUserRedux = useSelector(state => state.auth.id);
  const dataTotalHarga = useSelector(state => state.CartReducer.dataTotalHarga);

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
  const OpenToggleDelete = index => {
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
        status: "checkout"
      };
      var id = data.id;
      console.log("data", data);

      Axios.put(`${APIURL}product/checkoutcart/${id}`, { data })
        .then(res => {
          dispatch(CartGetProduct());
          dispatch(CheckOutGetProduct());

          //  <Redirect to={"/checkout"} />;
        })
        .catch(err => {
          console.log("error axios checkout click ");
        });
    }
    setRedirectcheckout(true);
  };

  // console.log('Redirectcheckout',Redirectcheckout)

  const renderCart = () => {
    if (dataCartRedux.length === 0) {
      return (
        <tr>
          <td>
            <h1> tidak ada cart yang di tambahkan</h1>
          </td>
        </tr>
      );
    }
    return dataCartRedux.map((val, index) => {
      console.log("dataCartRedux", dataCartRedux);
      // console.log('dataTotalHarga',dataTotalHarga);

      return (
        <TableRow key={val.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <img src={APIURLimage + val.gambar} alt={index} width="120px" height="120px" />
          </TableCell>
          <TableCell>{val.namaProduk}</TableCell>
          <TableCell>
            <NumberFormat value={val.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
          </TableCell>
          <TableCell>{val.jumlah}</TableCell>
          <TableCell>
            <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
          </TableCell>
          <TableCell>
            <button className="btn-delete-cart" onClick={() => OpenToggleDelete(val.id)}>
              <DeleteIcon />
            </button>
          </TableCell>
        </TableRow>
      );
    });
  };

  if (Redirectcheckout === true) {
    return <Redirect to={"/checkout"} />;
  }
  return (
    <div className="cart-page" style={{ paddingTop: "80px" }}>
      <div className="checkout-title">
        <h3>
          <center>Cart</center>
        </h3>
      </div>
      <button className="btn btn-success" onClick={onCheckOutClick}>
        Checkout
      </button>
      <button className="btn btn-success">
        <NumberFormat value={dataTotalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
      </button>
      {/* ================= modal delete ==================== */}
      <Modal title={`delete cart`} toggle={OpenToggleDelete} modal={modalDelete} actionfunc={Deletedata} btnTitle="delete"></Modal>
      <Table hover>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>product</TableCell>
            <TableCell></TableCell>
            <TableCell>Harga</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderCart()}</TableBody>
      </Table>
    </div>
  );
}
export default CartPage;
