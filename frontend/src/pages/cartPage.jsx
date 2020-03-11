import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from './../components/modal'
import {DeleteCartAction,CartGetProduct} from './../redux/Actions'

function CartPage() {
  // ================================== Global state ==========================
  const dataCartRedux = useSelector(state => state.CartReducer.dataCartRedux);
  const IdUserRedux = useSelector(state=>state.auth.id)
  // ================================== Local state ==========================
  const [modalDelete,setmodalDelete]=useState(false)
  const [idDelete,setidDelete]=useState(0)
  // ==================================set dispatch ==========================
  const dispatch = useDispatch();

  // ==================================component didmount ==========================
  // useEffect(() => {
  //   dispatch(CartGetProduct(IdUserRedux));
  // }, []);

  const OpenToggleDelete= index=>{
    setmodalDelete(!modalDelete)
    setidDelete(index)
  }
  const Deletedata=()=>{
    dispatch(DeleteCartAction(idDelete,IdUserRedux))
  }

  const renderCart = () => {
    return dataCartRedux.map((val, index) => {
      console.log('dataCartRedux',dataCartRedux)

      return (
        <TableRow key={val.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <img src={APIURLimage + val.gambar} alt={index} width="120px" height="120px" />
          </TableCell>
          <TableCell>{val.namaProduk}</TableCell>
          <TableCell>Rp. {val.harga}</TableCell>
          <TableCell>{val.jumlah}</TableCell>
          <TableCell>Rp. {val.totalHarga}</TableCell>
          <TableCell>
            <button onClick={()=>OpenToggleDelete(val.id)}> delete</button>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Fragment >
      <button style={{marginTop:'100px'}}>bayar</button>
      {/* ================= modal delete ==================== */}
      <Modal title={`delete cart`} toggle={OpenToggleDelete} modal={modalDelete} actionfunc={Deletedata} btnTitle="delete"></Modal>
      <Table hover >
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
    </Fragment>
  );
}
export default CartPage;
