import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Fade } from "react-bootstrap";
import { connect } from "react-redux";
import { Image, Reveal } from "semantic-ui-react";
import Header from "./../components/header";

const url = "http://localhost:2001/";

class Catalogs extends Component {
  state = {
    dataCatalog: []
  };

  componentDidMount() {}

  render() {
    console.log("isi props", this.props);
    return (
      <div className="row">
        <div className='col-md-2' style={{background:'#212121'}}></div>
        <div className="col-md-8 ">
          <div className="row mt-5">
            <div className="col-md-3">
              <Card className="mt-5 card-container">
                <Link to={"/viewdetail"}>
                  <Card.Img
                    variant="top"
                    src="https://www.reclays.id/wp-content/uploads/2019/10/ARCTROPOL-RED-1.jpg"
                    onMouseOver={e => (e.currentTarget.src = "https://www.reclays.id/wp-content/uploads/2019/10/ARCTROPOL-RED-2.jpg")}
                    onMouseOut={e => (e.currentTarget.src = "https://www.reclays.id/wp-content/uploads/2019/10/ARCTROPOL-RED-1.jpg")}
                  />
                </Link>
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Text>New arrival</Card.Text>
                  <Card.Title>ARCTROPOL – RED</Card.Title>
                  <Card.Text>Harga Rp.70.000</Card.Text>
                 
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className='col-md-2' style={{background:'#212121'}}></div>
      </div>
    );
  }
}

export default Catalogs;
