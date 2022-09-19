import { GET, PATCH, POST } from '@utils/api';
import * as types from '../actionTypes';

export const setSuccessPopup = data => {
  return {
    type: types.SET_SUCCESS_POPUP,
    payload: data,
  };
};

export const setSuccessMsg = (msg) => {
  return async (dispatch) => {
    try {
      dispatch(setSuccessPopup(msg));

      setTimeout(() => {
        dispatch(setSuccessPopup(''));
      }, 4000);
    } catch (e) {
      console.log('err', e);
    }
  };
}


export const setErrorPopup = data => {
  return {
    type: types.SET_ERROR_POPUP,
    payload: data,
  };
};

export const setErrorMsg = (msg) => {
  return async (dispatch) => {
    try {
      console.log("test")

      dispatch(setErrorPopup(msg));

      setTimeout(() => {
        dispatch(setErrorPopup(''));
      }, 4000);
    } catch (e) {
      console.log('err popup', e);
    }
  };
}