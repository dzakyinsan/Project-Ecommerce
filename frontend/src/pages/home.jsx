import React, { Component } from "react";
import PilihanHome from "./../components/pilihanHome";
import Carousel from "./../components/carousel";
import Carouselgambar from "./../components/carousel-gambar";
import "react-animated-slider/build/vertical.css";
import Slide from "react-reveal/Slide";
import { Card } from "react-bootstrap";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import {Link} from 'react-router-dom'

class Home extends Component {
  state = {
    dataFootball: []
  };

  componentDidMount() {
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        this.setState({ dataFootball: res.data.dataFootball });
        console.log("dataFootball", this.state.dataFootball);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderFootball = () => {
    return this.state.dataFootball.map((val, index) => {
      return (
        <div className="col-md-2">
          <Bounce right>
          <Card bg="dark" text="white" style={{ width: "18rem" }}>
            <Card.Header>Hot Item</Card.Header>
            <Card.Img variant="top" src={APIURLimage + val.gambar} onMouseOver={e => (e.currentTarget.src = val.gambar)} onMouseOut={e => (e.currentTarget.src = APIURLimage + val.gambar)} />
            <Card.Body>
              <Card.Title>{val.namaProduk}</Card.Title>
              <Card.Text>{val.harga}</Card.Text>
            </Card.Body>
          </Card>
          </Bounce>
        </div>
      );
    });
  };

  render() {
    console.log("isi props", this.props);
    return (
      <div className='home'>
        {/* <Carousel /> */}
        <Carouselgambar />

        {/* <CarouselIklan /> */}
        {/* <PilihanHome /> */}
        {/* =========================== pilihan menu ================== */}
        <Fade bottom>
        <div className="row">
          <div className="col-md-4 pilihan-home">
            <div className="isi-pilihan-home">
              <div className="animate-flicker">
                <div className="text-home" >                  
                  <a href="#footballPage">FootBall</a>
                </div>
                <div style={{ textAlign: "center", color: "whitesmoke" }}>
                  <KeyboardArrowDownIcon fontSize="large" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 pilihan-home">
            <div className="isi-pilihan-home">
              <div className="animate-flicker">
                <div className="text-home">
                  <a href='#basketballPage'>Basketball</a>
                  </div>
                <div style={{ textAlign: "center", color: "whitesmoke" }}>
                  <KeyboardArrowDownIcon fontSize="large" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 pilihan-home">
            <div className="isi-pilihan-home">
              <div className="animate-flicker">
                <div className="text-home">
                  <a href='#runningPage'>Running</a>
                  </div>
                <div style={{ textAlign: "center", color: "whitesmoke" }}>
                  <KeyboardArrowDownIcon fontSize="large" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </Fade>
        {/* =========================== football menu =============== */}
        <div className="home-menu-football">
        <div className='cuma-div-untuk-tujuan-id' id="footballPage"></div>

          <div className="category-title" >
            <Zoom>
              FOOTBALL BOOTS
            </Zoom>
          </div>
          <div>
            <Zoom>
              <div className="col-md-6 container">
                <img className="d-block w-100 image" src="https://www.jakpost.travel/wimages/large/96-966766_soccer-nike-electro-boots-wallpaper-2018-in-soccer.jpg" alt="First slide" />
                <div className="middle">
                  <Link to={"/catalogs3"}>
                  <div className="text"> Buy Now</div>
                  </Link>
                </div>
              </div>
            </Zoom>
            <div>
              <div className="football-desc ">
                <Zoom>
                  Discover Nike men's football boots for unstoppable playmaking, explosive speed, and deadly agility. Choose from men's styles such as the Phantom, Tiempo, Mercurial, Hypervenom, and
                  FootballX to match your position and style of play.
                </Zoom>
              </div>
              <div className="football-desc-right">
                <Bounce left>
                <hr style={{ backgroundColor: "white" }} />
                <h3>Hot Items</h3>
                <hr style={{ backgroundColor: "white" }} />
                </Bounce>
                <div className="row">{this.renderFootball()}</div>
                {/* <Slide bottom right>
                  <h1>PEOPLE WHO ALSO USE NIKE FOOTBALL BOOTS</h1>
                  <img style={{ marginRight: "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyi-3nSSejml_G_rkUMxMijDeLv8X6b7zfU0-10BCbK81jOOU" />
                  <img
                    style={{ marginRight: "10px" }}
                    src="data:image/jpeg;base64,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"
                  />
                  <img style={{ marginRight: "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJVbWxnXsol5sSD1_7SCbx5YMcT-gzZlrDMem1dV47zuPYu6Vg" />
                </Slide> */}
              </div>
            </div>
          </div>
        </div>
        {/* ============================= basketball menu =================== */}
        {/* <div className="home-menu-basketball">
          <div className="row">
            <div className="col-md-6">
              <div className="category-title">
                <Slide bottom left>
                  BASKETBALL BOOTS
                </Slide>
              </div>
              <div className="basketball-desc">
                <Slide bottom left>
                  Nike men’s basketball shoes deliver performance benefits and style, both on and off the court. They also feature the latest Nike innovations and technologies. Flywire provides
                  ultra-lightweight support and lockdown, and Hyperfuse construction delivers zones of durability, stability and ventilation right where you need them. Our men’s basketball shoes offer
                  classic and new styles, including signature athlete shoes. Learn about Nike+ Basketball, which allows you to track your performance, improve your game and compete with friends.
                </Slide>
              </div>
              <div className="container-image-basketballhome">
                <Slide bottom left>
                  <img
                    width="250"
                    className="image-basketballhome"
                    src="https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6d97d0e0-da46-4924-a1d1-836f99cce6cd/lebron-17-monstars-basketball-shoe-XShGJ1.jpg"
                  />
                  <img
                    width="250"
                    className="image-basketballhome"
                    src="https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/i1-80a2a2fc-f109-4fb1-a51e-60eda3f1012b/pg-4-ep-basketball-shoe-9FgFQx.jpg"
                  />
                  <img
                    width="250"
                    className="image-basketballhome"
                    src="https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/atlpsqutgb0hjmljpxce/zoom-rise-basketball-shoe-xJvCBl.jpg"
                  />
                </Slide>
              </div>
            </div>
            <Slide bottom right>
              <div className="col-md-6 container">
                <img className="image" src="https://i.pinimg.com/564x/8b/32/e6/8b32e626cd22bd1f31df7fc38ac6c1e8.jpg" alt="First slide" />
                <div className="middle">
                  <div className="text"> Buy Now</div>
                </div>
              </div>
            </Slide>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Home;
