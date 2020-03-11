import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetViewDetail } from "./../redux/Actions";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "400px",
      height: "50px",
      backgroundColor: "#c48236",
      color: "white",
      fontSize: "15px"
    }
  }
}));

function ViewDetail2() {
  const classes = useStyles();
  // =========================== global state ===============
  const IdUserRedux = useSelector(state => state.auth.id);
  // ======================== local state =================
  const [dataDetail, setdataDetail] = useState([]);
  const [selectedSize, setselectedSize] = useState([]);
  // ============================== useParam (buat ambil parameter dari app.js) ===========
  const { idDetail } = useParams(); //
  // ====================== component didmount ==============

  useEffect(() => {
    console.log("id user", IdUserRedux);
    console.log("selected size", selectedSize);
    Axios.get(`${APIURL}product/getDetail/${idDetail}`)
      .then(res => {
        setdataDetail(res.data.dataDetailBasketball);
        console.log("dataDetailBasketball", res.data.dataDetailBasketball);
      })
      .catch(err => {
        console.log("error axios");
      });
  }, []);
  console.log("state data detail", dataDetail);

  const onSizeChange = e => {
    setselectedSize({ selectedSize: e.target.value });
  };

  return dataDetail.map((val, index) => {
    return (
      <div className="row container-viewdetail2">
        <div className="col-md-1" />
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6 image-viewdetail2">
              <img src={APIURLimage + val.gambar} />
            </div>
            <div className="col-md-6 image-viewdetail2">
              <img src="https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/46e725fc-c61c-40f2-8171-80e3814c8b57/air-vapormax-360-womens-shoe-hr1kMz.jpg" />
            </div>
            <div className="col-md-6 image-viewdetail2">
              <img src="https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/597bb435-2ec3-4888-b0cd-9bb4c4ce2402/air-vapormax-360-womens-shoe-hr1kMz.jpg" />
            </div>
            <div className="col-md-6 image-viewdetail2">
              <img src="https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/cc222cb0-4e03-4cba-92b8-0a79656d307c/air-vapormax-360-womens-shoe-hr1kMz.jpg" />
            </div>
          </div>
        </div>
        <div className="col-md-4 viewdetail-desc">
          <div style={{ width: "450px" }}>
            <h4>{val.category}</h4>
            <h1>{val.namaProduk}</h1>
            <h3 style={{ marginTop: "40px" }}>Rp. {val.harga}</h3>
            <div style={{ marginBottom: "50px" }}>
              <p>select size</p>
              <div className="container-size">
                <label className="size-label">
                  <input type="radio" name="radio" value="40" onChange={onSizeChange} />
                  <span className="checkmark">40</span>
                </label>
                <label className="size-label">
                  <input type="radio" name="radio" value="41" onChange={onSizeChange} />
                  <span className="checkmark">41</span>
                </label>
                <label className="size-label">
                  <input type="radio" name="radio" value="42" onChange={onSizeChange} />
                  <span className="checkmark">42</span>
                </label>
                <label className="size-label">
                  <input type="radio" name="radio" value="43" onChange={onSizeChange} />
                  <span className="checkmark">43</span>
                </label>
                <label className="size-label">
                  <input type="radio" name="radio" value="44" onChange={onSizeChange} />
                  <span className="checkmark">44</span>
                </label>
                <label className="size-label">
                  <input type="radio" name="radio" value="45" onChange={onSizeChange} />
                  <span className="checkmark">45</span>
                </label>
              </div>
            </div>
            <div className={classes.root}>
              <Button variant="contained">
                <AddIcon /> <span>&nbsp;&nbsp;</span> Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    );
  });
}

export default ViewDetail2;
