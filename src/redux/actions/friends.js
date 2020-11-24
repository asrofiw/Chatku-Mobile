import http from '../../helpers/http';

export default {
  getFriends: (token) => ({
    type: 'GET_FRIENDS',
    payload: http(token).get('private/friends'),
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
