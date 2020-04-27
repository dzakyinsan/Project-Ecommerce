import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Fade from "react-reveal";
import { Link } from "react-router-dom";

class CarouselIklan extends Component {
  state = {};
  render() {
    return (
      <div>
        <Fade >
          <Carousel className="carousel-parallex" keyboard="false">
            <Carousel.Item className="container-img">
              <img className="d-block " style={{ height: "80vh" }} src="https://i.pinimg.com/originals/94/a1/33/94a13398b20bd5f766051c0766770faf.jpg" alt="second slide" />
              <Link to={"/catalogs3"}>
                <button className="btn">BUY NOW</button>
              </Link>
            </Carousel.Item>
            <Carousel.Item className="container-img">
              <img className="d-block " style={{ height: "80vh" }} src="https://i.pinimg.com/originals/07/bb/f0/07bbf07163c28df0f985389ce53633a8.jpg" alt="First slide" />
              <Link to={"/catalogs1"}>
                <button className="btn2">BUY NOW</button>
              </Link>
            </Carousel.Item>
            <Carousel.Item className="container-img">
              <img className="d-block " style={{ height: "80vh" }} src="https://i.pinimg.com/originals/62/bc/f6/62bcf6f574ca2496c0e9cb27c03dfcb5.jpg" />
              <Link to={"/catalogs2"}>
                <button className="btn3">BUY NOW</button>
              </Link>
            </Carousel.Item>
          </Carousel>
        </Fade>
      </div>
    );
  }
}

export default CarouselIklan;
