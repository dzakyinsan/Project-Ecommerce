import React from "react";
import { MDBMask, MDBRow, MDBCol, MDBView, MDBContainer, MDBAnimation } from "mdbreact";
import Fade from "react-reveal";

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
    const overlay = <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.handleTogglerClick} />;
    return (
      <div id="apppage" className="carousel-gambar">
        {/* <Header/> */}
        <Fade top>
          <MDBView>
            <MDBMask className="d-flex justify-content-center align-items-center">
              <MDBContainer style={{ marginRight: "600px" }}>
                <MDBRow>
                  <MDBCol md="6" className="white-text text-center text-md-left mt-xl-5 mb-5">
                    <MDBAnimation style={{ fontSize: "30px" }} type="fadeInLeft" delay=".5s">
                      <h3 style={{ letterSpacing: "5px" }} className="h1-responsive font-weight-bold mt-sm-5">
                        WHY NOT FASTER
                      </h3>
                      <hr className="hr-light" />
                      <h6 className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                        molestiae iste.
                      </h6>
                      {/* <MDBBtn color="white">SHOP</MDBBtn>
                    <MDBBtn outline color="white">
                      Learn More
                    </MDBBtn> */}
                    </MDBAnimation>
                  </MDBCol>
                  <MDBCol md="3" />

                  <MDBCol md="3" xl="3"></MDBCol>
                </MDBRow>
                <MDBAnimation type="fadeInRight" delay=".5s">
                  {/* <div className='search-box' >
                  <input type='text' className='search-bar' placeholder=' Search...'/>
              </div> */}
                </MDBAnimation>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </Fade>
      </div>
    );
  }
}

export default AppPage;
