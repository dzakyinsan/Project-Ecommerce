import React, { Component } from "react";
import "./../App.css";
import { FaFacebook } from "react-icons/fa";

class footer extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="row px-5" style={{ height: "250px" }}>
          <div className="col-md-2" style={{}}></div>
          <div className="col-md-2" style={{ height: "250px", marginTop: "10px" }}>
            <h5 className="mt-3 mb-4"> LOGO</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia enim omnis tempore natus iusto tempora sequi illum quisquam temporibus alias amet praesentium soluta, pariatur quasi in odit
              voluptas aliquid nisi.
            </p>
            <p></p>
          </div>
          <div className="col-md-2" style={{ height: "250px", marginTop: "10px" }}>
            <h5 className="mt-3 mb-4">Contact Us</h5>
            <p>Jl. Srikusuma No. 11A Bandung, 40254 +62 821 2882 3223 admin@reclays.id Monday – Sunday (10.00 – 20.00 WIB)</p>
            <p></p>
          </div>
          <div className="col-md-2" style={{ height: "250px", marginTop: "10px", paddingLeft: "80px" }}>
            <h5 className="mt-3 mb-4">Discover</h5>
            <p>Look books</p>
            <p>News</p>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Stores</p>
          </div>
          <div className="col-md-2" style={{ height: "250px", marginTop: "10px" }}>
            <h5 className="mt-3 mb-4">Social Media</h5>
            <div>
              {/* <h1 ><FaFacebook/></h1> */}
              <h1 className="fab fa-facebook-square mr-4"></h1>
              <h1 className="fab fa-instagram mr-4"></h1>
              <h1 className="fab fa-twitter mr-4"></h1>
              <h1 className="fab fa-whatsapp mr-4"></h1>
            </div>
          </div>
          <div className="col-md-2" style={{}}></div>
        </div>
        <div style={{ height: "70px", textAlign: "center", paddingTop: "20px" }}>
          <hr
            style={{
              color: 'black',
              backgroundColor: '#cccccc',
              height: 1
            }}
          />
          <p>Copyright © 2020 All Rights by Dzakyinsan</p>
        </div>
      </div>
    );
  }
}

export default footer;
