import AsyncStorage from '@react-native-community/async-storage';

import { PATCH, POST } from '@utils/api';
import * as types from '../actionTypes';

export const login = data => {
  return {
    type: types.SET_TOKENS,
    payload: data,
  };
};

export const loginRequest = (
  data,
  callback = () => { },
  navigate,
  setErrorMsg = () => { },
) => {
  return async dispatch => {
    try {
      const response = await POST('api/auth/login/', data);
      const resJson = await response.json();
      // console.log(resJson, response);
      if (response.status === 200) {
        dispatch(login(resJson));
        await AsyncStorage.setItem('apex-tokens', JSON.stringify(resJson));
        navigate('BottomTabs');
      }
      if (response.status === 400) {
        setErrorMsg(resJson.non_field_errors[0]);
        callback();
      }
    } catch (error) {
      console.log('err', error);
    }
  };
};

export const register = data => {
  return {
    type: types.SET_REGISTER_NAME,
    payload: data,
  };
};

export const registerRequest = (
  data,
  navigate,
  params,
  autoFadeOut = () => { },
  setErrorMsg = () => { },
) => {
  return async dispatch => {
    try {
      const response = await POST('api/accounts/create/', data);
      // console.log(response);
      const resJson = await response.json();
      // console.log(resJson);
      // if (response.status === 200) {
      dispatch(login(resJson));
      navigate('Verify');
      // }
      if (response.status === 400) {
        setErrorMsg(resJson.non_field_errors[0]);
        autoFadeOut();
      }
    } catch (error) {
      console.log('err', error);
    }
  };
};

export const verify = data => {
  return {
    type: types.SET_TOKENS,
    payload: data,
  };
};

export const verifyRequest = (
  data,
  autoFadeOut = () => { },
  navigate,
  setErrorMsg = () => { },
) => {
  return async dispatch => {
    try {
      const response = await PATCH('api/accounts/create/verify/', data);
      const resJson = await response.json();
      // console.log(resJson);
      if (response.status === 200) {
        dispatch(login(resJson));
        await AsyncStorage.setItem('apex-tokens', JSON.stringify(resJson));
        navigate('BottomTabs');
      }
      if (response.status === 400) {
        // let msg = '';
        // Object.values(resJson).forEach(element => {
        //   msg = msg + element[0][0];
        // });
        // console.log('msg', resJson?.otp[0]);

        setErrorMsg(resJson.otp[0]);
        autoFadeOut();
      }
    } catch (error) {
      console.log('err', error);
    }
  };
};

const logoutSuccess = () => {
  return {
    type: types.LOGOUT
  }
}


export const logout = (navigation) => {
  console.log("logout")
  return async dispatch => {
    const url = 'api/auth/logout/';
    const data = { token: '' };

    try {
      const response = await POST('api/auth/logout/', data);
      const resJson = await response.json();
      console.log(resJson, response);
      if (response.status === 200) {
        dispatch(logoutSuccess());
        await AsyncStorage.removeItem('apex-tokens');
        // navigation.navigate('Login');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }

    } catch (error) {
      console.log('err', error);
    }
  };
}

