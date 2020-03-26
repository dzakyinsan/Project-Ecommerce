import {
  GET_PRODUCT_ERROR,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_CATEGORY_SUCCESS,
  GET_DATAEDIT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_LOADING,
  MODAL_DELETE,
  MODAL_ADD
} from "./../Actions/types";

const INITIAL_STATE = {
  dataProductRedux: [],

  dataCategoryRedux: [],
  dataEditRedux: [],
  loading: false,
  modalDeleteRedux: false,
  modalAddRedux: false,
  message: "",
  idProductDeleteRedux: ""
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        dataProductRedux: action.payload
      };
    case GET_PRODUCT_LOADING:
      return { ...state, loading: true };
    case GET_PRODUCT_ERROR:
      return { ...state, message: "data product gagal di get" };
    case GET_CATEGORY_SUCCESS:
      return { ...state, dataCategoryRedux: action.payload };
    case GET_DATAEDIT_SUCCESS:
      return { ...state, dataEditRedux: action.payload };
    case DELETE_PRODUCT_LOADING:
      return { ...state, loading: true };
    case DELETE_PRODUCT_ERROR:
      return { ...state, message: "data product gagal di delete" };
    case MODAL_DELETE:
      return { ...state, modalDeleteRedux: !state.modalDeleteRedux, idProductDeleteRedux: action.payload };
    case MODAL_ADD:
      return { ...state, modalAddRedux: !state.modalAddRedux };
    default:
      return state;
  }
};
