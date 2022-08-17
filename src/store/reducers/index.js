import { combineReducers } from 'redux';

import authReducer from './auth';
import examsReducer from './exam';
import homeReducer from './home';
import loadingReducer from './loading';

const rootReducer = combineReducers({
  authReducer,
  examsReducer,
  homeReducer,
  loadingReducer,
})

export default rootReducer;