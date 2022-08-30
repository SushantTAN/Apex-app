import * as types from '../actionTypes';

const initialState = {
  access_token: '',
  access_token_expiration: '',
  refresh_token: '',
  refresh_token_expiration: '',
  user: {
    email: '',
    first_name: '',
    full_name: '',
    last_name: '',
    pk: 0,
    username: '',
  },

  usernameForVerify: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOKENS:
      return { ...action.payload };

    case types.SET_REGISTER_NAME:
      return { ...state, usernameForVerify: action.payload };
      case types.SET_LOGGED_USER:
      return { ...state, user: action.payload };
    case types.LOGOUT:
      return { ...initialState };
    default:
      return state;

  }
}
export default authReducer;