import { errorAlert } from '@apexapp/utils/functions';
import { PATCH, POST } from '@utils/api';
import * as types from '../actionTypes';
import { setLoading } from './loading';
import { setSuccessMsg } from './popup';
import { CommonActions, StackActions } from '@react-navigation/native';

export const phoneVerify = data => {
  return {
    type: types.SET_TOKENS,
    payload: data,
  };
};

export const phoneVerifyRequest = (data, navigation, counter) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await PATCH('api/accounts/reset/', data);
      const resJson = await response.data;
      // console.log(response, resJson)
      if (response) {
        // navigate('Reset', {
        //   username: data.username,
        // });
        navigation.dispatch(
          StackActions.replace('Reset', {
            username: data.username,
          })
        );
        // dispatch(startCounter(counter))
      }
      if (response.status === 400) {
      }
    } catch (error) {
      errorAlert("Error Occured", "Please try again.");
      console.log('err', error);
    }
    dispatch(setLoading(false));
  };
};

export const verifyResetOtp = (data, navigation) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await PATCH('api/accounts/reset/verify/', data);
      const resJson = await response.data;
      // console.log(response, resJson)
      if (response) {
        // navigate('NewPassword', {
        //   username: data.username,
        // });
        navigation.dispatch(
          StackActions.replace('NewPassword', {
            username: data.username,
          })
        );
      }
      if (response.status === 400) {
      }
    } catch (error) {
      errorAlert("Error Occured", "Please try again.");
      console.log('err', error);
    }
    dispatch(setLoading(false));
  };
};

export const confirmPasswordChange = (data, navigate = () => { }) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await PATCH('api/accounts/reset/confirm/', data);
      const resJson = await response.data;
      // console.log(response.status, resJson);
      if (response.status === 200) {
        navigate('Login');
        dispatch(setSuccessMsg('Password has been changed'));
      }
      if (response.status === 400) {
      }
    } catch (error) {
      console.log('err', error);
      errorAlert("Error Occured", "Please try again.");
    }
    dispatch(setLoading(false));
  };
};

export const decrementCounter = data => {
  return {
    type: types.DECREMENT_COUNTER,
    // payload: data,
  };
};

export const startCounter = (counter) => {
  return async dispatch => {
    try {
      let timer;
      timer = setInterval(() => {
        console.log("counter timer")
        dispatch(decrementCounter());
        // if (counter <= 0) {
          clearInterval(timer);
        // }
      }, 1000);
    } catch (error) {

    }

  };
};