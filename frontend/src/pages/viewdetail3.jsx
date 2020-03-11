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
  // ============================================================ global state ===============
  const IdUserRedux = useSelector(state => state.auth.id);
  // ============================================================= local state =================
  const [dataDetail, setdataDetail] = useState([]);
  const [dataAddtoCart, setdataAddtoCart] = useState([]);

  // ===================================================================== useParam (buat ambil parameter dari app.js) ===========
  const { idDetail } = useParams(); //
  // ====================================================================== component didmount ==============
  useEffect(() => {
    // setdataAddtoCart({ ...dataAddtoCart, userId: IdUserRedux });

    Axios.get(`${APIURL}product/getDetail/${idDetail}`)
      .then(res => {
        const { id, harga } = res.data.dataDetailFootball;
        setdataAddtoCart({ ...setdataAddtoCart, harga, productId: id });
        setdataDetail(res.data.dataDetailFootball);
        // console.log("dataDetailFootball", res.data.dataDetailFootball);
        console.log('dataAddtoCart',dataAddtoCart)
      })
      .catch(err => {
        console.log("error axios");
      });
  }, []);
  //  =============================================================================== component did update =====================
  useEffect(() => {
    setdataAddtoCart({ ...dataAddtoCart, userId: IdUserRedux, status: 0 });
  }, [dataDetail]);

  console.log("state data detail", dataDetail);
  console.log("data add to cart", dataAddtoCart);
  console.log("data add to cart", typeof dataAddtoCart.jumlah);
  console.log("id user redux", IdUserRedux);

  const onSizeChange = e => {
    const { name, value } = e.target;
    setdataAddtoCart({ ...dataAddtoCart, [name]: parseInt(value) });
  };
  const onJumlahChange = e => {
    const { name, value } = e.target;
    const totalHarga = parseInt(value) * dataDetail.harga;
    setdataAddtoCart({ ...dataAddtoCart, [name]: parseInt(value),totalHarga });
  };
  const addtoCartClick = () => {
    Axios.post(`${APIURL}product/posttransaction`, { dataAddtoCart }) // dataAddtoCart dipakein {} biar waktu di controllersnya manngilnya jadi req.body.dataAddtoCart.nama variable, kalo gapake {} di backend manggilnya langsung req.body.nama variable
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('backendnya error',err);
      });
  };

  return (
    <div className="row container-viewdetail2">
      <div className="col-md-1" />
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-6 image-viewdetail2">
            <img src={APIURLimage + dataDetail.gambar} />
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
          <h4>{dataDetail.category}</h4>
          <h1>{dataDetail.namaProduk}</h1>
          <h3 style={{ marginTop: "40px" }}>Rp. {dataDetail.harga}</h3>
          <div style={{ marginBottom: "50px" }}>
            <p>select size</p>
            <div className="container-size">
              <label className="size-label">
                <input type="radio" name="size" value="40" onChange={onSizeChange} />
                <span className="checkmark">40</span>
              </label>
              <label className="size-label">
                <input type="radio" name="size" value="41" onChange={onSizeChange} />
                <span className="checkmark">41</span>
              </label>
              <label className="size-label">
                <input type="radio" name="size" value="42" onChange={onSizeChange} />
                <span className="checkmark">42</span>
              </label>
              <label className="size-label">
                <input type="radio" name="size" value="43" onChange={onSizeChange} />
                <span className="checkmark">43</span>
              </label>
              <label className="size-label">
                <input type="radio" name="size" value="44" onChange={onSizeChange} />
                <span className="checkmark">44</span>
              </label>
              <label className="size-label">
                <input type="radio" name="size" value="45" onChange={onSizeChange} />
                <span className="checkmark">45</span>
              </label>
            </div>
            <input type="number" name="jumlah" placeholder="jumlah" onChange={onJumlahChange} />
          </div>
          <div className={classes.root}>
            <Button variant="contained" onClick={addtoCartClick}>
              <AddIcon /> <span>&nbsp;&nbsp;</span> Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-1" />
    </div>
  );
}

export default ViewDetail2;
