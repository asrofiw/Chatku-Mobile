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
  searchUser: (search) => ({
    type: 'SEARCH_USER',
    payload: http().get(`users?search=${search}`),
  }),
  clearResultSearch: () => ({
    type: 'CLEAR_RESULT_SEARCH',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
