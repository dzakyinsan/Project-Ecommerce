import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

class Carousell extends Component {
  state = {};
  render() {
    return (
      <div className="row" >
        <div className="col-md-6">
          <h1 style={{ textAlign: "center", color: "black", fontFamily: "Anton", letterSpacing: "5px" }}>Our Next Season</h1>
          <Carousel>
            <Carousel.Item>
              <img className=" d-block w-100 carousel" src="https://www.reclays.id/wp-content/uploads/2018/03/ig-1024x1024.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className=" d-block w-100 carousel" src="https://www.reclays.id/wp-content/uploads/2017/10/teaser-Ig.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className=" d-block w-100 carousel" src="https://www.reclays.id/wp-content/uploads/2017/11/1-1024x1024.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-md-6">
          <h1 style={{ textAlign: "center", color: "black", fontFamily: "Anton", letterSpacing: "5px" }}>Our Next Promo</h1>
          <Carousel>
            <Carousel.Item>
              <img className=" d-block w-100 carousel" src="https://www.reclays.id/wp-content/uploads/2017/12/IG-organik-1024x1024.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className=" d-block w-100 carousel" src="https://www.reclays.id/wp-content/uploads/2017/12/bintaro-spanduk-1024x512.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className=" d-block w-100 carousel" src="https://www.reclays.id/wp-content/uploads/2017/07/ig_web.jpg" alt="First slide" />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Carousell;
