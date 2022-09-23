import { GET, PATCH, POST } from '@utils/api';
import * as types from '../actionTypes';

export const setNotification = data => {
  return {
    // type: types.SET_LOADING,
    payload: data,
  };
};

export const fcmSendRequest = (data) => {
  return async (dispatch) => {
    try {
      const response = await POST('api/fcm/devices/', data);
      const resJson = response.data;
      // console.log("action", resJson)
      if (response) {

      }

    } catch (error) {
      console.log('err', error);
    }
  };
};