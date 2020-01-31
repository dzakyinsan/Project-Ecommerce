import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "semantic-ui-react";

class FullPageIntroWithFixedTransparentNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      modal: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" centered>
            {/* <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader> */}
            <MDBModalBody>
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="5">
                    <form>
                      <p className="h4 text-center mb-4">Login</p>
                      <label htmlFor="defaultFormLoginEmailEx" className="black-text">
                        Your email
                      </label>
                      <input type="email" id="defaultFormLoginEmailEx" className="form-control" />
                      <br />
                      <label htmlFor="defaultFormLoginPasswordEx" className="black-text">
                        Your password
                      </label>
                      <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />
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
                    <div className="devider" style={{ height: "400px", width: "2px", background: "#606060", margin: "auto" }} />
                  </MDBCol>
                  <MDBCol md="5">
                    <form>
                      <p className="h4 text-center mb-4">Register</p>
                      <label htmlFor="defaultFormRegisterNameEx" className="black-text">
                        Your name
                      </label>
                      <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
                      <br />
                      <label htmlFor="defaultFormRegisterEmailEx" className="black-text">
                        Your email
                      </label>
                      <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                      <br />
                      <label htmlFor="defaultFormRegisterConfirmEx" className="black-text">
                        Confirm your email
                      </label>
                      <input type="email" id="defaultFormRegisterConfirmEx" className="form-control" />
                      <br />
                      <label htmlFor="defaultFormRegisterPasswordEx" className="black-text">
                        Your password
                      </label>
                      <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                      <div className="text-center mt-4">
                        <MDBBtn color="unique" type="submit">
                          Register
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
              {/* <MDBInput label="E-mail address" outline icon="envelope" /> */}
            </MDBModalBody>
            {/* <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>
                Close
              </MDBBtn>
              <MDBBtn color="primary">Save changes</MDBBtn>
            </MDBModalFooter> */}
          </MDBModal>
        </MDBContainer>
        <header>
          <Router>
            <MDBNavbar color="rgba-black-strong" fixed="top" dark expand="md" scrolling transparent>
              {/* <MDBNavbarBrand href="/">
                <strong>NAIK</strong>
              </MDBNavbarBrand> */}
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink to="/login">
                  <Link to={"/login"} className="mr-3">
                    </Link>

                    {/* <div className="d-none d-md-inline">Home</div> */}
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              {/* {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />} */}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to={"/login"}>Home</MDBNavLink>
                    {/* <Link path={'/'}>
                      HOME
                    </Link> */}
                  </MDBNavItem>
                  <MDBNavItem style={{color:'white'}}> 
                    <Dropdown text="File">
                      <Dropdown.Menu>
                      
                    
                        <Dropdown.Item Link to={"/login"} text="New" />
                    
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
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Profile</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem onClick={() => this.setState({ modal: true })}>
                    <MDBNavLink to="#!">
                      <MDBIcon icon="user" className="d-inline-inline" /> <div className="d-none d-md-inline">Account</div>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <Button>
                    <Link to={"/login"} >
                    login
                  </Link>
                      </Button>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </Router>
        </header>
      </div>
    );
  }
}

export default FullPageIntroWithFixedTransparentNavbar;
