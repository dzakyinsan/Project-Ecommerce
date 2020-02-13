import React, { Component } from "react";
import Axios from "axios";
import {APIURL, APIURLimage} from './../helper/ApiUrl'
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "./../App.css";
import "react-web-tabs/dist/react-web-tabs.css";
import ManageAdmin from '../components/manage-admin'
import ManageUser from '../components/manage-user'
import ManageProduct from '../components/manage-product'


class MyVerticalTabs extends Component {
  render() {
    return (
        <Tabs defaultTab="manage-product" vertical className="vertical-tabs" style={{marginTop:'80px'}}>
        <TabList>
          <Tab tabFor="manage-admin">MANAGE ADMIN</Tab>
          <Tab tabFor="manage-user">MANAGE USER</Tab>
          <Tab tabFor="manage-product">MANAGE PRODUCT</Tab>
        </TabList>
  
        <TabPanel tabId="manage-admin" style={{width:'100%'}} >
            <ManageAdmin/>
        </TabPanel>
  
        <TabPanel tabId="manage-user" style={{width:'100%'}}>
        <ManageUser/>
        </TabPanel>
  
        <TabPanel tabId="manage-product" style={{width:'100%'}}>
        <ManageProduct/>
        </TabPanel>
      </Tabs>
    );
  }
}

export default MyVerticalTabs;
