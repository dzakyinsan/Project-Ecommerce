import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import ManageProductReducer from "./ManageProductReducer";
import CartReducer from "./CartReducer";

export default combineReducers({
  auth: AuthReducers,
  ManageProductReducer,
  CartReducer
});
