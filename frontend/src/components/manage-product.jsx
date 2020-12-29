import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { CustomInput } from "reactstrap";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import { AdminDeleteProduct, OpenToggleDeleteRedux, AdminGetProduct } from "./../redux/Actions";
import Modal from "./../components/modal";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "85ch",
      // marginTop: "25px",
      // fontSize: "30px",
      fontWeight: "bold",
    },
  },
  root2: {
    "& > *": {
      margin: theme.spacing(1),
      width: "200px",
      height: "50px",
      backgroundColor: "black",
      color: "white",
      fontSize: "15px",
    },
  },
}));

function ManageProduct() {
  //========================= set dispatch (buat masukin data ke redux) ======================
  const dispatch = useDispatch();
  const classes = useStyles();

  // ======================== global state redux ================
  const { dataProductRedux, dataCategoryRedux, dataEditRedux, modalDeleteRedux, idProductDeleteRedux, modalAddRedux } = useSelector((state) => state.ManageProductReducer);
  //useSelector buat manggil state dari redux

  // ============================ local state =====================
  const [addDataProduct, setaddDataProduct] = useState([]);
  const [addimagefile, setaddimagefile] = useState({
    imageFileName: "select image 1...",
    imageFile: undefined,
    imageFileName2: "select image 2...",
    imageFile2: undefined,
    imageFileName3: "select image 3...",
    imageFile3: undefined,
    imageFileName4: "select image 4...",
    imageFile4: undefined,
  });
  const [editDataProduct, seteditDataProduct] = useState([]);
  const [editimagefile, seteditimagefile] = useState({
    imageEditFileName: "select image 1...",
    imageEditFile: undefined,
    imageEditFileName2: "select image 2...",
    imageEditFile2: undefined,
    imageEditFileName3: "select image 3...",
    imageEditFile3: undefined,
    imageEditFileName4: "select image 4...",
    imageEditFile4: undefined,
  });

  const [search, setsearch] = useState("");
  const [filtereddataProductRedux, setfiltereddataProductRedux] = useState([]);
  const [filtereddataEditRedux, setfiltereddataEditRedux] = useState([]);

  // =================================== useEffect search =====================
  useEffect(() => {
    setfiltereddataProductRedux(
      dataProductRedux.filter((dataproduk) => {
        return dataproduk.namaProduk.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, dataProductRedux]);

  useEffect(() => {
    setfiltereddataEditRedux(
      dataEditRedux.filter((dataedit) => {
        return dataedit.namaProduk.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, dataEditRedux]);

  // ============================================== add  ===================================
  const [modaladd, setmodaladd] = useState(false);
  const toggleadd = () => setmodaladd(!modaladd);
  const onchangeAdddata = (e) => {
    const { name, value } = e.target;
    setaddDataProduct({ ...addDataProduct, [name]: value });
  };
  const onAddImageFileChange = (e) => {
    var file = e.target.files[0];
    var name = e.target.name;

    if (file) {
      setaddimagefile({ ...addimagefile, imageFileName: file.name, [name]: file });
    } else {
      setaddimagefile({ ...addimagefile, imageFileName: "Select Image...", [name]: undefined });
    }
  };
  // ================================================ edit  =============================
  const [modaledit, setmodaledit] = useState(false);
  const toggleedit = () => {
    setmodaledit(!modaledit);
  };
  const onchangeEditdata = (e) => {
    const { name, value } = e.target;
    seteditDataProduct({ ...editDataProduct, [name]: value });
  };
  const opentogelEdit = (index) => {
    seteditDataProduct(filtereddataEditRedux[index]);
    setmodaledit(true);
  };

  const onEditImageFileChange = (e) => {

    var file = e.target.files[0];
    var name = e.target.name;
    if (file) {
      seteditimagefile({ ...editimagefile, imageEditFileName: file.name, [name]: file });
    } else {
      seteditimagefile({ ...editimagefile, imageEditFileName: "Select Image...", [name]: undefined });
    }
  };
  // =================================================== delete ========================================
  const opentogelDelete = (index) => {
    dispatch(OpenToggleDeleteRedux(index));
  };

  // ============================================================= function crud =======================

  // ============ add data ===========
  const adddata = () => {
    var formdata = new FormData();
    const token = localStorage.getItem("token");
    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    formdata.append("image", addimagefile.imageFile);
    formdata.append("image", addimagefile.imageFile2);
    formdata.append("image", addimagefile.imageFile3);
    formdata.append("image", addimagefile.imageFile4);
    formdata.append("data", JSON.stringify(addDataProduct));
    Axios.post(`${APIURL}product/postproduct`, formdata, Headers)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `New product has been added `,
          showConfirmButton: false,
          timer: 2500,
        });
        dispatch(AdminGetProduct());
        // setdataproduct(res.data.dataProduct);
        // setdatacategory(res.data.dataCategory);
        setmodaladd(!modaladd);
      })
      .catch((err) => {
      });
  };
  // ============ edit data ========
  const Editdata = () => {
    var formdata = new FormData();
    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    formdata.append("image", editimagefile.imageEditFile);
    formdata.append("image", editimagefile.imageEditFile2);
    formdata.append("image", editimagefile.imageEditFile3);
    formdata.append("image", editimagefile.imageEditFile4);
    formdata.append("data", JSON.stringify(editDataProduct));

    Axios.put(`${APIURL}product/editdata/${editDataProduct.id}`, formdata, Headers)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `the product has been edited`,
          showConfirmButton: false,
          timer: 2500,
        });
        dispatch(AdminGetProduct());
        // setdataproduct(res.data.dataProduct);
        // setdatacategory(res.data.dataCategory);
        setmodaledit(!modaledit);
      })
      .catch((err) => {
      });
  };
  // ============== delete data =======
  const Deletedata = () => {
    var idProduct = idProductDeleteRedux;
    dispatch(AdminDeleteProduct(idProduct));
  };
  //   ======================================================= render product ================
  const renderProduct = () => {
    return filtereddataProductRedux.map((val, index) => {
      return (
        <TableRow key={val.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.namaProduk}</TableCell>
          <TableCell>
            <img src={APIURLimage + val.gambar} alt={index} width="160px" height="160px" />
          </TableCell>
          <TableCell>
            <NumberFormat value={val.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
          </TableCell>
          <TableCell>{val.category}</TableCell>
          <TableCell>
            <button className="btn-delete-cart" onClick={() => opentogelEdit(index)}>
              <EditIcon />
            </button>
            <button className="btn-delete-cart" onClick={() => opentogelDelete(val.id)}>
              <DeleteIcon />
            </button>
          </TableCell>
        </TableRow>
      );
    });
  };

  if (dataProductRedux.length === 0 || dataCategoryRedux.length === 0 || dataEditRedux.length === 0) {
    return (
      <div style={{ minHeight: "1000px", paddingTop: "300px", paddingLeft: "700px" }}>
        <h1 style={{ fontSize: "100px", color: "#c48236" }}>FOOTBOOTS2020</h1>
        <h1 style={{ fontSize: "80px", marginLeft: "250px" }}>loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {/* ========= modal add =========== */}
      <Modal title="add data" toggle={toggleadd} modal={modaladd} actionfunc={adddata} btnTitle="save">
        <input type="text" name="namaProduk" placeholder="nama produk" className="form-control adminadd" onChange={onchangeAdddata} />
        <input type="text" name="harga" placeholder="harga" className="form-control adminadd" onChange={onchangeAdddata} />
        <select name="categoryId" className="form-control adminadd" onChange={onchangeAdddata}>
          <option hidden>piliih category</option>
          {dataCategoryRedux.map((val, index) => {
            return (
              <option key={index} value={val.id}>
                {val.category}
              </option>
            );
          })}
        </select>
        <CustomInput type="file" name="imageFile" label={addimagefile.imageFileName} id="addImagePost1" className="form-control adminadd" onChange={onAddImageFileChange} multiple />
        <CustomInput type="file" name="imageFile2" label={addimagefile.imageFileName2} id="addImagePost1" className="form-control adminadd" onChange={onAddImageFileChange} />
        <CustomInput type="file" name="imageFile3" label={addimagefile.imageFileName3} id="addImagePost1" className="form-control adminadd" onChange={onAddImageFileChange} />
        <CustomInput type="file" name="imageFile4" label={addimagefile.imageFileName4} id="addImagePost1" className="form-control adminadd" onChange={onAddImageFileChange} />
      </Modal>

      {/* ===========  modal edit ======== */}
      <Modal title={`edit product ${editDataProduct.namaProduk}`} toggle={toggleedit} modal={modaledit} actionfunc={Editdata} btnTitle="update">
        <input type="text" name="namaProduk" value={editDataProduct.namaProduk} className="form-control adminadd" onChange={onchangeEditdata} />
        <input type="text" name="harga" value={editDataProduct.harga} className="form-control adminadd" onChange={onchangeEditdata} />
        <select name="categoryId" value={editDataProduct.categoryId} className="form-control adminadd" onChange={onchangeEditdata}>
          <option hidden>piliih category</option>
          {dataCategoryRedux.map((val, index) => {
            return (
              <option key={index} value={val.id}>
                {val.category}
              </option>
            );
          })}
        </select>
        <CustomInput type="file" name="imageEditFile" label={editimagefile.imageEditFileName} id="editImagePost1" className="form-control adminadd" onChange={onEditImageFileChange} />
        <CustomInput type="file" name="imageEditFile2" label={editimagefile.imageEditFileName2} id="editImagePost1" className="form-control adminadd" onChange={onEditImageFileChange} />
        <CustomInput type="file" name="imageEditFile3" label={editimagefile.imageEditFileName3} id="editImagePost1" className="form-control adminadd" onChange={onEditImageFileChange} />
        <CustomInput type="file" name="imageEditFile4" label={editimagefile.imageEditFileName4} id="editImagePost1" className="form-control adminadd" onChange={onEditImageFileChange} />
      </Modal>

      {/* ============= modal delete ========= */}
      <Modal title={`delete product`} toggle={opentogelDelete} modal={modalDeleteRedux} actionfunc={Deletedata} btnTitle="delete"></Modal>
      <div style={{ display: "flex", marginTop: "50px" }}>
        <div className={classes.root}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            id="outlined-basic"
            // label="Search..."
            placeholder="Search..."
            variant="outlined"
            type="text"
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className={classes.root2}>
          <Button variant="contained" onClick={toggleadd}>
            Add Data
          </Button>
        </div>
      </div>
      <Table hover>
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
    </div>
  );
}

export default ManageProduct;
