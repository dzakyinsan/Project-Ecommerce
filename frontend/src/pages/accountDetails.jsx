import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { APIURL, APIURLimage } from "../helper/ApiUrl";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { PutUserDetail, GetUserDetails, PutChangePass } from "./../redux/Actions";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "max-content",
      // height: "40px",
      backgroundColor: "black",
      color: "white",
      // fontSize: "15px",
      marginTop: "10px"
    }
  },
  root2: {
    width: "25%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function OrderComplete() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // ============================ GLOBAL STATE =============================
  const username = useSelector(state => state.auth.username);
  const idUser = useSelector(state => state.auth.id);
  const dataUserDetailRedux = useSelector(state => state.AccountDetailsReducer.dataUserDetailRedux);
  const messageRedux = useSelector(state => state.AccountDetailsReducer.message);
  const messagePassRedux = useSelector(state => state.AccountDetailsReducer.messagePass);
  // ============================ LOCAL STATE =============================
  const [dataPostDetails, setdataPostDetails] = useState([]);
  const [dataNewPass, setdataNewPass] = useState([]);

  useEffect(() => {
    const { namaLengkap, alamat, kota, provinsi, telepon } = dataUserDetailRedux;
    setdataPostDetails({ ...dataPostDetails, namaLengkap: namaLengkap, alamat: alamat, kota: kota, provinsi: provinsi, telepon: telepon });
  }, [dataUserDetailRedux]);

  const onChangeUserDetails = e => {
    const { name, value } = e.target;
    setdataPostDetails({ ...dataPostDetails, [name]: value });
  };
  const SaveUserDetails = () => {
    dispatch(PutUserDetail(dataPostDetails));
    // window.location.reload();
  };
  const onChangePass = e => {
    const { name, value } = e.target;
    setdataNewPass({ ...dataNewPass, [name]: value });
  };
  const SaveChangePass = () => {
    dispatch(PutChangePass(dataNewPass));
  };


  return (
    <div className="cart-page" style={{ paddingTop: "80px" }}>
      <div className="row">
        <div className="col-md-3">
          <div className="left-box-apaya-bingung">
            <div style={{ display: "flex" }}>
              <span style={{ fontSize: "50px", marginLeft: "10px", color: "grey" }}>
                <i className="fas fa-user-circle"></i>
              </span>
              <div style={{ marginTop: "13px", marginLeft: "20px" }}>
                <h4>{username}</h4>
                <h6 style={{ color: "grey" }}> #FTS{idUser}</h6>
              </div>
            </div>
            <div className="dashboard">DASHBOARD</div>
            <hr />
            <div className="title-account-detail">
              <Link to={"/accountDetails"} style={{ color: "#c48236" }}>
                <div>ACCOUNT DETAILS</div>
              </Link>
              <hr />
              <Link to={"/waitingAdminApproval"} style={{ color: "#b7b7b7" }}>
                <div>WAITING ADMIN APPROVAL</div>
              </Link>
              <hr />
              <Link to={"/completePurchased"} style={{ color: "#b7b7b7" }}>
                <div>COMPLETE TRANSACTION</div>
              </Link>
              <hr />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="orderComplete-title">
            <h4>
              <center>Your Account</center>
            </h4>
            <h6>
              <center>Account Details</center>
            </h6>
          </div>
          <div className="container-accountdetails">
            <div className="form-group ">
              <label className='label-AD' for="inputNamaLengkap">
                Nama Lengkap &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="namaLengkap"
                className="form-control"
                placeholder="example: John Michael bubblegum"
                defaultValue={dataUserDetailRedux.namaLengkap}
                onChange={onChangeUserDetails}
              />
            </div>
            <div className="form-group ">
              <label className='label-AD' for="inputAlamatLengkap">
                Alamat &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="alamat" className="form-control" placeholder="example: jl.Kunai barat no.6" defaultValue={dataUserDetailRedux.alamat} onChange={onChangeUserDetails} />
            </div>
            <div className="form-group  row">
              <div className="col-md-6">
                <label className='label-AD' for="inputKota">
                  Kota &nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" name="kota" className="form-control" placeholder="example: Konoha" defaultValue={dataUserDetailRedux.kota} onChange={onChangeUserDetails} />
              </div>
              <div className="col-md-6">
                <label className='label-AD' for="inputProvinsi">
                  Provinsi &nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" name="provinsi" className="form-control" placeholder="example: Gakure" defaultValue={dataUserDetailRedux.provinsi} onChange={onChangeUserDetails} />
              </div>
            </div>
            <div className="form-group ">
              <label className='label-AD' for="inputNomorHp">
                Telepon/WA &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input type="number" name="telepon" className="form-control" placeholder="example: 14045" defaultValue={dataUserDetailRedux.telepon} onChange={onChangeUserDetails} />
            </div>
            <div className={classes.root}>
              <Button variant="contained" onClick={SaveUserDetails}>
                SAVE CHANGES
              </Button>
            </div>
            {messageRedux.length > 0 ? (
              <div className={classes.root2}>
                <Alert variant="filled" severity="error">
                  {messageRedux}
                </Alert>
              </div>
            ) : null}
          </div>
          <div className="container-changepass">
            <div style={{ fontWeight: "bold" }}>PASSWORD CHANGE </div>
            <hr />
            <div className="form-group ">
              <label className='label-AD' for="inputCurretPassword">
                Current Password &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input type="password" name="passwordLama" onChange={onChangePass} className="form-control" />
            </div>
            <div className="form-group ">
              <label className='label-AD' for="inputNewPassword">
                New Password &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input type="password" name="passwordBaru" onChange={onChangePass} className="form-control" />
            </div>
            <div className="form-group ">
              <label className='label-AD' for="inputCofirmNewPass">
                Confirm New Password &nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="password" onChange={onChangePass} className="form-control" />
            </div>
            {dataNewPass.passwordLama !== undefined && dataNewPass.passwordBaru !== undefined && dataNewPass.password !== undefined ? (
              <div className={classes.root}>
                <Button variant="contained" onClick={SaveChangePass}>
                  SAVE CHANGES
                </Button>
                {messagePassRedux.length > 0 ? (
                  <div className={classes.root2}>
                    <Alert variant="filled" severity="error">
                      {messagePassRedux}
                    </Alert>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={classes.root}>
                <Button variant="contained" onClick={SaveChangePass} disabled>
                  SAVE CHANGES
                </Button>
                {messagePassRedux.length > 0 ? (
                  <div className={classes.root2}>
                    <Alert variant="filled" severity="error">
                      {messagePassRedux}
                    </Alert>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-1" />
      </div>
    </div>
  );
}
export default OrderComplete;
