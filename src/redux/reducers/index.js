import {combineReducers} from 'redux';

// Import reducers
import auth from './auth';
import user from './user';
import friends from './friends';

export default combineReducers({
  auth,
  user,
  friends,
});
