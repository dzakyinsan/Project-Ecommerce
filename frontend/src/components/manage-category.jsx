import React, { useEffect, Fragment, useState } from "react";
import { useSelector} from 'react-redux'

import Axios from "axios";
import { APIURL } from "./../helper/ApiUrl";
// import { Table } from "reactstrap";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Modal from "./../components/modal";

function ManageCategory() {
  // =============================== global state redux ======================
  const {dataCategoryRedux}=useSelector(state=>state.ManageProductReducer)

  const [dataCategory, setdataCategory] = useState([]);
  const [modalAdd,setmodalAdd] = useState(false)
  const toggleAdd =()=>setmodalAdd(!modalAdd)
  const [dataAddCategory,setdataAddCategory]=useState([])
  const onchangeAddCategory =e=>{
    const {name,value}=e.target
    setdataAddCategory({...dataAddCategory,[name]:value})
  }

  // ======================================= render category ========================
  const renderCategory = () => {
    return dataCategoryRedux.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.category} </TableCell>
          <TableCell>
            <button>edit</button>
          </TableCell>
        </TableRow>
      );
    });
  };
  // ============================================ para function ======================
  // ============== add category ==========
  const addcategory = () =>{

  }

  if(dataCategoryRedux.length === 0){
    return <div>loading</div>
  }
  return (
    <Fragment>
      <button onClick={toggleAdd}>
        add category
      </button>
      {/* ================= modal add =================== */}
      <Modal tittle='add category' toggle={toggleAdd} modal={modalAdd} actionfunc={addcategory} btnTitle='add' >
        <input type='text' name='category' placeholder='nama category' className="form-control" onChange={onchangeAddCategory}/>
      </Modal>
      <Table hover style={{ marginBottom: "500px" }}>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderCategory()}</TableBody>
      </Table>
    </Fragment>
  );
}

export default ManageCategory;
