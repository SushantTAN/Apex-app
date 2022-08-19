import * as types from '../actionTypes';

const initialState = {
  successMsg: '',
}

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SUCCESS_POPUP:
      return { ...state, successMsg: action.payload };

    default:
      return state;

  }
}
export default popupReducer;