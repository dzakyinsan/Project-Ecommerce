import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetProduct, GetPaymentRequest, GetEachDataPayment } from "./../redux/Actions";
// import Axios from "axios";
// import {APIURL, APIURLimage} from './../helper/ApiUrl'
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "./../App.css";
import "react-web-tabs/dist/react-web-tabs.css";
import ManageProduct from "../components/manage-product";
import ManageCategory from "../components/manage-category";
import PaymentRequest from "../components/Payment-request";
import FootballManaged from "../components/Football-managed";

function AdminPage() {
  //===================== set dispatch =========================
  const dispatch = useDispatch();
  // ======================== global state ====================
  const dataPaymentReq = useSelector(state => state.PaymentReqReducer.dataPaymentRequest);
  console.log("dataPaymentReq di page nya", dataPaymentReq);

  // ======================= component didmount ===================
  useEffect(() => {
    // ======= all product ==========
    dispatch(AdminGetProduct()); //ini buat jalanin function di action redux
    // ===== payment request =========
    dispatch(GetPaymentRequest()); //ini buat jalanin function di action redux
    dispatch(GetEachDataPayment());
  }, []);
  return (
    <Tabs defaultTab="payment-request" vertical className="vertical-tabs" style={{ marginTop: "60px" }}>
      <TabList className="left-tabs">
        {/* <Tab tabFor="Football-managed">Football</Tab> */}
        <Tab tabFor="manage-product">All Product</Tab>
        <Tab tabFor="manage-category">Category</Tab>
        <Tab tabFor="payment-request">Payment request</Tab>
      </TabList>

      <TabPanel tabId="manage-product" style={{ width: "100%" }}>
        <ManageProduct />
      </TabPanel>

      <TabPanel tabId="manage-category" style={{ width: "100%" }}>
        <ManageCategory />
      </TabPanel>
      <TabPanel tabId="payment-request" style={{ width: "100%" }}>
        <PaymentRequest />
      </TabPanel>
    </Tabs>
  );
}
export default AdminPage;
