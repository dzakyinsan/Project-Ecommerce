import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// import { connect } from "react-redux";
import { APIURL, APIURLimage } from "../helper/ApiUrl";
// import { idcatalog } from "../redux/Actions";
// import { Image, Reveal } from "semantic-ui-react";

class Catalogs extends Component {
  state = {
    dataRunning: []
  };

  componentDidMount() {
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        this.setState({ dataRunning: res.data.dataRunning });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderProducts = () => {
    return this.state.dataRunning.map((val, index) => {
      return (
        <div className="col-md-3">
          <Card className="mt-5 card-container">
            <Link to={"/viewdetail"}>
              <Card.Img variant="top" src={APIURLimage + val.gambar} onMouseOver={e => (e.currentTarget.src = val.gambar1)} onMouseOut={e => (e.currentTarget.src = APIURLimage + val.gambar)} />
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
      <div className='catalog-page'>
        <img className="d-block w-100" src="https://content.nike.com/content/dam/one-nike/en_hk/SU16/Cities/NRC-header.jpg.transform/full-screen/NRC-header.jpg" alt="catalog1" />
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
