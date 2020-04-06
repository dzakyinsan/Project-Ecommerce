import React, { Component } from "react";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Catalogs1 from "./pages/catalogs1";
import Catalogs2 from "./pages/catalogs2";
import Catalogs3 from "./pages/catalogs3";
import adminPage from "./pages/adminPage";
import cartPage from "./pages/cartPage";
import ViewDetail from "./pages/viewdetail";
import ViewDetail2 from "./pages/viewdetail2";
import ViewDetail3 from "./pages/viewdetail3";
import checkout from "./pages/checkout";
import waitingAdmin from "./pages/waitingAdminApproval";
import CompletePurchased from "./pages/completePurchased";
import AccountDetails from "./pages/accountDetails";
import Axios from "axios";
import { APIURL } from "./helper/ApiUrl";
import { connect } from "react-redux";
import { onUserloginRepeat, CartGetProduct, GetUserDetails } from "./redux/Actions";

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    var id = localStorage.getItem("userId");
    if (id) {
      Axios.get(`${APIURL}auth/login/${id}`)
        .then(res => {
          // console.log(res.data)
          this.props.onUserloginRepeat(res.data); //ini isinya array of object atau object ????
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.setState({ loading: false });
  }

  render() {
    // var id = localStorage.getItem("userId");
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    {
      this.props.CartGetProduct();
      this.props.GetUserDetails();
    }

    console.log(this.props.Login);

    return (
      <div className='Appjs' >
        <Header />
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/catalogs1"} exact component={Catalogs1} />
          <Route path={"/catalogs2"} exact component={Catalogs2} />
          <Route path={"/catalogs3"} exact component={Catalogs3} />
          <Route path={"/viewdetail/:idDetail"} exact component={ViewDetail} />
          <Route path={"/viewdetail2/:idDetail"} exact component={ViewDetail2} />
          <Route path={"/viewdetail3/:idDetail"} exact component={ViewDetail3} />
          <Route path={"/adminpage"} exact component={adminPage} />
          <Route path={"/cartPage"} exact component={cartPage} />
          <Route path={"/checkout"} exact component={checkout} />
          <Route path={"/waitingAdminApproval"} exact component={waitingAdmin} />
          <Route path={"/completePurchased"} exact component={CompletePurchased} />
          <Route path={"/accountDetails"} exact component={AccountDetails} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    Login: state.auth.login
  };
};

export default connect(MapStateToProps, { onUserloginRepeat, CartGetProduct, GetUserDetails })(App);
