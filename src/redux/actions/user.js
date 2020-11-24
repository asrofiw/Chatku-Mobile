import http from '../../helpers/http';

export default {
  getUser: (token) => ({
    type: 'GET_USER',
    payload: http(token).get('private/users'),
  }),
  updateUser: (token, data) => ({
    type: 'UPDATE_USER',
    payload: http(token).patch('private/users', data),
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
