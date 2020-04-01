import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { APIURL, APIURLimage } from "./../helper/ApiUrl";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

// const useStyles = makeStyles(theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "85ch",
//       marginTop: "25px",
//       // fontSize: "30px",
//       fontWeight: "bold"
//     }
//   }
// }));

const Catalogs = () => {
  // const classes = useStyles();

  const [dataBasketball, setdataBasketball] = useState([]);
  const [page, setPage] = useState(1);
  const [pager, setpager] = useState({});
  const [search, setsearch] = useState("");
  const [filtereddataBasketball, setfiltereddataBasketball] = useState([]);

  useEffect(() => {
    Axios.get(`${APIURL}product/getproductBasketball/${page}`)
      .then(res => {
        setdataBasketball(res.data.pageOfData);
        setpager(res.data.pager);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${APIURL}product/getproductBasketball/${page}`)
      .then(res => {
        setdataBasketball(res.data.pageOfData);
        setpager(res.data.pager);
      })
      .catch(err => {
        console.log(err);
      });
  }, [page]);

  // =================================== useEffect search =====================
  useEffect(() => {
    setfiltereddataBasketball(
      dataBasketball.filter(basketball => {
        return basketball.namaProduk.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, dataBasketball]);

  const renderProducts = () => {
    console.log("dataBasketball", dataBasketball);
    return filtereddataBasketball.map((val, index) => {
      return (
        <div className="col-md-3">
          <Card className="mt-5 card-container">
            <Link to={"/viewdetail2/" + val.id}>
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
        <img className="d-block w-100" style={{ height: "400px" }} src="https://pbs.twimg.com/media/D9izHHpXkAA45vl.jpg" alt="catalog2" />{" "}
        <div className="row">
          <div className="col-md-2"></div>{" "}
          <div className="col-md-8 ">
            {/* <div className={classes.root}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                id="outlined-basic"
                // label="Search..."
                placeholder="Search..."
                variant="outlined"
                type="text"
                onChange={e => setsearch(e.target.value)}
              />
            </div> */}
            <div className="row ">{renderProducts()}</div>{" "}
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
