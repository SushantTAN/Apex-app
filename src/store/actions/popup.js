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