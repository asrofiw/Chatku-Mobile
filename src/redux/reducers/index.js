import {combineReducers} from 'redux';

// Import reducers
import auth from './auth';
import user from './user';
import friends from './friends';
import messages from './messages';

export default combineReducers({
  auth,
  user,
  friends,
  messages,
});
