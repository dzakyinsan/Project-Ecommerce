import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Tooltip, Zoom } from "@material-ui/core";
import { Dropdown } from "semantic-ui-react";
import { MDBBtn, MDBModal, MDBModalBody, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { onUserRegister } from "./../redux/Actions";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

// const trigger = (
//   <span>
//     <PersonIcon name="user" />
//   </span>
// );
const Header = props => {
  const registerRedux = useSelector(state => state.auth.register);
  const loadingRedux = useSelector(state => state.auth.loading);
  const errorRedux = useSelector(state => state.auth.error);

  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setModalOpen] = useState(false);
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    email: ""
  });

  const togglemodal = () => setModalOpen(!isModal);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  //handle input
  const registerHandle = e => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const renderError = () => {
    if (errorRedux.length > 0) {
      return <p className="alert alert-danger">{errorRedux}</p>;
    }else if(registerRedux){
      return <p className="alert alert-success">Register Success, Please Login!!</p>;      
    }
  };

  //register click

  // const registeClick = () => {
  //   var username=dataUser.username
  //   var email=dataUser.email
  //   var password=dataUser.password
  //   dispatch(onUserRegister({ username, email, password }))
  //   console.log(dataUser);
  // };

  var { username, password, email } = dataUser;

  return (
    <div>
      <MDBContainer>
        <MDBModal style={{ color: "black", backgroundColor: "black" }} isOpen={isModal} toggle={togglemodal} size="lg" centered>
          {/* <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader> */}
          <MDBModalBody>
            <MDBContainer>
              <MDBRow>
                {/* =========================== modal login ========================== */}
                <MDBCol md="5">
                  <form>
                    <p className="h4 text-center mb-4">LOGIN</p>
                    <label htmlFor="defaultFormLoginEmailEx" className="black-text">
                      Your email*
                    </label>
                    <input type="email" name="defaultFormLoginEmailEx" className="form-control" />
                    <br />
                    <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                      Password*
                    </label>
                    <input type="email" name="defaultFormLoginPasswordEx" className="form-control" />
                    <p className="font-small black-text d-flex justify-content-start mt-3">
                      Forgot
                      <a href="#!" className="dark-grey-text font-weight-bold ml-1">
                        Password?
                      </a>
                    </p>
                    <div className="text-center" style={{ marginTop: "150px" }}>
                      <MDBBtn color="unique" type="submit">
                        Login
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
                <MDBCol md="2">
                  <div className="devider" style={{ height: "400px", width: "1.5px", background: "#606060", margin: "auto" }} />
                </MDBCol>
                {/* =========================== modal register ================== */}
                <MDBCol md="5">
                  <div>
                    <p className="h4 text-center mb-4">REGISTER</p>
                    <label htmlFor="username" className="black-text">
                      Username*
                    </label>
                    <input type="text" name="username" className="form-control" onChange={registerHandle} />

                    <br />
                    <label htmlFor="email" className="black-text">
                      Your email*
                    </label>
                    <input type="email" name="email" className="form-control" onChange={registerHandle} />
                    <br />
                    <label htmlFor="password" className="black-text">
                      password*
                    </label>
                    <input type="password" name="password" className="form-control" onChange={registerHandle} />
                    <br />
                    <label htmlFor="confirmpass" className="black-text">
                      Confirm Password*
                    </label>
                    <input type="password" name="confirmpass" className="form-control" />
                    <div className='mt-3'>{renderError()}</div>
                    <div className="text-center mt-4">
                      <button className="btn btn-primary" onClick={() => dispatch(onUserRegister(username, email, password))}>
                        Register
                      </button>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            {/* <MDBInput label="E-mail address" outline icon="envelope" /> */}
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
      {/* ======================================= modal end ==========================================
      == */}
      <Navbar className="fixed-top" expand="md" color="dark" style={{ height: "60px" }}>
        <NavbarToggler onClick={toggle} />
        <Collapse className="jumbotron-header mx-5" isOpen={isOpen} navbar>
          {/* ========================================= navbar pilihan header ==========================
          == */}
          <Nav className="menu-header ml-5" style={{ fontSize: "12px", lineHeight: "50px", fontWeight: "700" }} navbar>
            <NavItem style={{ color: "white" }} className="mr-3">
              <Dropdown text="File">
                <Dropdown.Menu>
                  <Dropdown.Item text="New" />
                  <Dropdown.Item text="Open..." description="ctrl + o" />
                  <Dropdown.Item text="Save as..." description="ctrl + s" />
                  <Dropdown.Item text="Rename" description="ctrl + r" />
                  <Dropdown.Item text="Make a copy" />
                  <Dropdown.Item icon="folder" text="Move to folder" />
                  <Dropdown.Item icon="trash" text="Move to trash" />
                  <Dropdown.Divider />
                  <Dropdown.Item text="Download As..." />
                  <Dropdown.Item text="Publish To Web" />
                  <Dropdown.Item text="E-mail Collaborators" />
                </Dropdown.Menu>
              </Dropdown>
            </NavItem>
            <NavItem style={{ color: "white" }} className="mr-3">
              <Dropdown text="File">
                <Dropdown.Menu>
                  <Dropdown.Item text="New" />
                  <Dropdown.Item text="Open..." description="ctrl + o" />
                  <Dropdown.Item text="Save as..." description="ctrl + s" />
                  <Dropdown.Item text="Rename" description="ctrl + r" />
                  <Dropdown.Item text="Make a copy" />
                  <Dropdown.Item icon="folder" text="Move to folder" />
                  <Dropdown.Item icon="trash" text="Move to trash" />
                  <Dropdown.Divider />
                  <Dropdown.Item text="Download As..." />
                  <Dropdown.Item text="Publish To Web" />
                  <Dropdown.Item text="E-mail Collaborators" />
                </Dropdown.Menu>
              </Dropdown>
            </NavItem>
            <NavItem style={{ color: "white" }} className="mr-3">
              <Dropdown text="File">
                <Dropdown.Menu>
                  <Dropdown.Item text="New" />
                  <Dropdown.Item text="Open..." description="ctrl + o" />
                  <Dropdown.Item text="Save as..." description="ctrl + s" />
                  <Dropdown.Item text="Rename" description="ctrl + r" />
                  <Dropdown.Item text="Make a copy" />
                  <Dropdown.Item icon="folder" text="Move to folder" />
                  <Dropdown.Item icon="trash" text="Move to trash" />
                  <Dropdown.Divider />
                  <Dropdown.Item text="Download As..." />
                  <Dropdown.Item text="Publish To Web" />
                  <Dropdown.Item text="E-mail Collaborators" />
                </Dropdown.Menu>
              </Dropdown>
            </NavItem>
          </Nav>
          {/* ========================================= navbar logo header ======================
          === */}
          <NavbarBrand href="/" className="logo-header" style={{ fontFamily: "Karla", letterSpacing: "4px", fontSize: "30px" }}>
            <Link to={"/"} style={{ color: "white" }}>
              BAJUKU
            </Link>
          </NavbarBrand>
          {/* ===================================== navbar login ========================
          === */}
          <Nav className="loginlogo-header" navbar>
            <NavItem>
              <Link to={"/#"}>
                <LightTooltip title="SEARCH" style={{ outline: "none" }} TransitionComponent={Zoom} placement="bottom-start">
                  <SearchIcon className="mt-2 mr-3" fontSize="m" style={{ color: "white" }} />
                </LightTooltip>
              </Link>
            </NavItem>
            <NavItem>
              <div className="deviderlogo mt-2 mr-3" style={{ height: "25px", width: "1px", background: "#606060", margin: "auto" }} />
            </NavItem>
            <NavItem className="mr-3">
              <Link to={"/#"}>
                <LightTooltip title="CART" style={{ outline: "none" }} TransitionComponent={Zoom} placement="bottom-start">
                  <Badge badgeContent={9} color="primary" className="mt-2">
                    <ShoppingCartIcon fontSize="m" style={{ color: "white" }} />
                  </Badge>
                </LightTooltip>
              </Link>
            </NavItem>
            <NavItem>
              <div className="deviderlogo mt-2 mr-3" style={{ height: "25px", width: "1px", background: "#606060", margin: "auto" }} />
            </NavItem>
            <NavItem className="" style={{ color: "white" }}>
              <Link>
                <LightTooltip title="LOGIN" style={{ outline: "none" }} TransitionComponent={Zoom} placement="bottom-start">
                  <PersonIcon onClick={togglemodal} className="mt-2" fontSize="m" style={{ color: "white", marginRight: "100px" }} />
                </LightTooltip>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
