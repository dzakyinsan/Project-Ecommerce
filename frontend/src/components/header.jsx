import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MDBModal, MDBModalBody, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { onUserRegister, onUserlogin, onUserlogOut } from "./../redux/Actions";
import { USER_MODAL_OPEN, USER_MODAL_CLOSE } from "../redux/Actions/types";
import Alert from "@material-ui/lab/Alert";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const Header = props => {
  // const classes = useStyles();

  const registerRedux = useSelector(state => state.auth.register);
  const errorRedux = useSelector(state => state.auth.error);
  const errorLoginRedux = useSelector(state => state.auth.errorlogin);
  // const statusRedux = useSelector(state => state.auth.status);
  const loginOk = useSelector(state => state.auth.login);
  const Modal = useSelector(state => state.auth.modalOpen);
  const usernameRedux = useSelector(state => state.auth.username);
  const dataCartRedux = useSelector(state => state.CartReducer.dataCartRedux);
  const dataUserRedux = useSelector(state => state.auth);
  const roleId = useSelector(state => state.auth.roleId);
  console.log("dataUserRedux", dataUserRedux);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const [dataLogin, setDataLogin] = useState({
    usernameLogin: "",
    passwordLogin: ""
  });
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    email: "",
    confirmpass: ""
  });

  //handle input login
  const loginHandle = e => {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  //handle input regis
  const registerHandle = e => {
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
                    <p className="h4 text-center mb-4">LOGIN</p>
                    <label htmlFor="username" className="black-text">
                      Username<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" name="usernameLogin" className="form-control" onChange={loginHandle} />
                    <br />
                    <label htmlFor="password" className="black-text">
                      Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="password" name="passwordLogin" className="form-control" onChange={loginHandle} />
                    {/* <p className="font-small black-text d-flex justify-content-start mt-3">
                      Forgot
                      <a href="#!" className="dark-grey-text font-weight-bold ml-1">
                        Password?
                      </a>
                    </p> */}
                    <div className="mt-3">{renderNotifLogin()}</div>
                    <div className="text-center" style={{ marginTop: "130px" }}>
                      <button className="btn btn-light" style={{ backgroundColor: "#c48236" }} onClick={() => dispatch(onUserlogin(dataLogin.usernameLogin, dataLogin.passwordLogin))}>
                        Login
                      </button>
                      {/* <MDBBtn color="unique" type="submit">
                        Login
                      </MDBBtn> */}
                    </div>
                  </div>
                </MDBCol>
                <MDBCol md="2">
                  <div className="devider" />
                </MDBCol>
                {/* =========================== modal register ================== */}
                <MDBCol md="5">
                  <div className="modal-loginregis">
                    <p className="h4 text-center mb-4">REGISTER</p>
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
                      <button className="btn btn-light" onClick={() => dispatch(onUserRegister(username, email, confirmpass, password))}>
                        Register
                      </button>
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
            <Fade left>
              <Link to={"/"} style={{ color: "white" }}>
                FootBoots 2020
              </Link>
            </Fade>
          </NavbarBrand>

          <Nav className="loginlogo-header" navbar>
            {loginOk === true && roleId === 2 ? (
              <Fade right>
                <Link to={"/waitingAdminApproval"} style={{ color: "white" }}>
                  <div className="username-login" style={{ marginLeft: "800px" }}>
                    <a>Hello,{usernameRedux}</a>
                  </div>
                </Link>
              </Fade>
            ) : null}
            {loginOk === true && roleId === 1 ? (
              <Fade right>
                <div className="username-login-admin" style={{ marginLeft: "600px" }}>
                  <a>Hello,{usernameRedux}</a>
                </div>
              </Fade>
            ) : null}
            {loginOk === true && roleId === 2 ? (
              <Fade right>
                <Link to={"/cartPage"} style={{ color: "white" }}>
                  <div className="row cart" style={{ marginLeft: "50px" }}>
                    <div className="col-md-8 isi-cart">Cart</div>
                    <div className="col-md-4 isi-cart">{dataCartRedux.length}</div>
                  </div>
                </Link>
              </Fade>
            ) : null}
            {loginOk === true && roleId === 1 ? (
              <Fade right>
                <Link to={"/adminpage"} style={{ color: "white" }}>
                  <div className="manage-product" style={{ marginLeft: "50px" }}>
                    <div className=" isi-manage-product">Manage Porduct</div>
                  </div>
                </Link>
              </Fade>
            ) : null}
            {loginOk === true ? (
              <Fade right>
                <Link to={"/"} style={{ color: "white" }}>
                  <div className="login-regis">
                    <div className="text-login-regis" onClick={() => dispatch(onUserlogOut())}>
                      <b>Logout</b> <ChevronRightIcon fontSize="large" style={{ marginLeft: "50px" }} />
                    </div>
                  </div>
                </Link>
              </Fade>
            ) : (
              <Fade right>
                <div className="login-regis" style={{ marginLeft: "1150px" }}>
                  <div className="text-login-regis" onClick={() => dispatch({ type: USER_MODAL_OPEN })}>
                    <b>Join Now</b> <KeyboardArrowDownIcon fontSize="large" style={{ marginLeft: "50px", marginBottom: "10px" }} />
                  </div>
                </div>
              </Fade>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
