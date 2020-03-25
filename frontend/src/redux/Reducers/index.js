import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import ManageProductReducer from "./ManageProductReducer";
import CartReducer from "./CartReducer";
import CheckoutReducer from './CheckoutReducer'
import HomeReducer from './HomeReducer'
import PaymentReqReducer from './paymentRequestReducer'

export default combineReducers({
  auth: AuthReducers,
  ManageProductReducer,
  CartReducer,
  CheckoutReducer,
  HomeReducer,
  PaymentReqReducer
});
