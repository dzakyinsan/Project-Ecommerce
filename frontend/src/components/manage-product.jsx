import React, { useEffect,Fragment, useState } from "react";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table } from "reactstrap";
import Modal from './../components/modal';


function ManageProduct() {
  const [dataproduct, setdataproduct] = useState([]);
  const [modaladd,setmodaladd]=useState([])


  const toggleadd=()=>setmodaladd(!modaladd)
  // ================================================ use effect/ didmount ==============
  useEffect(() => {
    console.log("didmount");
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        setdataproduct(res.data.dataProduct);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //   ======================================================= render product ================
  const renderProduct = () => {
    return dataproduct.map((val, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>gambar</td>
          <td>{val.namaProduk}</td>
          <td>{val.harga}</td>
          <td>
            <button> edit</button>
            <button> delete</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Fragment>
        <button> add data</button>
        {/* <Modal title="add data" toggle={toggleadd} modal={modaladd} actionfunc={adddata} btnTitle="save">

        </Modal> */}
      <Table hover style={{ marginBottom: "500px" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderProduct()}</tbody>
      </Table>
    </Fragment>
  );
}

export default ManageProduct;
