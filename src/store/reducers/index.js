import { combineReducers } from 'redux';

import authReducer from './auth';
import examsReducer from './exam';
import homeReducer from './home';
import courseReducer from './course';

const rootReducer = combineReducers({
  authReducer,
  examsReducer,
  homeReducer,
  courseReducer,

})

export default rootReducer;