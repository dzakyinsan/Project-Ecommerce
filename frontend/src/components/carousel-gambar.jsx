import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";
import Fade from "react-reveal";
import Header from './header'

// import "./index.css";

class AppPage extends React.Component {
  state = {
    collapsed: false
  };

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
      <div id="apppage">
        {/* <Header/> */}
        <Fade top>
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center">
            <MDBContainer>
              <MDBRow>
                <MDBCol
                  md="6"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                  <MDBAnimation style={{fontSize:'50px'}} type="fadeInLeft" delay=".5s">
                    <h1 style={{letterSpacing:'20px'}} className="h1-responsive font-weight-bold mt-sm-5">
                      WHY NOT FASTER
                    </h1>
                    <hr className="hr-light" />
                    <h6 className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                      veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                      molestiae iste.
                    </h6>
                    <MDBBtn color="white">SHOP</MDBBtn>
                    <MDBBtn outline color="white">
                      Learn More
                    </MDBBtn>
                  </MDBAnimation>
                </MDBCol>

                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".5s">
                    <img 
                      src="https://66.media.tumblr.com/b0f99962c9e734df9f91bdbfab02609e/tumblr_myw2cuw1Hp1svwlszo1_1280.gifv"
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
        </Fade>
      </div>
    );
  }
}

export default AppPage;