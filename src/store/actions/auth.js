import { errorAlert } from '@apexapp/utils/functions';
import AsyncStorage from '@react-native-community/async-storage';

import { PATCH, POST } from '@utils/api';
import * as types from '../actionTypes';
import { setLoading } from './loading';
import { setSuccessMsg, setErrorMsg } from './popup';

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
  // setErrorMsg = () => { },
) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));

      const response = await POST('api/auth/login/', data);
      const resJson = response.data;
      console.log(resJson, response);
      if (response) {
        dispatch(login(resJson));
        await AsyncStorage.setItem('apex-tokens', JSON.stringify(resJson));
        navigate('BottomTabs');
      }
    } catch (error) {
      console.log('err', error);
      // errorAlert("Error Occured", "Please try again.");
      try {
        // setErrorMsg(error.response.data.non_field_errors[0]);
        dispatch(setErrorMsg(error.response.data.non_field_errors[0]));
      } catch (err) {
        console.log(err)
      }
    }
    dispatch(setLoading(false));
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
      dispatch(setLoading(true));

      const response = await POST('api/accounts/create/', data);
      // console.log(response);
      const resJson = response.data;
      // console.log(resJson);
      if (response) {
        dispatch(login(resJson));
        navigate('Verify');
      }
      if (response.status === 400) {
        setErrorMsg(resJson.non_field_errors[0]);
        autoFadeOut();
      }
    } catch (error) {
      console.log('err', error);
      errorAlert("Error Occured", "Please try again.");

      try {
        dispatch(setErrorMsg(error.response.data.non_field_errors[0]));
      } catch (err) {
        console.log(err)
      }

    }
    dispatch(setLoading(false));

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
      dispatch(setLoading(true));

      const response = await PATCH('api/accounts/create/verify/', data);
      const resJson = response.data;
      // console.log(resJson);
      if (response) {
        dispatch(setSuccessMsg('Account Created and Verified'));
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

        dispatch(setErrorMsg(resJson.otp[0]));
        autoFadeOut();
      }
    } catch (error) {
      console.log('err', error);
      errorAlert("Error Occured", "Please try again.");

    }
    dispatch(setLoading(false));

  };
};

const logoutSuccess = () => {
  return {
    type: types.LOGOUT
  }
}


export const logout = (navigation) => {
  // console.log("logout")
  return async dispatch => {
    const url = 'api/auth/logout/';
    const data = { token: '' };

    try {
      dispatch(setLoading(true));

      const response = await POST('api/auth/logout/', data);
      const resJson = await response.data;
      // console.log(resJson, response);
      if (response) {
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
      errorAlert("Error Occured", "Please try again.");

    }
    dispatch(setLoading(false));

  };
}

const refreshSuccess = () => {
  return {
    type: types.SET_REFRESH_RESULT
  }
}

const setLoggedUser = (data) => {
  return {
    type: types.SET_LOGGED_USER,
    payload: data,
  }
}

export const refreshToken = (tokens, navigation) => {
  return async dispatch => {
    try {
      // dispatch(setLoading(true));
      const tokens = await AsyncStorage.getItem('apex-tokens');
      const parsed = await JSON.parse(tokens);

      const response = await POST('api/auth/token/refresh/');
      const resJson = await response.data;
      // console.log("refresh token", resJson, parsed);
      if (resJson) {
        dispatch(refreshSuccess(resJson));

        dispatch(login({ ...parsed, access_token: resJson.access, access_token_expiration: resJson.access_token_expiration }));
        dispatch(setLoggedUser(parsed.user));

        // navigation.navigate('BottomTabs');
      }


    } catch (error) {
      console.log('err refresh token', error);
      // errorAlert("Error Occured", "Login Session Has Expired, please login again.")
    }
    // dispatch(setLoading(false));

  };
}