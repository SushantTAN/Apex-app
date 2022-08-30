import { combineReducers } from 'redux';

import authReducer from './auth';
import examsReducer from './exam';
import homeReducer from './home';
import loadingReducer from './loading';
import popupReducer from './popup';
import courseReducer from './course';
import resetReducer from './resetPassword';

const rootReducer = combineReducers({
  authReducer,
  examsReducer,
  homeReducer,
  loadingReducer,
  popupReducer,
  courseReducer,
  resetReducer,
})

export default rootReducer;