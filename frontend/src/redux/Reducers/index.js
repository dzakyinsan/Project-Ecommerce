import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import ManageProductReducer from "./ManageProductReducer";
import CartReducer from "./CartReducer";
import CheckoutReducer from './CheckoutReducer'
import HomeReducer from './HomeReducer'

export default combineReducers({
  auth: AuthReducers,
  ManageProductReducer,
  CartReducer,
  CheckoutReducer,
  HomeReducer
});
