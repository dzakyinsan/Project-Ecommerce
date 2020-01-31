import React, { Component } from 'react';
import PilihanHome from './../components/pilihanHome'
import Carousel from './../components/carousel'
import Header from './../components/header'
import PilihanHome2 from './../components/pilihanHome2'
import Header2 from './../components/header2'
import CarouselGambar from './../components/carousel-gambar'
import CarouselIklan from './../components/carousel-iklanbaris'
import 'react-animated-slider/build/vertical.css';

class Home extends Component {
    state = {  }
    render() { 
      console.log('isi props',this.props)
        return ( 
            <div style={{backgroundColor:'black'}}>
              {/* <Header/> */}
              {/* <Header2/> */}
              <CarouselGambar/>
              <CarouselIklan/>
              {/* <Carousel/> */}
              <PilihanHome/>  
              {/* <PilihanHome2/> */}
              
            </div>
         );
    }
}
 
export default Home;