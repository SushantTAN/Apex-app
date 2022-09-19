import * as types from '../actionTypes';

const initialState = {
  successMsg: '',
  errorMsg: '',
}

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SUCCESS_POPUP:
      return { ...state, successMsg: action.payload };
    case types.SET_ERROR_POPUP:
      return { ...state, errorMsg: action.payload };

    default:
      return state;

  }
}
export default popupReducer;