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
  const [addDataProduct, setaddDataProduct] = useState([]);
  const [addimagefile, setaddimagefile] = useState({
    imageFileName: "select image...",
    imageFile: undefined
  });
  const [editDataProduct, seteditDataProduct] = useState([]);
  const [editimagefile, seteditimagefile] = useState({
    imageEditFileName: "select image...",
    imageEditFile: undefined
  });

  // ============================================== add (modaladd,add datacategory, add image) =======
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
  // ================================================ edit (modaledit, ) ========================
  const [dataEditBackend, setdataEditBackend] = useState([]);
  const [modaledit, setmodaledit] = useState(false);
  const toggleedit = () => setmodaledit(!modaledit);
  const onchangeEditdata = e => {
    const { name, value } = e.target;
    seteditDataProduct({ ...editDataProduct, [name]: value });
  };
  const opentogelEdit = index => {
    seteditDataProduct(dataEditBackend[index]);
    console.log("state editdata", editDataProduct);
    setmodaledit(true);
    // console.log(editDataProduct);
  };

  const onEditImageFileChange = e => {
    console.log("e.target.files[0]", editimagefile);
    var file = e.target.files[0];
    if (file) {
      seteditimagefile({ ...editimagefile, imageEditFileName: file.name, imageEditFile: e.target.files[0] });
    } else {
      seteditimagefile({ ...editimagefile, imageEditFileName: "Select Image...", imageEditFile: undefined });
    }
  };

  // ================================================ use effect/ didmount ==============
  useEffect(() => {
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        setdataproduct(res.data.dataProduct);
        setdatacategory(res.data.dataCategory);
        setdataEditBackend(res.data.ForDataEdit);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //   ======================================================= render product ================
  const renderProduct = () => {
    console.log("state dataproduk", dataproduct);
    console.log("state datacategory", datacategory);
    console.log("state dataEditBackend", dataEditBackend);
    return dataproduct.map((val, index) => {
      return (
        <tr key={val.id}>
          <th scope="row">{index + 1}</th>
          <td>
            <img src={APIURLimage + val.gambar} alt={index} width="120px" height="120px" />
          </td>
          <td>{val.namaProduk}</td>
          <td>{val.harga}</td>
          <td>{val.category}</td>
          <td>
            <button onClick={() => opentogelEdit(index)}> edit</button>
            <button> delete</button>
          </td>
        </tr>
      );
    });
  };
  // ============================================================= function crut =======================

  // ============ add data ===========
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
        console.log("post data gagal", err);
      });
  };
  // ============ edit data ========
  const Editdata = () => {
    var formdata = new FormData();
    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    formdata.append("image", editimagefile.imageEditFile);
    formdata.append("data", JSON.stringify(editDataProduct));
    console.log("formdata", formdata);
    console.log("data edit product", editDataProduct);
    Axios.put(`${APIURL}product/editdata/${editDataProduct.id}`, formdata, Headers)
      .then(res => {
        console.log(res);
        setdataproduct(res.data.dataProduct);
        setdatacategory(res.data.dataCategory);
        setmodaledit(!modaledit);
      })
      .catch(err => {
        console.log("error edit data axios", err);
        console.log(editDataProduct);
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
      {/* ========= modal add =========== */}
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
        <CustomInput type="file" label={addimagefile.imageFileName} id="addImagePost1" className="form-control" onChange={onAddImageFileChange} />
      </Modal>
      {/* ===========  modal edit ======== */}
      <Modal title={`edit product ${editDataProduct.namaProduk}`} toggle={toggleedit} modal={modaledit} actionfunc={Editdata} btnTitle="update">
        <input type="text" name="namaProduk" value={editDataProduct.namaProduk} className="form-control" onChange={onchangeEditdata} />
        <input type="text" name="harga" value={editDataProduct.harga} className="form-control" onChange={onchangeEditdata} />
        <select name="categoryId" value={editDataProduct.categoryId} className="form-control" onChange={onchangeEditdata}>
          <option hidden>piliih category</option>
          {datacategory.map((val, index) => {
            return (
              <option key={index} value={val.id}>
                {val.category}
              </option>
            );
          })}
        </select>
        <CustomInput type="file" label={editimagefile.imageEditFileName} id="editImagePost1" className="form-control" onChange={onEditImageFileChange} />
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
