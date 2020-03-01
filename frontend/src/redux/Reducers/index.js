import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import ManageProductReducer from './ManageProductReducer'

export default combineReducers({
    auth:AuthReducers,
    ManageProductReducer
})