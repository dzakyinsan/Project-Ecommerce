import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Fade from 'react-reveal/Zoom';
// import {Carousel} from 'react-responsive-carousel'



class CarouselIklan extends Component {
  state = {};
  render() {
    return (
          <div className='carousel-iklan'>
        <Fade >
        <Carousel style={{color:'white',backgroundColor:'black'}} keyboard='false'>
        <Carousel.Item style={{height:'60px'}}>
         {/* <p style={{color:'black'}}><center>------------------</center></p> */}
         <h5><center>BAJU.KU OFFICIAL STORE</center> </h5>
        </Carousel.Item>
        <Carousel.Item>
         <h5><center>FREE INTERNATIONAL DELIVERY FOR YOU</center></h5>
         <p><center>get free delivery on orders of Rp.300.000 or more</center></p>
        </Carousel.Item>
        <Carousel.Item>
         <h5><center>30-DAYS FREE RETURN</center></h5>
         <p><center>members get 30-day free returns</center></p>
        </Carousel.Item>
      </Carousel>
      </Fade >
</div>
    );
  }
}

export default CarouselIklan;
