import React, { Component } from "react";
import Carousel from "./../components/carousel";
import "react-animated-slider/build/vertical.css";
import Slide from "react-reveal/Slide";
import { Card, Button } from "react-bootstrap";
import Axios from "axios";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
// import Bounce from "react-reveal/Bounce";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GetHotItems } from "./../redux/Actions";
import NumberFormat from "react-number-format";
import MouseOutlinedIcon from "@material-ui/icons/MouseOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Home extends Component {
  state = {
    dataFootball: [],
  };

  componentDidMount() {
    this.props.GetHotItems();
  }

  renderFootball = () => {
    return this.props.HotItemsFootball.map((val, index) => {
      return (
        <div className="img-recommend-1">
          <img src={APIURLimage + val.gambar} width="200" height="250" 
          onMouseOver={e => (e.currentTarget.src = APIURLimage + val.gambar2)}
          onMouseOut={e => (e.currentTarget.src = APIURLimage + val.gambar)}
          />
          <div className="overlay">
            <p>{val.namaProduk}</p>
            <p style={{fontWeight:'bold'}}>
              <NumberFormat value={val.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp. "} />
            </p>
            <Link to={"/viewdetail3/"+val.id}>
            <Button variant="warning">Buy Now</Button>
            </Link>
          </div>
        </div>
      );
    });
  };
  renderBasketball = () => {
    return this.props.HotItemsBasketball.map((val, index) => {
      return (
        <div className="img-recommend-1">
          <img src={APIURLimage + val.gambar} width="200" height="250" 
          onMouseOver={e => (e.currentTarget.src = APIURLimage + val.gambar2)}
          onMouseOut={e => (e.currentTarget.src = APIURLimage + val.gambar)}
          />
          <div className="overlay">
            <p>{val.namaProduk}</p>
            <p>
              <NumberFormat value={val.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp. "} />
            </p>
            <Link to={"/viewdetail2/"+val.id}>
            <Button variant="warning">Buy Now</Button>
            </Link>
          </div>
        </div>
      );
    });
  };
  renderRunning = () => {
    return this.props.HotItemsRunning.map((val, index) => {
      return (
        <div className="img-recommend-1">
          <img src={APIURLimage + val.gambar} width="200" height="250"
          onMouseOver={e => (e.currentTarget.src = APIURLimage + val.gambar3)}
          onMouseOut={e => (e.currentTarget.src = APIURLimage + val.gambar)}
          />
          <div className="overlay">
            <p>{val.namaProduk}</p>
            <p>
              <NumberFormat value={val.harga} displayType={"text"} thousandSeparator={true} prefix={"Rp. "} />
            </p>
            <Link to={"/viewdetail/"+val.id}>
            <Button variant="warning">Buy Now</Button>
            </Link>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="home">
        <Carousel />

        <Fade bottom delay={500}>
          <div style={{ backgroundColor: "white", minHeight: "150px" }}>
            <a href="#footballPage">
              <div className="square">
                <div className="object">
                  <MouseOutlinedIcon fontSize="large" />
                </div>
                <div className="object2">
                  <div className="animate-flicker">
                    <ExpandMoreIcon fontSize="large" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </Fade>

        {/* =========================== football menu =============== */}
        <div className="home-menu-football">
          <div className="cuma-div-untuk-tujuan-id" id="footballPage" />

          <div className="category-title">
            <Zoom delay={200}>We Created The Best Soccer Shoes In The World</Zoom>
          </div>
          <div className="football-desc ">
            <Zoom delay={400}>
              Discover Nike men's football boots for unstoppable playmaking, explosive speed, and deadly agility. Choose from men's styles such as the Phantom, Tiempo, Mercurial, Hypervenom, and
              FootballX to match your position and style of play.
            </Zoom>
          </div>
          <div>
            <Zoom delay={600}>
              <div className="col-md-6 container">
                <img className="image" src="https://i2.wp.com/www.soccercleats101.com/wp-content/uploads/2017/08/Nike-Future-Pack.jpg" alt="First slide" />
                <div className="middle">
                  <Link to={"/catalogs3"}>
                    <div className="text"> Buy Now</div>
                  </Link>
                </div>
              </div>
            </Zoom>
          </div>
        </div>
        <div className="container-recommendation">
          <div className="recommendation-title">Recomendation For You</div>
          <div className="recommend-1">
            <Fade bottom>
              <h4>- Football -</h4>
              <div className="box-img-recommend-1" style={{ display: "flex" }}>
                {this.renderFootball()}
              </div>
            </Fade>
          </div>

          <div className="recommend-1">
            <Fade bottom>
              <h4>- Basketball -</h4>
              <div className="box-img-recommend-1" style={{ display: "flex" }}>
                {this.renderBasketball()}
              </div>
            </Fade>
          </div>

          <div className="recommend-1">
            <Fade bottom>
              <h4>- Running -</h4>
              <div className="box-img-recommend-1" style={{ display: "flex" }}>
                {this.renderRunning()}
              </div>
            </Fade>
          </div>
        </div>
       
      </div>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    HotItemsFootball: state.HomeReducer.HotItemsFootball,
    HotItemsBasketball: state.HomeReducer.HotItemsBasketball,
    HotItemsRunning: state.HomeReducer.HotItemsRunning,
  };
};
export default connect(MapStateToProps, { GetHotItems })(Home);
