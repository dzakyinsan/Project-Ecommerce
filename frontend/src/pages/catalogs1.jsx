import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Fade } from "react-bootstrap";
import { connect } from "react-redux";
import { APIURL } from "./../helper/ApiUrl";
// import { idcatalog } from "../redux/Actions";
// import { Image, Reveal } from "semantic-ui-react";

class Catalogs extends Component {
  state = {
    dataTops: []
  };

  componentDidMount() {
    Axios.get(`${APIURL}product/getproduct`)
      .then(res => {
        this.setState({ dataTops: res.data.dataTops });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderProducts = () => {
    return this.state.dataTops.map((val, index) => {
      return (
        
          <div className="col-md-3">
            <Card className="mt-5 card-container">
              <Link to={"/viewdetail"}>
                <Card.Img
                  variant="top"
                  src={val.gambar}
                  onMouseOver={e => (e.currentTarget.src = val.gambar1)}
                  onMouseOut={e => (e.currentTarget.src = val.gambar2)}
                />
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
      <div className="row">
        <div className="col-md-2" style={{ background: "#212121" }}></div>
        <div className="col-md-8 ">
        <div className="row mt-5">
          {this.renderProducts()}
        </div>
        </div>
        <div className="col-md-2" style={{ background: "#212121" }}></div>
      </div>
    );
  }
}

export default Catalogs;
