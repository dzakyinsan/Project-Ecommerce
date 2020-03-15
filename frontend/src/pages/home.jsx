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
import { connect } from "react-redux";
import {GetHotItems} from './../redux/Actions'



class Home extends Component {
  state = {
    dataFootball: []
  };

  componentDidMount() {
    this.props.GetHotItems()
    // Axios.get(`${APIURL}product/getproduct`)
    //   .then(res => {
    //     this.setState({ dataFootball: res.data.dataFootball });
    //     console.log("dataFootball", this.state.dataFootball);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  renderFootball = () => {
    return this.props.HotItemsFootball.map((val, index) => {
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
  renderBasketball = () => {
    return this.props.HotItemsBasketball.map((val, index) => {
      return (
        <div className="col-md-4">
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
  renderRunning = () => {
    return this.props.HotItemsRunning.map((val, index) => {
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
    console.log('hotitems',this.props.HotItemsBasketball)
    // console.log("isi props", this.props);
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
              </div>
            </div>
          </div>
        </div>
        {/* ============================= basketball menu =================== */}
        <div className="home-menu-basketball">
        <div className='cuma-div-untuk-tujuan-id' id="basketballPage"></div>

          <div className="category-title-basketball" >
            <Zoom>
              BASKETBALL BOOTS
            </Zoom>
          </div>
          <div className='row' >
            <Fade left>
              <div className="col-md-6 container">
                <img className="d-block image"  src="https://i.pinimg.com/originals/ff/bb/c9/ffbbc988c27747c8ed77b07aa7404e13.jpg" alt="First slide" />
                <div className="middle">
                  <Link to={"/catalogs2"}>
                  <div className="text"> Buy Now</div>
                  </Link>
                </div>
              </div>
            </Fade>
            <div className='col-md-6'>
              <div className="basketball-desc ">
                <Bounce right>
                More than any other sport, basketball relies on sharp cuts, quick sprints and explosive movements. Taking into consideration playing surface type, outsole pattern, surface ratio and rubber composition, Nike basketball shoes provide the lightweight cushioning, trusted traction and crossover style required by the game’s best players.
                </Bounce>
              </div>
              <div className="basketball-desc-right">
                <Bounce right>
                <hr style={{ backgroundColor: "white" }} />
                <h3>Hot Items</h3>
                <hr style={{ backgroundColor: "white" }} />
                </Bounce>
                <div className="row">{this.renderBasketball()}</div>
              </div>
            </div>
          </div>
        </div>
        {/* ============================= running menu =================== */}
        <div className="home-menu-running">
        <div className='cuma-div-untuk-tujuan-id' id="runningPage"></div>

          <div className="category-title-running" >
            <Zoom>
              RUNNING BOOTS
            </Zoom>
          </div>
          <div>
            <Zoom>
              <div className="col-md-6 container">
                <img className="d-block image"  src="https://res.cloudinary.com/wnotw/images/c_limit,w_1536,q_auto:eco,f_auto/v1578878328/iayh90qhfvuvkalwggcy/nike-running-club" alt="First slide" />
                <div className="middle">
                  <Link to={"/catalogs1"}>
                  <div className="text"> Buy Now</div>
                  </Link>
                </div>
              </div>
            </Zoom>
            <div>
              <div className="running-desc ">
                <Zoom>
                Explore styles designed to meet the demands of all types of runners, and find running shoes that provide the support, cushioning and stability you need.
                </Zoom>
              </div>
              <div className="running-desc-right">
                <Bounce left>
                <hr style={{ backgroundColor: "white" }} />
                <h3>Hot Items</h3>
                <hr style={{ backgroundColor: "white" }} />
                </Bounce>
                <div className="row">{this.renderRunning()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const MapStateToProps = state => {
  return {
    HotItemsFootball:state.HomeReducer.HotItemsFootball,
    HotItemsBasketball:state.HomeReducer.HotItemsBasketball,
    HotItemsRunning:state.HomeReducer.HotItemsRunning,
  };
};
export default connect(MapStateToProps,{GetHotItems}) (Home);
