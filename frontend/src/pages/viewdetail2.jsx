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
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "300px",
      height: "50px",
      backgroundColor: "black",
      color: "white",
      fontSize: "15px",
    },
  },
  root2: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ViewDetail2() {
  const classes = useStyles();
  // ============================================================ global state ===============
  const IdUserRedux = useSelector((state) => state.auth.id);
  const stateAuthRedux = useSelector((state) => state.auth);
  const roleRedux = useSelector((state) => state.auth.roleId);

  // ============================================================= local state =================
  const [dataDetail, setdataDetail] = useState([]);
  const [dataAddtoCart, setdataAddtoCart] = useState([]);
  const [RedirectToCatalog2, setRedirectToCatalog2] = useState(false);

  // ===================================================================== useParam (buat ambil parameter dari app.js) ===========
  const { idDetail } = useParams();
  // ================================================================== set dispatch ================ ==========
  const dispatch = useDispatch();
  // ====================================================================== component didmount ==============
  useEffect(() => {
    // setdataAddtoCart({ ...dataAddtoCart, userId: IdUserRedux });

    Axios.get(`${APIURL}product/getDetail/${idDetail}`)
      .then((res) => {
        const { id, harga } = res.data.dataDetailBasketball;
        setdataAddtoCart({ ...setdataAddtoCart, harga, productId: id, jumlah: 1 });
        setdataDetail(res.data.dataDetailBasketball);
      })
      .catch((err) => {
      });
  }, []);
  //  =============================================================================== component did update =====================
  useEffect(() => {
    const totalHarga = dataAddtoCart.jumlah * dataDetail.harga;
    setdataAddtoCart({ ...dataAddtoCart, userId: IdUserRedux, status: "cart", totalHarga });
  }, [dataDetail]);


  const onSizeChange = (e) => {
    const { name, value } = e.target;
    setdataAddtoCart({ ...dataAddtoCart, [name]: parseInt(value) });
  };
  const onJumlahChange = (e) => {
    const { name, value } = e.target;
    const totalHarga = parseInt(value) * dataDetail.harga;
    setdataAddtoCart({ ...dataAddtoCart, [name]: parseInt(value), totalHarga });
  };
  const addtoCartClick = () => {
    Axios.post(`${APIURL}product/posttransaction`, { dataAddtoCart }) // dataAddtoCart dipakein {} biar waktu di controllersnya manngilnya jadi req.body.dataAddtoCart.nama variable, kalo gapake {} di backend manggilnya langsung req.body.nama variable
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${dataDetail.namaProduk} has been added to your cart`,
          showConfirmButton: false,
          timer: 2500,
        });
        dispatch(CartGetProduct());
      })
      .catch((err) => {
      })
      .then((res2) => {
        setRedirectToCatalog2(true);
      });
  };

  if (RedirectToCatalog2) {
    return <Redirect to={"/catalogs2"} />;
  }
  return (
    <div className="row container-viewdetail2">
      <div className="col-md-1" />
      <div className="col-md-6" >

      <div className="container-carousel">
        <Carousel infiniteLoop useKeyboardArrows autoPlay stopOnHover>
          <div>
            <img src={APIURLimage + dataDetail.gambar} alt="1" />
          </div>
          <div>
            <img src={APIURLimage + dataDetail.gambar} alt="2" />
          </div>
          <div>
            <img src={APIURLimage + dataDetail.gambar} alt="3" />
          </div>
        </Carousel>
      </div>
        {/* <div className="row">
          <div className="col-md-6 image-viewdetail2">
            <img className='zoomImg' src={APIURLimage + dataDetail.gambar} />
          </div>
          <div className="col-md-6 image-viewdetail2">
            <img className='zoomImg' src={APIURLimage + dataDetail.gambar} />
          </div>
          <div className="col-md-6 image-viewdetail2">
            <img className='zoomImg' src={APIURLimage + dataDetail.gambar} />
          </div>
          <div className="col-md-6 image-viewdetail2">
            <img className='zoomImg' src={APIURLimage + dataDetail.gambar} />
          </div>
        </div> */}
      </div>
      <div className="col-md-4 viewdetail-cont">
        <div className="viewdetail-desc">
          <h5>{dataDetail.category}</h5>
          <h2>{dataDetail.namaProduk}</h2>
          <div className="harga-detail" style={{ marginTop: "20px" }}>
            <NumberFormat value={dataDetail.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp. "} />
          </div>
          <div style={{ marginBottom: "30px", marginTop: "20px" }}>
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
            {dataAddtoCart.size !== undefined && roleRedux === 0 ? (
              <div className={classes.root2}>
                <Alert variant="filled" severity="warning">
                  You Need to Login First
                </Alert>
              </div>
            ) : null}
          </div>
          <div>
            <p>Description</p>
            <p style={{ textAlign: "justify",paddingRight:'40px' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatum molestias earum modi exercitationem pariatur fuga consectetur dicta magnam quidem illo praesentium repellat
              doloremque harum, debitis nulla quis. Doloremque, ea!
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-1" />
    </div>
  );
}

export default ViewDetail2;
