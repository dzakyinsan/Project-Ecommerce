import React, {useEffect}from "react";
import {useDispatch} from 'react-redux'
import {AdminGetProduct} from './../redux/Actions'
// import Axios from "axios";
// import {APIURL, APIURLimage} from './../helper/ApiUrl'
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "./../App.css";
import "react-web-tabs/dist/react-web-tabs.css";
import ManageProduct from "../components/manage-product";
import ManageCategory from "../components/manage-category";


function AdminPage() {
  //===================== set dispatch =========================
  const dispatch=useDispatch()
   
  // ======================= component didmount ===================
  useEffect (()=>{
    dispatch(AdminGetProduct())//ini buat jalanin function di action redux
  },[])
  return (
    <Tabs defaultTab="manage-product" vertical className="vertical-tabs" style={{ marginTop: "90px" }}>
      <TabList>
        <Tab tabFor="manage-product">Football</Tab>
        <Tab tabFor="manage-product">Basketball</Tab>
        <Tab tabFor="manage-category">Category</Tab>
      </TabList>

      <TabPanel tabId="manage-product" style={{ width: "100%" }}>
        <ManageProduct />
      </TabPanel>

      <TabPanel tabId="manage-category" style={{ width: "100%" }}>
        <ManageCategory />
      </TabPanel>
    </Tabs>
  );
}
export default AdminPage;

