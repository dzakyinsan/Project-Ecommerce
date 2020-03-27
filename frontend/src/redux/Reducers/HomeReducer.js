import {
  // GET_HOME_ERROR,
  GET_HOME_LOADING,
  GET_FOOTBALL_SUCCESS,
  GET_BASKETBALL_SUCCESS,
  GET_RUNNING_SUCCESS
} from "./../Actions/types";

const INITIAL_STATE = {
  HotItemsFootball: [],
  HotItemsBasketball: [],
  HotItemsRunning: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HOME_LOADING:
      return { ...state, loading: true };
    case GET_FOOTBALL_SUCCESS:
      return { ...state, HotItemsFootball: action.payload };
    case GET_BASKETBALL_SUCCESS:
      return { ...state, HotItemsBasketball: action.payload };
    case GET_RUNNING_SUCCESS:
      return { ...state, HotItemsRunning: action.payload };
    default:
      return state;
  }
};
