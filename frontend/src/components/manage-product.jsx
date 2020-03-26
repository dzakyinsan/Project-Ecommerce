import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { CustomInput } from "reactstrap";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import { AdminDeleteProduct, OpenToggleDeleteRedux, AdminGetProduct } from "./../redux/Actions";
import Modal from "./../components/modal";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";

// import { MODAL_ADD } from "./../redux/Actions/types";

function ManageProduct() {
  // ======================== global state redux ================
  const { dataProductRedux, dataCategoryRedux, dataEditRedux, modalDeleteRedux, idProductDeleteRedux, modalAddRedux } = useSelector(state => state.ManageProductReducer);
  //useSelector buat manggil state dari redux

  //========================= set dispatch (buat masukin data ke redux) ======================
  const dispatch = useDispatch();

  // ============================ local state =====================
  const [addDataProduct, setaddDataProduct] = useState([]);
  const [addimagefile, setaddimagefile] = useState({
    imageFileName: "select image...",
    imageFile: undefined
  });
  const [editDataProduct, seteditDataProduct] = useState([]);
  const [dataEditBackend, setdataEditBackend] = useState([]);
  const [editimagefile, seteditimagefile] = useState({
    imageEditFileName: "select image...",
    imageEditFile: undefined
  });

  // ============================================== add  ===================================
  const [modaladd, setmodaladd] = useState(false);
  const toggleadd = () => setmodaladd(!modaladd);
  const onchangeAdddata = e => {
    const { name, value } = e.target;
    setaddDataProduct({ ...addDataProduct, [name]: value });
  };
  const onAddImageFileChange = event => {
    console.log("event.target.files[0]", event.target.files[0]); //ini isinya nama dari img yg kita ambil
    var file = event.target.files[0];

    if (file) {
      setaddimagefile({ ...addimagefile, ImageFileName: file.name, imageFile: event.target.files[0] });
    } else {
      setaddimagefile({ ...addimagefile, ImageFileName: "Select Image...", ImageFile: undefined });
    }
  };
  // ================================================ edit  =============================
  const [modaledit, setmodaledit] = useState(false);
  const toggleedit = () => {
    setmodaledit(!modaledit);
    // console.log("dataEditRedux", dataEditRedux);
  };
  const onchangeEditdata = e => {
    const { name, value } = e.target;
    seteditDataProduct({ ...editDataProduct, [name]: value });
    console.log("editDataProduct", editDataProduct);
  };
  const opentogelEdit = index => {
    seteditDataProduct(dataEditRedux[index]);
    setmodaledit(true);
    console.log("data edit redux", dataEditRedux);
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
  // =================================================== delete ========================================
  const opentogelDelete = index => {
    dispatch(OpenToggleDeleteRedux(index));

    // const[modalDelete,setmodalDelete]=useState(false)
    // const toggleDelete = () => {
    //   setmodalDelete(!modalDelete);
    //   console.log("dataEditRedux", dataEditRedux);
    // };
    // console.log(dataEditBackend[index]);
  };

  // ================================================ use effect/ didmount ==============
  // useEffect(() => {
  //   Axios.get(`${APIURL}product/getproduct`)
  //     .then(res => {
  //       console.log("use effect");
  //       setdataproduct(res.data.dataProduct);
  //       setdatacategory(res.data.dataCategory);
  //       setdataEditBackend(res.data.ForDataEdit);

  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);
  // ======================================================== use effect/did update =================
  // useEffect(() => {
  //   if (deletestatus) {
  //     Axios.get(`${APIURL}product/getproduct`)
  //       .then(res => {
  //         console.log("use effect");
  //         setdataproduct(res.data.dataProduct);
  //         setdatacategory(res.data.dataCategory);
  //         setdataEditBackend(res.data.ForDataEdit);
  //         setdeletestatus(false);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }, [deletestatus]);

  // ============================================================= function crud =======================

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
        console.log("berhasil add", res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `New product has been added `,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(AdminGetProduct());
        // setdataproduct(res.data.dataProduct);
        // setdatacategory(res.data.dataCategory);
        setmodaladd(!modaladd);
        console.log("masuk add data");
      })
      .catch(err => {
        console.log("post data gagal", err);
      });
  };
  // ============ edit data ========
  const Editdata = () => {
    console.log("editdataproduk", editDataProduct);
    console.log("editimagefile", editimagefile);
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
    console.log("editimagefile.imageEditFile", editimagefile.imageEditFile);

    Axios.put(`${APIURL}product/editdata/${editDataProduct.id}`, formdata, Headers)
      .then(res => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `the product has been edited`,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(AdminGetProduct());
        // setdataproduct(res.data.dataProduct);
        // setdatacategory(res.data.dataCategory);
        setmodaledit(!modaledit);
      })
      .catch(err => {
        console.log("error edit data axios", err);
        console.log(editDataProduct);
      });
  };
  // ============== delete data =======
  const Deletedata = () => {
    var idProduct = idProductDeleteRedux;
    console.log(idProduct);
    dispatch(AdminDeleteProduct(idProduct));
  };
  //   ======================================================= render product ================
  const renderProduct = () => {
    // console.log("state dataProductRedux", dataProductRedux);
    // console.log("state dataCategoryRedux", dataCategoryRedux);
    // console.log("state dataEditRedux", dataEditRedux);
    return dataProductRedux.map((val, index) => {
      return (
        <TableRow key={val.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.namaProduk}</TableCell>
          <TableCell>
            <img src={APIURLimage + val.gambar} alt={index} width="200px" height="200px" />
          </TableCell>
          <TableCell>
            <NumberFormat value={val.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
          </TableCell>
          <TableCell>{val.category}</TableCell>
          <TableCell>
            <button onClick={() => opentogelEdit(index)}> edit</button>
            <button onClick={() => opentogelDelete(val.id)}> delete</button>
          </TableCell>
        </TableRow>
      );
    });
  };

  console.log("state dataProductRedux", dataProductRedux);
  console.log("state dataCategoryRedux", dataCategoryRedux);
  console.log("state dataEditRedux", dataEditRedux);

  if (dataProductRedux.length === 0 || dataCategoryRedux.length === 0 || dataEditRedux.length === 0) {
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
          {dataCategoryRedux.map((val, index) => {
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
          {dataCategoryRedux.map((val, index) => {
            return (
              <option key={index} value={val.id}>
                {val.category}
              </option>
            );
          })}
        </select>
        <CustomInput type="file" label={editimagefile.imageEditFileName} id="editImagePost1" className="form-control" onChange={onEditImageFileChange} />
      </Modal>
      {/* ============= modal delete ========= */}
      <Modal title={`delete product`} toggle={opentogelDelete} modal={modalDeleteRedux} actionfunc={Deletedata} btnTitle="delete"></Modal>
      <Table hover style={{ marginBottom: "500px" }}>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Nama Produk</TableCell>
            <TableCell></TableCell>
            <TableCell>Harga</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderProduct()}</TableBody>
      </Table>
    </Fragment>
  );
}

export default ManageProduct;
