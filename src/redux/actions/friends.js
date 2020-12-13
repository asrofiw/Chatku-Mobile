import http from '../../helpers/http';
import qs from 'querystring';

export default {
  getFriends: (token) => ({
    type: 'GET_FRIENDS',
    payload: http(token).get('private/friends'),
  }),
  addFriends: (token, data) => ({
    type: 'ADD_FRIENDS',
    payload: http(token).post('private/friends', qs.stringify(data)),
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
