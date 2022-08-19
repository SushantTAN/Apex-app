import { PATCH, POST } from '@utils/api';
import * as types from '../actionTypes';

export const phoneVerify = data => {
  return {
    type: types.SET_TOKENS,
    payload: data,
  };
};

export const phoneVerifyRequest = (data, navigate = () => { }) => {
  return async dispatch => {
    try {
      const response = await PATCH('api/accounts/reset/', data);
      const resJson = await response.json();
      // console.log(response, resJson)
      if (response.status === 200) {
        navigate('Reset', {
          username: data.username,
        });
      }
      if (response.status === 400) {
      }
    } catch (error) {
      console.log('err', error);
    }
  };
};

export const verifyResetOtp = (data, navigate = () => { }) => {
  return async dispatch => {
    try {
      const response = await PATCH('api/accounts/reset/verify/', data);
      const resJson = await response.json();
      // console.log(response, resJson)
      if (response.status === 200) {
        navigate('NewPassword', {
          username: data.username,
        });
      }
      if (response.status === 400) {
      }
    } catch (error) {
      console.log('err', error);
    }
  };
};

export const confirmPasswordChange = (data, navigate = () => { }) => {
  return async dispatch => {
    try {
      const response = await PATCH('api/accounts/reset/confirm/', data);
      const resJson = await response.json();
      // console.log(response.status, resJson);
      if (response.status === 200) {
        navigate('Login');
      }
      if (response.status === 400) {
      }
    } catch (error) {
      console.log('err', error);
    }
  };
};
