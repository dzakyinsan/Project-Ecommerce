import React, { useEffect, Fragment, useState } from "react";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Table, CustomInput } from "reactstrap";
import Modal from "./../components/modal";

function ManageProduct() {
  const [dataproduct, setdataproduct] = useState([
    {
      namaProduk: "",
      harga: 0,
      category: ""
    }
  ]);
  const [datacategory, setdatacategory] = useState([]);
  const [addimagefile, setaddimagefile] = useState({
    imageFileName: "select image...",
    gambar1: undefined,
    imageFile: undefined
  });
  // const [imageData, setImageData] = useState([]);

  const [addDataProduct, setaddDataProduct] = useState([]);
  const [modaladd, setmodaladd] = useState(false);

  const toggleadd = () => setmodaladd(!modaladd);

  const onchangeAdddata = e => {
    const { name, value } = e.target;
    setaddDataProduct({ ...addDataProduct, [name]: value });
  };

  const onAddImageFileChange = event => {
    console.log("event.target.files[0]", event.target.files[0]); //ini isinya nama dari img yg kita ambil
    // setImageData({ ...imageData, [event.target.name]: event.target.files[0] });
    var file = event.target.files[0];

    if (file) {
      setaddimagefile({ ...addimagefile, ImageFileName: file.name, imageFile: event.target.files[0] });
    } else {
      setaddimagefile({ ...addimagefile, ImageFileName: "Select Image...", ImageFile: undefined });
    }
  };

  // console.log(imageData);

  // ================================================ use effect/ didmount ==============
  useEffect(() => {
    console.log("didmount", dataproduct);
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        setdataproduct(res.data.dataProduct);
        setdatacategory(res.data.dataCategory);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //   ======================================================= render product ================
  const renderProduct = () => {
    console.log("dataproduct", dataproduct);
    return dataproduct.map((val, index) => {
      return (
        <tr key={val.id}>
          <th scope="row">{index + 1}</th>
          <td>
            <img src={APIURLimage + val.gambar} alt={index} width="100px" height="100px" />
          </td>
          <td>{val.namaProduk}</td>
          <td>{val.harga}</td>
          <td>{val.category}</td>
          <td>
            <button> edit</button>
            <button> delete</button>
          </td>
        </tr>
      );
    });
  };
  // ============================================================= function crut =======================

  const adddata = () => {
    var formdata = new FormData();
    const token = localStorage.getItem("token");
    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    };

    formdata.append("image", addimagefile.imageFile);
    formdata.append("data", JSON.stringify(addDataProduct));
    console.log("formdata", formdata);
    Axios.post(`${APIURL}product/postproduct`, formdata, Headers)
      .then(res => {
        console.log(res);
        setdataproduct(res.data.dataProduct);
        setdatacategory(res.data.dataCategory);
        setmodaladd(!modaladd);
      })
      .catch(err => {
        console.log("error pak bu", err);
      });
  };

  if (dataproduct.length === 0) {
    return <div>loading</div>;
  }

  return (
    <Fragment>
      <button style={{ marginTop: "10px" }} onClick={toggleadd}>
        {" "}
        add data
      </button>
      <Modal title="add data" toggle={toggleadd} modal={modaladd} actionfunc={adddata} btnTitle="save">
        <input type="text" name="namaProduk" placeholder="nama produk" className="form-control" onChange={onchangeAdddata} />
        <input type="text" name="harga" placeholder="harga" className="form-control" onChange={onchangeAdddata} />

        <select name="categoryId" className="form-control" onChange={onchangeAdddata}>
          <option hidden>piliih category</option>
          {datacategory.map((val, index) => {
            return (
              <option key={index} value={val.id}>
                {val.category}
              </option>
            );
          })}
        </select>

        <CustomInput type="file" name="gambar1" label={addimagefile.imageFileName} id="addImagePost1" className="form-control" onChange={onAddImageFileChange} />
        {/* <CustomInput type="file" name="gambar2" label={addimagefile.imageFileName} id="addImagePost2" className="form-control" onChange={onAddImageFileChange} multiple />
          <CustomInput type="file" name="gambar3" label={addimagefile.imageFileName} id="addImagePost3" className="form-control" onChange={onAddImageFileChange} multiple />
          <CustomInput type="file" name="gambar4" label={addimagefile.imageFileName} id="addImagePost4" className="form-control" onChange={onAddImageFileChange} multiple /> */}
      </Modal>
      <Table hover style={{ marginBottom: "500px" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderProduct()}</tbody>
      </Table>
    </Fragment>
  );
}

export default ManageProduct;
