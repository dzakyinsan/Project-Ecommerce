import React, { useState } from "react";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link, Redirect } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { MDBModal, MDBModalBody, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { onUserRegister, onUserlogin, onUserlogOut } from "./../redux/Actions";
import { USER_MODAL_OPEN, USER_MODAL_CLOSE } from "../redux/Actions/types";
import Alert from "@material-ui/lab/Alert";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import Button from "@material-ui/core/Button";
import NumberFormat from "react-number-format";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      padding: "10px 30px 10px 30px",
      backgroundColor: "#c48236",
      color: "white",
      fontSize: "10px",
    },
  },
}));
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const Header = (props) => {
  const classes = useStyles();

  const registerRedux = useSelector((state) => state.auth.register);
  const errorRedux = useSelector((state) => state.auth.error);
  const errorLoginRedux = useSelector((state) => state.auth.errorlogin);
  const loginOk = useSelector((state) => state.auth.login);
  const Modal = useSelector((state) => state.auth.modalOpen);
  const usernameRedux = useSelector((state) => state.auth.username);
  const dataCartRedux = useSelector((state) => state.CartReducer.dataCartRedux);
  const dataUserRedux = useSelector((state) => state.auth);
  const roleId = useSelector((state) => state.auth.roleId);
  const dataPaymentReq = useSelector((state) => state.PaymentReqReducer.dataPaymentRequest);

  console.log("dataUserRedux", dataUserRedux);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const [dataLogin, setDataLogin] = useState({
    usernameLogin: "",
    passwordLogin: "",
  });
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    email: "",
    confirmpass: "",
  });
  //handle input login
  const loginHandle = (e) => {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };
  //handle input regis
  const registerHandle = (e) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };
  const renderNotifRegis = () => {
    if (errorRedux.length > 0) {
      return (
        <Bounce>
          <Alert severity="error">{errorRedux}</Alert>
        </Bounce>
      );
    } else if (registerRedux) {
      return (
        <Bounce>
          <Alert severity="success">Register Success, Please Login</Alert>
        </Bounce>
      );
    } else {
      return <div style={{ height: "48px" }}></div>;
    }
  };
  const renderNotifLogin = () => {
    if (errorLoginRedux.length > 0) {
      return (
        <Bounce>
          <Alert severity="error">{errorLoginRedux}</Alert>
        </Bounce>
      );
    } else {
      return <div style={{ height: "48px" }}></div>;
    }
  };
  const renderCartHeader = () => {
    if (dataCartRedux.length === 0) {
      return (
        <div>
          <img src="https://www.wingsproperty.com/public/front/images/empty-state-cart.png" width="250px" height="150px" />
        </div>
      );
    }
    return dataCartRedux.map((val, index) => {
      return (
        <div className="isi-dropdown-cart" style={{ display: "flex" }}>
          <div>
            <img src={APIURLimage + val.gambar} alt={index} width="70px" height="70px" />
          </div>
          <div className="namadicart" style={{ minWidth: "150px" }}>
            {val.namaProduk}
          </div>
          <div className="namadicart">x &nbsp;{val.jumlah}</div>
          <div className="namadicart" style={{ color: "#c48236" }}>
            <NumberFormat value={val.totalHarga} displayType={"text"} thousandSeparator={true} prefix={"Rp."} />
          </div>
        </div>
      );
    });
  };

  //ini var yg dikirim ke redux
  var { username, password, confirmpass, email } = dataUser;

  return (
    <div>
      <MDBContainer>
        <MDBModal isOpen={Modal} toggle={() => dispatch({ type: USER_MODAL_CLOSE })} size="lg" centered>
          <MDBModalBody>
            <MDBContainer>
              <MDBRow>
                {/* =========================== modal login ========================== */}
                <MDBCol md="5">
                  <div className="modal-loginregis">
                    {/* nanti divnya ganti jadi form biar waktu click langsung refresh */}
                    <p className="h5 text-center mb-4">LOGIN</p>
                    <label htmlFor="username" className="black-text ">
                      Username<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" name="usernameLogin" className="form-control" onChange={loginHandle} />
                    <br />
                    <label htmlFor="password" className="black-text">
                      Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="password" name="passwordLogin" className="form-control" onChange={loginHandle} />

                    <div className="mt-3">{renderNotifLogin()}</div>
                    <div className="text-center" style={{ marginTop: "160px" }}>
                      <div className={classes.root}>
                        <Button variant="contained" onClick={() => dispatch(onUserlogin(dataLogin.usernameLogin, dataLogin.passwordLogin))}>
                          Login
                        </Button>
                      </div>
                    </div>
                  </div>
                </MDBCol>
                <MDBCol md="2">
                  <div className="devider" />
                </MDBCol>
                {/* =========================== modal register ================== */}
                <MDBCol md="5">
                  <div className="modal-loginregis" style={{ marginRight: "30px" }}>
                    <p className="h5 text-center mb-4 ">REGISTER</p>
                    <label htmlFor="username" className="black-text">
                      Username<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" name="username" className="form-control" onChange={registerHandle} />

                    <br />
                    <label htmlFor="email" className="black-text">
                      Your email<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="email" name="email" className="form-control" onChange={registerHandle} />
                    <br />
                    <label htmlFor="password" className="black-text">
                      password<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="password" name="password" className="form-control" onChange={registerHandle} />
                    <br />
                    <label htmlFor="confirmpass" className="black-text">
                      Confirm Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="password" name="confirmpass" className="form-control" onChange={registerHandle} />
                    <div className="mt-3">{renderNotifRegis()}</div>
                    <div className="text-center">
                      <div className={classes.root}>
                        <Button variant="contained" onClick={() => dispatch(onUserRegister(username, email, confirmpass, password))}>
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
      {/* ======================================= modal end ==========================================
      == */}

      <Navbar className="container-header" expand="md" fixed="top">
        <NavbarToggler onClick={toggle} />
        <Collapse className="jumbotron-header mx-5" isOpen={isOpen} navbar>
          {/* ========================================= navbar logo header ======================
          === */}
          <NavbarBrand className="logo-header">
            <Fade left cascade>
              <Link to={"/"} style={{ color: "white", fontSize: "27px" }}>
                FootBoots 2020
                {/* font-family: "Baloo Paaji 2", cursive; */}
              </Link>
            </Fade>
          </NavbarBrand>

          <Fade cascade>
            <Nav className="the-menu">
              <Link to={"/catalogs3"}>
                <div className="the-menu-a">FOOTBALL SHOES</div>
              </Link>
              <Link to={"/catalogs2"}>
                <div className="the-menu-a">BASKETBALL SHOES</div>
              </Link>
              <Link to={"/catalogs1"}>
                <div className="the-menu-a">RUNNING SHOES</div>
              </Link>
            </Nav>
          </Fade>

          <Nav className="loginlogo-header" navbar>
            {loginOk === true ? (
              <Fade right>
                <Link to={"/"} style={{ color: "white" }}>
                  <div className="login-regis" onClick={() => dispatch(onUserlogOut())}>
                    <div className="text-login-regis">
                      <LightTooltip title="Logout" TransitionComponent={Zoom}>
                        <LockOutlinedIcon style={{ fontSize: "25px" }} />
                      </LightTooltip>
                    </div>
                  </div>
                </Link>
              </Fade>
            ) : (
              <Fade right>
                <div className="login-regis-b">
                  <div className="text-login-regis-c">
                    <LightTooltip title="Contact Us" TransitionComponent={Zoom}>
                      <LocalPhoneOutlinedIcon style={{ fontSize: "25px" }} />
                    </LightTooltip>
                  </div>
                  <div className="text-login-regis-b" onClick={() => dispatch({ type: USER_MODAL_OPEN })}>
                    <LightTooltip title="Login" TransitionComponent={Zoom}>
                      <LockOpenOutlinedIcon style={{ fontSize: "25px" }} />
                    </LightTooltip>
                  </div>
                </div>
              </Fade>
            )}
            {loginOk === true && roleId === 2 ? (
              <Fade right>
                <Link to={"/cartPage"} style={{ color: "white" }}>
                  <div className="row cart">
                    <Badge badgeContent={dataCartRedux.length} color="secondary">
                      <ShoppingCartOutlinedIcon style={{ fontSize: "25px", marginLeft: "10px" }} />
                    </Badge>
                    <Fade>
                      <div className="arrowup" />
                      <div className="parent-dropdown-cart">
                        {renderCartHeader()}
                        {dataCartRedux.length !== 0 ? (
                          <Link to={"/cartPage"} style={{ color: "white" }}>
                            <Button variant="contained">Show Cart</Button>
                          </Link>
                        ) : (
                          <div className="cart-noproduk">No Product : (</div>
                        )}
                      </div>
                    </Fade>
                  </div>
                </Link>
              </Fade>
            ) : null}
            {loginOk === true && roleId === 1 ? (
              <Fade right>
                <Redirect to={"/adminpage"} />
                <Link to={"/adminpage"} style={{ color: "white" }}>
                  <div className="manage-product">
                    <LightTooltip title="Manage Admin" TransitionComponent={Zoom}>
                      <Badge badgeContent={dataPaymentReq.length} color="primary">
                        <NotificationsActiveOutlinedIcon style={{ fontSize: "25px" }} />
                      </Badge>
                    </LightTooltip>
                  </div>
                </Link>
              </Fade>
            ) : null}

            {loginOk === true && roleId === 2 ? (
              <Fade right>
                <Link to={"/waitingAdminApproval"}>
                  <LightTooltip title="Your Account" TransitionComponent={Zoom}>
                    <div className="username-login">
                      <i className="far fa-user-circle" style={{ fontSize: "20px" }}>
                        {" "}
                        &nbsp;
                      </i>
                      <a>Hello , {usernameRedux}</a>
                    </div>
                  </LightTooltip>
                </Link>
              </Fade>
            ) : null}
            {loginOk === true && roleId === 1 ? (
              <Fade right>
                <div className="username-login-admin">
                  <a>Hello , {usernameRedux}</a>
                </div>
              </Fade>
            ) : null}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
