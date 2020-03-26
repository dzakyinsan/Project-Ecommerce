import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// import { connect } from "react-redux";
// import { Image, Reveal } from "semantic-ui-react";
// import Header from "./../components/header";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";

// const url = "http://localhost:2001/";

const Catalogs = () => {
  const [dataFootball, setdataFootball] = useState([]);
  const [page, setPage] = useState(1);
  const [pager, setpager] = useState({});

  useEffect(() => {
    Axios.get(`${APIURL}product/getproductFootball/${page}`)
      .then(res => {
        setdataFootball(res.data.pageOfData);
        setpager(res.data.pager);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${APIURL}product/getproductFootball/${page}`)
      .then(res => {
        setdataFootball(res.data.pageOfData);
        setpager(res.data.pager);
      })
      .catch(err => {
        console.log(err);
      });
  }, [page]);

  const renderProducts = () => {
    console.log("dataFootball", dataFootball);
    return dataFootball.map((val, index) => {
      return (
        <div className="col-md-3">
          <Card className="mt-5 card-container">
            <Link to={"/viewdetail3/" + val.id}>
              <Card.Img
                variant="top"
                src={APIURLimage + val.gambar}
                onMouseOver={e => (e.currentTarget.src = APIURLimage + val.gambar)}
                onMouseOut={e => (e.currentTarget.src = APIURLimage + val.gambar)}
                className="card-img"
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
  console.log("page", page);
  console.log("pager.pages", pager.pages);

  return (
    <div>
      <div className="catalog-page">
        <img className="d-block w-100" style={{ height: "400px" }} src="https://i.pinimg.com/originals/91/ff/af/91ffaf9cc801bba44fe2acb676dd4de8.jpg" alt="catalog1" />{" "}
        <div className="row">
          <div className="col-md-2"></div>{" "}
          <div className="col-md-8 ">
            <div className="row mt-5">{renderProducts()}</div>{" "}
          </div>
          <div className="col-md-2"></div>{" "}
        </div>{" "}
      </div>
      {pager.pages && pager.pages.length && (
        <ul className="pagination">
          <li className={`page-item first-item ${pager.currentPage === 1 ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "grey", color: "black", fontSize: "20px" }} to={{ search: `?page=1` }} className="page-link" onClick={() => setPage(pager.startPage)}>
              First
            </Link>
          </li>
          {/* <li className={`page-item previous-item ${pager.currentPage === 1 ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "#212529", color: "white" }} to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link" onClick={() => setPage(pager.currentPage - 1)}>
              Previous
            </Link>
          </li> */}
          {pager.pages.map(page => (
            <li key={page} className={`page-item number-item ${pager.currentPage === page ? "active" : ""}`}>
              <Link style={{ backgroundColor: "#333333", color: "white", fontSize: "20px" }} to={{ search: `?page=${page}` }} className="page-link" onClick={() => setPage(page)}>
                {page}
              </Link>
            </li>
          ))}
          {/* <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "#212529", color: "white" }} to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link" onClick={() => setPage(pager.currentPage + 1)}>
              Next
            </Link>
          </li> */}
          <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "grey", color: "black", fontSize: "20px" }} to={{ search: `?page=${pager.totalPages}` }} className="page-link" onClick={() => setPage(pager.totalPages)}>
              Last
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Catalogs;
