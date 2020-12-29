import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { APIURL } from "../helper/ApiUrl";
import { AdminGetProduct } from "./../redux/Actions";
import Swal from "sweetalert2";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root2: {
    "& > *": {
      margin: theme.spacing(1),
      width: "120px",
      height: "50px",
      backgroundColor: "black",
      color: "white",
      fontSize: "12px"
    }
  }
}));

function ManageCategory() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // =============================== global state redux ======================
  const { dataCategoryRedux } = useSelector(state => state.ManageProductReducer);
  // ============= add ===========
  const [modalAdd, setmodalAdd] = useState(false);
  const toggleAdd = () => setmodalAdd(!modalAdd);
  const [dataAddCategory, setdataAddCategory] = useState([]);
  const onchangeAddCategory = e => {
    const { name, value } = e.target;
    setdataAddCategory({ ...dataAddCategory, [name]: value });
  };
  // =========== edit ===========
  const [modalEdit, setmodalEdit] = useState(false);
  const [dataEdit, setdataEdit] = useState([]);
  const opentoggleEdit = index => {
    setdataEdit(dataCategoryRedux[index]);
    setmodalEdit(!modalEdit);
  };
  const toggleedit = () => setmodalEdit(!modalEdit);
  const onchangeEditCategory = e => {
    const { name, value } = e.target;
    setdataEdit({ ...dataEdit, [name]: value });
  };

  // ============================================ para function ======================
  // ============== add category ==========
  const addcategory = () => {
    Axios.post(`${APIURL}product/postcategory`, { dataAddCategory })
      .then(res => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `New Category has been added `,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(AdminGetProduct());
        setmodalAdd(!modalAdd);
      })
      .catch(err => {
      });
  };

  // ================= edit category ==========
  const editcategory = () => {
    Axios.put(`${APIURL}product/editcategory/${dataEdit.id}`, { dataEdit })
      .then(res => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Category has been edited `,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(AdminGetProduct());
        setmodalEdit(!modalEdit);
      })
      .catch(err => {
      });
  };

  // ======================================= render category ========================
  const renderCategory = () => {
    return dataCategoryRedux.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.category} </TableCell>
          <TableCell>
            <button className="btn-delete-cart" onClick={() => opentoggleEdit(index)}>
              <EditIcon />
            </button>{" "}
          </TableCell>
        </TableRow>
      );
    });
  };


  if (dataCategoryRedux.length === 0) {
    return <div>loading</div>;
  }
  return (
    <div style={{minHeight:'100px'}}>
      <div className={classes.root2}>
        <Button variant="contained" onClick={toggleAdd}>
          Add Catagory
        </Button>
      </div>

      {/* ================= modal add =================== */}
      <Modal tittle="add category" toggle={toggleAdd} modal={modalAdd} actionfunc={addcategory} btnTitle="add">
        <input type="text" name="category" placeholder="nama category" className="form-control" onChange={onchangeAddCategory} />
      </Modal>
      {/* ============= modal edit ===================  */}
      <Modal tittle="edit category" toggle={toggleedit} modal={modalEdit} actionfunc={editcategory} btnTitle="edit">
        <input type="text" name="category" value={dataEdit.category} className="form-control" onChange={onchangeEditCategory} />
      </Modal>
      <Table hover>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderCategory()}</TableBody>
      </Table>
    </div >
  );
}

export default ManageCategory;
