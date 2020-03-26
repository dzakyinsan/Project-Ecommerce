import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetViewDetail } from "./../redux/Actions";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import AddIcon from "@material-ui/icons/Add";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CartGetProduct } from "./../redux/Actions";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "300px",
      height: "50px",
      backgroundColor: "black",
      color: "white",
      fontSize: "15px"
    }
  },
  root2: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function ViewDetail2() {
  const classes = useStyles();
  // ============================================================ global state ===============
  const IdUserRedux = useSelector(state => state.auth.id);
  const stateAuthRedux = useSelector(state => state.auth);
  const roleRedux = useSelector(state => state.auth.roleId);

  // ============================================================= local state =================
  const [dataDetail, setdataDetail] = useState([]);
  const [dataAddtoCart, setdataAddtoCart] = useState([]);
  const [RedirectToCatalog3, setRedirectToCatalog3] = useState(false);

  // ===================================================================== useParam (buat ambil parameter dari app.js) ===========
  const { idDetail } = useParams();
  // ================================================================== set dispatch ================ ==========
  const dispatch = useDispatch();
  // ====================================================================== component didmount ==============
  useEffect(() => {
    // setdataAddtoCart({ ...dataAddtoCart, userId: IdUserRedux });

    Axios.get(`${APIURL}product/getDetail/${idDetail}`)
      .then(res => {
        const { id, harga } = res.data.dataDetailFootball;
        setdataAddtoCart({ ...setdataAddtoCart, harga, productId: id, jumlah: 1 });
        setdataDetail(res.data.dataDetailFootball);
        // console.log("dataDetailFootball", res.data.dataDetailFootball);
        console.log("dataAddtoCart", dataAddtoCart);
      })
      .catch(err => {
        console.log("error axios");
      });
  }, []);
  //  =============================================================================== component did update =====================
  useEffect(() => {
    const totalHarga = dataAddtoCart.jumlah * dataDetail.harga;
    setdataAddtoCart({ ...dataAddtoCart, userId: IdUserRedux, status: "cart", totalHarga });
  }, [dataDetail]);

  // console.log("state data detail", dataDetail);
  console.log("data add to cart", dataAddtoCart);
  // console.log("data add to cart", typeof dataAddtoCart.jumlah);
  console.log("id user redux", IdUserRedux);

  const onSizeChange = e => {
    const { name, value } = e.target;
    setdataAddtoCart({ ...dataAddtoCart, [name]: parseInt(value) });
  };
  const onJumlahChange = e => {
    const { name, value } = e.target;
    const totalHarga = parseInt(value) * dataDetail.harga;
    setdataAddtoCart({ ...dataAddtoCart, [name]: parseInt(value), totalHarga });
  };
  const addtoCartClick = () => {
    Axios.post(`${APIURL}product/posttransaction`, { dataAddtoCart }) // dataAddtoCart dipakein {} biar waktu di controllersnya manngilnya jadi req.body.dataAddtoCart.nama variable, kalo gapake {} di backend manggilnya langsung req.body.nama variable
      .then(res => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${dataDetail.namaProduk} has been added to your cart`,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(CartGetProduct());
      })
      .catch(err => {
        console.log("backendnya error", err);
      })
      .then(res2 => {
        setRedirectToCatalog3(true);
      });
  };
  // console.log("dataAddtoCart", dataAddtoCart);
  // console.log("typeof jumlah", typeof dataAddtoCart.jumlah);
  console.log("roleRedux", roleRedux);
  console.log("RedirectToCatalog3", RedirectToCatalog3);

  if (RedirectToCatalog3) {
    return <Redirect to={"/catalogs3"} />;
  }
  return (
    <div className="row container-viewdetail2">
      <div className="col-md-1" />
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-6 image-viewdetail2">
            <img src={APIURLimage + dataDetail.gambar} />
          </div>
          <div className="col-md-6 image-viewdetail2">
            <img src={APIURLimage + dataDetail.gambar} />
          </div>
          <div className="col-md-6 image-viewdetail2">
            <img src={APIURLimage + dataDetail.gambar} />
          </div>
          <div className="col-md-6 image-viewdetail2">
            <img src={APIURLimage + dataDetail.gambar} />
          </div>
        </div>
      </div>
      <div className="col-md-4 viewdetail-desc">
        <div style={{ width: "450px" }}>
          <h4>{dataDetail.category}</h4>
          <h1>{dataDetail.namaProduk}</h1>
          <div className="harga-detail" style={{ marginTop: "40px" }}>
            <NumberFormat value={dataDetail.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp. "} />
          </div>
          <div style={{ marginBottom: "50px", marginTop: "80px" }}>
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
            <div style={{ display: "flex", marginTop: "30px" }}>
              <div>
                <input className="jmlinput" type="number" name="jumlah" placeholder=" Quantity" defaultValue="1" onChange={onJumlahChange} />
              </div>

              {dataAddtoCart.size !== undefined && dataAddtoCart.jumlah > 0 && roleRedux == 2 ? (
                <div className={classes.root}>
                  <Button variant="contained" onClick={addtoCartClick}>
                    Add to Cart
                  </Button>
                </div>
              ) : (
                <div className={classes.root}>
                  <Button variant="contained" onClick={addtoCartClick} disabled>
                    Add to Cart
                  </Button>
                </div>
              )}
            </div>
            {roleRedux === 1 ? (
              <div className={classes.root2}>
                <Alert variant="filled" severity="error">
                  Admin cannot make a transaction!
                </Alert>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="col-md-1" />
    </div>
  );
}

export default ViewDetail2;
