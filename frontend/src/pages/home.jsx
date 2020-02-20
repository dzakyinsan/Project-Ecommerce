import React, { Component } from "react";
import PilihanHome from "./../components/pilihanHome";
import Carousel from "./../components/carousel";
import CarouselGambar from "./../components/carousel-gambar";
import CarouselIklan from "./../components/carousel-iklanbaris";
import "react-animated-slider/build/vertical.css";

class Home extends Component {
  state = {};
  render() {
    console.log("isi props", this.props);
    return (
      <div>
        {/* <div className="row" style={{ marginTop: "80px" }}>
          <div className="col-md-1" />

          <div className="col-md-10"> */}
            <Carousel />
            {/* <CarouselGambar/> */}
            <CarouselIklan />
            <PilihanHome />
          {/* </div>

          <div className="col-md-1" />
        </div> */}
      </div>
    );
  }
}

export default Home;
