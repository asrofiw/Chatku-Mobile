import {combineReducers} from 'redux';

// Import reducers
import auth from './auth';
import user from './user';

export default combineReducers({
  auth,
  user,
});
