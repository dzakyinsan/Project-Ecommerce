import React, { Component } from "react";
import Axios from "axios";
// import { APIURL } from "../support/ApiUrl";
import { connect } from "react-redux";
import { Carousel, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { Button, Icon, Card, Image, Input } from "semantic-ui-react";


class ViewDetail extends Component {
  state = {
    datadetail: {},
    clicks: 0,
    show: true
  };

  //const APIURL="http://localhost:2001/"

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };

  componentDidMount() {
    // Axios.get(`${APIURL}catalogs${this.props.idcat}/${this.props.match.params.id}`)
    //   .then(res => {
    //     this.setState({ datadetail: res.data });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    console.log("ini this props", this.props);
    console.log("state datadetail", this.state.datadetail);
    {
      /* ini view detail{this.props.match.params.id}<br/>
        ini id dari catalognya {this.props.idcat}<br/> */
    }
    return (
      <div className="row p-3 mx-5 my-4" style={{border:'2px solid red'}}> 
        {/* ====================== row kiri ======================= */}
        <div className="col-md-6" style={{border:'2px solid red'}} >
          <Carousel>
            <Carousel.Item>
              <img className="gambar-viewdetail" src="https://www.reclays.id/wp-content/uploads/2019/12/HEALFIE-WHITE-1.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="gambar-viewdetail" src="https://www.reclays.id/wp-content/uploads/2019/12/HEALFIE-WHITE-2.jpg" alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="gambar-viewdetail" src="https://www.reclays.id/wp-content/uploads/2019/12/HEALFIE-WHITE-3.jpg" alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="gambar-viewdetail" src="https://www.reclays.id/wp-content/uploads/2019/12/HEALFIE-WHITE-4.jpg" alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>  
        {/* ============================== row kanan =========================== */}
        <div className=" col-md-6" style={{border:'2px solid red'}}>
          <Card style={{ width: "500px", height: "350px" }}>
            <Card.Content>
              <Image floated="right" size="mini" src="https://www.reclays.id/wp-content/uploads/2019/12/HEALFIE-WHITE-1.jpg" />
              <Card.Header style={{ fontSize: "30px" }}>HEALFIE - WHITE</Card.Header>
              <Card.Meta>dzakyinsan's Catalogue</Card.Meta>
              <hr />
              <Card.Description style={{ fontSize: "20px" }}>
                Rp <strong>70.000</strong>
              </Card.Description>

              <Card.Description className="mt-4 mb-3" style={{ fontSize: "18px" }}>
                <strong>Size</strong>
              </Card.Description>
              <Button.Group>
                <Button>S</Button>
                <Button>M</Button>
                <Button>L</Button>
                <Button>XL</Button>
              </Button.Group>
              <div className=" row mt-3 ml-1">
                <div>
                  <Button size="medium" icon="minus" onClick={this.DecreaseItem} style={{ width: "40px" }} />
                  <Input size="medium" className="mr-1" ref="jumlahinput" value={this.state.clicks} placeholder="Jumlah" style={{ width: "50px" }} />
                  <Button size="medium" icon="plus" onClick={this.IncrementItem} style={{ width: "40px" }} />
                </div>
                <div>
                  <Button animated="vertical">
                    <Button.Content hidden>Shop</Button.Content>
                    <Button.Content visible>
                      <Icon name="shop" />
                    </Button.Content>
                  </Button>
                </div>
              </div>
            </Card.Content>
            <Card.Content extra></Card.Content>
          </Card>
          {/* {this.state.datadetail.map((val,index)=>{
            return(
              <div>
                {val.image}
                </div>
            )
          })} */}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    idcat: state.idcatalog
  };
};

export default connect(MapStateToProps)(ViewDetail);
