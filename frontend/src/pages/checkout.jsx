import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostCheckoutProduct, CheckOutGetProduct } from "./../redux/Actions";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
import { Redirect } from "react-router-dom";
import { CustomInput } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "max-content",
      height: "40px",
      backgroundColor: "black",
      color: "white",
      fontSize: "15px",
      marginTop: "30px"
    }
  }
}));

function CheckOut() {
  const classes = useStyles();

  // ================================== Global state ==========================
  const dataCheckoutRedux = useSelector(state => state.CheckoutReducer.dataCheckoutRedux);
  const dataTotalHarga = useSelector(state => state.CheckoutReducer.dataTotalHarga);
  const messageRedux = useSelector(state => state.CheckoutReducer.message);
  const loading = useSelector(state => state.CheckoutReducer.loadingData);
  const goToCompletePage = useSelector(state => state.CheckoutReducer.goToCompletePage);
  const dataUserDetailRedux = useSelector(state => state.AccountDetailsReducer.dataUserDetailRedux);
  // ================================== Local state ==========================
  const [PostCheckout, setPostCheckout] = useState({});
  const [AddImageFile, setAddImageFile] = useState({
    imageName: "No File Chosen",
    imageFile: undefined
  });
  // ==================================set dispatch ==========================
  const dispatch = useDispatch();
  // ==================================component didmount ==========================
  useEffect(() => {
    dispatch(CheckOutGetProduct());
  }, []);

  useEffect(() => {
    var userid = localStorage.getItem("userId");
    const { namaLengkap, alamat, kota, provinsi, telepon } = dataUserDetailRedux;
    setPostCheckout({ ...PostCheckout, nama: namaLengkap, alamat: alamat, kota: kota, provinsi: provinsi, telepon: telepon, userId: userid, status: "oncheck" });
  }, [dataUserDetailRedux]);

  const onAddImageFile = e => {
    var file = e.target.files[0];
    if (file) {
      setAddImageFile({ ...AddImageFile, imageName: file.name, imageFile: file });
    } else {
      setAddImageFile({ ...AddImageFile, imageName: "No File Chosen", imageFile: undefined });
    }
  };

  const onChangeCheckout = e => {
    const { name, value } = e.target;
    setPostCheckout({ ...PostCheckout, [name]: value, totalHarga: dataTotalHarga });
    // setPostCheckout({...PostCheckout,totalHarga:dataTotalHarga})
  };

  const FinishCheckout = () => {
   dispatch(PostCheckoutProduct(PostCheckout, AddImageFile));
   dispatch(CheckOutGetProduct());
    // window.location.reload();
  };

  const messageErrorNotif = () => {
    if (messageRedux) {
      return <h4 style={{ color: "red" }}> {messageRedux}</h4>;
    }
  };

  const renderCheckout = () => {
    return dataCheckoutRedux.map((val, index) => {
      return (
        <div>
          <div className="yourorder-checkout">
            <td>
              {val.namaProduk} x {val.jumlah}
            </td>
            <td style={{ marginLeft: "auto" }}>
              <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
            </td>
          </div>
          <hr />
        </div>
      );
    });
  };


  if (loading) {
    return (
      <div style={{ minHeight: "1000px", paddingTop: "300px", paddingLeft: "700px" }}>
        <h1 style={{ fontSize: "100px", color: "#c48236" }}>FOOTBOOTS2020</h1>
        <h1 style={{ fontSize: "80px", marginLeft: "250px" }}>loading...</h1>
      </div>
    );
  }

  if (dataCheckoutRedux === undefined || dataCheckoutRedux.length === 0) {
    return (
      <div className="checkout-page" style={{ paddingTop: "100px", textAlign: "center" }}>
      <div className="checkout-title">
      <h3>
        <center>Checkout</center>
      </h3>
    </div>
    <img src='https://store.topekazoo.org/resources/images/common/empty-cart.png'/>
      <h1 style={{ marginTop:'50px',fontSize: "30px" }}>No Products Checked out</h1>
      <div className="checkorder-button">
        <Link to={"/waitingAdminApproval"}>
          <Button variant="contained">Check you order</Button>
        </Link>
      </div>
      
    </div>
    );
  }
  if (goToCompletePage ) {
    return <Redirect to={"/waitingAdminApproval"} />;
  }

  return (
    <div className="checkout-page" style={{ paddingTop: "80px" }}>
      <div className="checkout-title">
        <h3>
          <center>Checkout</center>
        </h3>
      </div>
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-4 mt-3 checkout-left-box">
          <div className="detailPembayaran-title">BILING DETAILS</div>

          <div className="form-group">
            <label for="inputNamaLengkap">
              Nama Lengkap &nbsp;<span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" name="nama" className="form-control" placeholder="Ex: Uzumaki wibuto" defaultValue={PostCheckout.nama} onChange={onChangeCheckout} />
          </div>
          <div className="form-group">
            <label for="inputAlamatLengkap">
              Alamat Pengiriman &nbsp;<span style={{ color: "red" }}>*</span>
            </label>
            <input type="text" name="alamat" className="form-control" placeholder="Ex: Jl.Ninjaku no.7 " defaultValue={PostCheckout.alamat} onChange={onChangeCheckout} />
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label for="inputProvinsi">
                Provinsi &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="provinsi" className="form-control" placeholder="Ex: Saskeh Barat" defaultValue={PostCheckout.provinsi} onChange={onChangeCheckout} />
            </div>
            <div className="col-md-6">
              <label for="inputKota">
                Kota &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="kota" className="form-control" placeholder="Ex: Sunagakure" defaultValue={PostCheckout.kota} onChange={onChangeCheckout} />
            </div>
          </div>
          <div className="form-group">
            <label for="inputNomorHp">
              Telepon/WA &nbsp;<span style={{ color: "red" }}>*</span>
            </label>
            <input type="number" name="telepon" className="form-control" placeholder="Ex: 0192837465" defaultValue={PostCheckout.telepon} onChange={onChangeCheckout} />
          </div>
          <div className="form-group">
            <label for="catatan">Catatan(optional)</label>
            <textarea className="form-control" name="catatan" rows="3" placeholder="Catatan..." onChange={onChangeCheckout}></textarea>
          </div>
          <div className="mt-5">{messageErrorNotif()}</div>
          {/* =============================================================== payment box ===================== */}
          {PostCheckout.nama !== undefined &&
          PostCheckout.alamat !== undefined &&
          PostCheckout.provinsi !== undefined &&
          PostCheckout.kota !== undefined &&
          PostCheckout.telepon !== undefined &&
          PostCheckout.shipping !== undefined &&
          PostCheckout.payment === "Bank Mandiri Bni" ? (
            <Fade bottom>
              <div className="payment-box">
                <div className="checkout-right-box-dalam">
                  <div>
                    <div className="detailPembayaran-title">Detail Pembayaran</div>
                    <div className="nama-bank">
                      <td>Nama Bank : &nbsp;</td>
                      <th>Bank Mandiri / Bank BNI </th>
                    </div>
                    <div className="nama-bank">
                      <td>Nama Pemilik : &nbsp; </td>
                      <th>M. dzaky Insan </th>
                    </div>
                    <div className="nama-bank">
                      <td>Nomor Rekening : &nbsp; </td>
                      <th>0221133144 </th>
                    </div>
                  </div>
                  <div>
                    <div className="detailPembayaran-title" style={{ marginTop: "15px" }}>
                      Order Detail
                    </div>
                    <div className="yourorder-checkout">
                      <td>Shipping</td>
                      <th style={{ marginLeft: "auto" }}>{PostCheckout.shipping}</th>
                    </div>
                    <hr />
                    <div className="yourorder-checkout">
                      <td>Payment Method</td>
                      <th style={{ marginLeft: "auto" }}>{PostCheckout.payment}</th>
                    </div>
                    <hr />
                  </div>
                  <div>
                    <div className="yourorder-checkout">
                      <td>Subtotal</td>
                      <th style={{ marginLeft: "auto" }}>
                        <NumberFormat value={dataTotalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
                      </th>
                    </div>
                    <hr />
                    <div className="detailPembayaran-title">Bukti Pembayaran</div>
                    {AddImageFile.imageFile !== undefined ? (
                      <div className="bukti-pembayaran-berhasil">
                        <CustomInput type="file" label={AddImageFile.imageName} id="addImagePayment" className="form-control" onChange={onAddImageFile} />
                      </div>
                    ) : (
                      <div className="bukti-pembayaran-gagal">
                        <CustomInput type="file" label={AddImageFile.imageName} id="addImagePayment" className="form-control" onChange={onAddImageFile} />
                      </div>
                    )}{" "}
                  </div>
                  {AddImageFile.imageFile !== undefined ? (
                    <div className={classes.root}>
                      <Button variant="contained" onClick={FinishCheckout}>
                        Selesaikan Belanja
                      </Button>
                    </div>
                  ) : (
                    <div className={classes.root}>
                      <Button variant="contained" onClick={FinishCheckout} disabled>
                        Selesaikan Belanja
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Fade>
          ) : null}
          {/* ========================================= */}
          {PostCheckout.nama !== undefined &&
          PostCheckout.alamat !== undefined &&
          PostCheckout.provinsi !== undefined &&
          PostCheckout.kota !== undefined &&
          PostCheckout.telepon !== undefined &&
          PostCheckout.shipping !== undefined &&
          PostCheckout.payment === "Convenience Store" ? (
            <div className="payment-box">
              <div className="checkout-right-box-dalam">
                <div>
                  <div className="detailPembayaran-title">Detail Pembayaran</div>
                  <div className="nama-bank">
                    <td>Convenience Store :&nbsp; </td>
                    <th>Alfamart / Indomaret </th>
                  </div>
                  <div className="nama-bank">
                    <td>Nama Tujuan :&nbsp; </td>
                    <th>FootBoots2020 </th>
                  </div>
                  <div className="nama-bank">
                    <td>Nomor Rekening :&nbsp; </td>
                    <th>0221133144 </th>
                  </div>
                </div>
                <div>
                  <div className="detailPembayaran-title" style={{ marginTop: "15px" }}>
                    Order Detail
                  </div>
                  <div className="yourorder-checkout">
                    <td>Shipping</td>
                    <th style={{ marginLeft: "auto" }}>{PostCheckout.shipping}</th>
                  </div>
                  <hr />
                  <div className="yourorder-checkout">
                    <td>Payment Method</td>
                    <th style={{ marginLeft: "auto" }}>{PostCheckout.payment}</th>
                  </div>
                  <hr />
                </div>
                <div>
                  <div className="yourorder-checkout">
                    <td>Subtotal</td>
                    <th style={{ marginLeft: "auto" }}>
                      <NumberFormat value={dataTotalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
                    </th>
                  </div>
                  <hr />
                  <div className="detailPembayaran-title">Bukti Pembayaran</div>
                  <div className="bukti-pembayaran">
                    <div className="bukti-pembayaran">
                      {AddImageFile.imageFile !== undefined ? (
                        <div className="bukti-pembayaran-berhasil">
                          <CustomInput type="file" label={AddImageFile.imageName} id="addImagePayment" className="form-control" onChange={onAddImageFile} />
                        </div>
                      ) : (
                        <div className="bukti-pembayaran-gagal">
                          <CustomInput type="file" label={AddImageFile.imageName} id="addImagePayment" className="form-control" onChange={onAddImageFile} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {AddImageFile.imageFile !== undefined ? (
                  <div className={classes.root}>
                    <Button variant="contained" onClick={FinishCheckout}>
                      Selesaikan Belanja
                    </Button>
                  </div>
                ) : (
                  <div className={classes.root}>
                    <Button variant="contained" onClick={FinishCheckout} disabled>
                      Selesaikan Belanja
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
        {/* =================================================================== your order ================== */}
        <div className="col-md-4 checkout-right-box">
          <div className="checkout-right-box-dalam">
            <div className="detailPembayaran-title">YOUR ORDER</div>
            <div className="yourorder-checkout">
              <th>PRODUCT</th>
              <th style={{ marginLeft: "auto" }}>TOTAL</th>
            </div>
            <hr />
            {renderCheckout()}
            <div className="yourorder-checkout">
              <th>SubTotal</th>
              <th style={{ marginLeft: "auto" }}>
                <NumberFormat value={dataTotalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
              </th>
            </div>
            <hr />
            <div className="shipping">
              <th>Shipping</th>
            </div>
            <div className="shipping">
              <input type="radio" name="shipping" value="Gojek" onChange={onChangeCheckout} /> Gojek
            </div>
            <div className="shipping">
              <input type="radio" name="shipping" value="Pengambilan Pesanan Di Toko" onChange={onChangeCheckout} /> Pengambilan Pesanan Di Toko
            </div>
            <div className="shipping">
              <input type="radio" name="shipping" value="JNE / JNT / SICEPAT" onChange={onChangeCheckout} /> JNE / JNT / SICEPAT
            </div>
            <hr />
            <div className="shipping">
              <th>payment</th>
            </div>
            <input type="radio" className="shipping" name="payment" value="Bank Mandiri Bni" onChange={onChangeCheckout} /> Bank Mandiri / Bank BNI
            <div className="shipping">
              <img src="https://upload.wikimedia.org/wikipedia/id/thumb/f/fa/Bank_Mandiri_logo.svg/1280px-Bank_Mandiri_logo.svg.png" width="300px" height="60px" />
              <img src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png" width="300px" height="50px" />
            </div>
            <hr />
            <input type="radio" className="shipping" name="payment" value="Convenience Store" onChange={onChangeCheckout} />
            Convenience Store
            <div className="shipping">
              <img src="https://www.reclays.id/wp-content/plugins/nicepay_cvs/alfa-indo.png" width="500px" height="80px" />
            </div>
            <hr />
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  );
}
export default CheckOut;
