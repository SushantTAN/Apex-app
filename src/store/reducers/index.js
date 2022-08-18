import { combineReducers } from 'redux';

import authReducer from './auth';
import examsReducer from './exam';
import homeReducer from './home';
import loadingReducer from './loading';
import popupReducer from './popup';

const rootReducer = combineReducers({
  authReducer,
  examsReducer,
  homeReducer,
  loadingReducer,
  popupReducer,
})

export default rootReducer;