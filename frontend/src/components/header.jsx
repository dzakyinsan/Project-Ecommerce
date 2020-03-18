import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";
// import PersonIcon from "@material-ui/icons/Person";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import Badge from "@material-ui/core/Badge";
// import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { withStyles, makeStyles, fade } from "@material-ui/core/styles";
// import { Tooltip, Zoom } from "@material-ui/core";
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
  const statusRedux = useSelector(state => state.auth.status);
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
    //  else if (statusRedux.length > 0) {
    //   return <p className="alert alert-success">{statusRedux}</p>;
    // }
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
                    <p className="font-small black-text d-flex justify-content-start mt-3">
                      Forgot
                      <a href="#!" className="dark-grey-text font-weight-bold ml-1">
                        Password?
                      </a>
                    </p>
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

          {/* ========================================= navbar pilihan header ==========================
          == */}

          {/* <div className="menu-container">
            <!-- ============= solution ================ -->
            <div className="menu">
              Solution
              <div className="dropdown-kiri">
                <div className="isi-dropdown">Publishers</div>
                <br />
                <div className="isi-dropdown">Broadcasters</div>
                <br />
                <div className="isi-dropdown">Developers</div>
                <br />
                <div className="isi-dropdown">Marketers</div>
                <br />
                <div className="isi-dropdown">Partners</div>
                <br />
              </div>
            </div>
            <!-=========== Developers ============= -->
            <div className="menu">
              Developers
              <div className="dropdown-kiri">
                <div className="isi-dropdown">Web Player</div>
                <br />
                <div className="isi-dropdown">Maagement</div>
                <br />
                <div className="isi-dropdown">Android SDK</div>
                <br />
                <div className="isi-dropdown">iOS SDK</div>
                <br />
              </div>
            </div>
            <!-- ======== Company ========== -->
            <div className="menu">
              Company
              <div className="dropdown-kiri">
                <div className="isi-dropdown">About us</div>
                <br />
                <div className="isi-dropdown">Careers</div>
                <br />
                <div className="isi-dropdown">News Room</div>
                <br />
                <div className="isi-dropdown">Contact Us</div>
                <br />
              </div>
            </div>
            <!-- ======== Resources ========================== -->
            <div className="menu">
              Resources
              <div className="dropdown-kiri">
                <div className="isi-dropdown">Blog</div>
                <br />
                <div className="isi-dropdown">Event</div>
                <br />
                <div className="isi-dropdown">Webinars</div>
                <br />
                <div className="isi-dropdown">Case Studies</div>
                <br />
              </div>
            </div>
          </div> */}

          {/* ===================================== navbar login ========================
          === */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          <Nav className="loginlogo-header" navbar>
            {/* {loginOk === true ? (
              <NavItem className="mr-4">
                <Link to={"/#"}>
                  <LightTooltip title="CART" style={{ outline: "none" }} TransitionComponent={Zoom} placement="bottom-start">
                    <Badge badgeContent={9} color="primary" className="mt-2">
                      <ShoppingCartIcon fontSize="large" style={{ color: "white" }} />
                    </Badge>
                  </LightTooltip>
                </Link>
              </NavItem>
            ) : null}
            <NavItem className="" style={{ color: "white" }}>
              <Link to={"/#"}>
                <LightTooltip title="LOGIN" style={{ outline: "none" }} TransitionComponent={Zoom} placement="bottom-start">
                  <PersonIcon onClick={() => dispatch({ type: USER_MODAL_OPEN })} className="mt-2" fontSize="large" style={{ color: "white", marginRight: "100px" }} />
                </LightTooltip>
              </Link>
            </NavItem> */}
            {loginOk === true ? (
              <Fade right>
                <div className="username-login" style={{ marginLeft: "800px" }}>
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
                    <b>Join Us</b> <KeyboardArrowDownIcon fontSize="large" style={{ marginLeft: "50px", marginBottom: "10px" }} />
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
