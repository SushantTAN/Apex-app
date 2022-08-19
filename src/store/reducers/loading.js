import * as types from '../actionTypes';

const initialState = {
  isLoading: false,
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;

  }
}
export default loadingReducer;