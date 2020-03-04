import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// import { connect } from "react-redux";
// import { Image, Reveal } from "semantic-ui-react";
// import Header from "./../components/header";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";

// const url = "http://localhost:2001/";

class Catalogs extends Component {
  state = {
    dataFootball: []
  };
  
  componentDidMount() {
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        this.setState({ dataFootball: res.data.dataFootball });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderProducts = () => {
    return this.state.dataFootball.map((val, index) => {
      return (
        <div className="col-md-3">
          <Card className="mt-5 card-container">
            <Link to={"/viewdetail2/"+val.id}>
              <Card.Img variant="top" src={APIURLimage+val.gambar1} onMouseOver={e => (e.currentTarget.src = APIURLimage+val.gambar1)} onMouseOut={e => (e.currentTarget.src = APIURLimage+ val.gambar2)} />
            </Link>
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Text>New arrival</Card.Text>
              <Card.Title>{val.namaProduk}</Card.Title>
              <Card.Text>Harga Rp.{val.harga}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  render() {
    console.log("isi props", this.props);
    return (
      <div>
        <img className="d-block w-100" style={{ height: "400px" }} src="https://i.pinimg.com/originals/91/ff/af/91ffaf9cc801bba44fe2acb676dd4de8.jpg" alt="catalog1" />

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 ">
            <div className="row mt-5">{this.renderProducts()}</div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}

export default Catalogs;
