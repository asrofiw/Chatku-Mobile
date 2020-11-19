import qs from 'querystring';
import http from '../../helpers/http';

export default {
  getUser: (token) => ({
    type: 'GET_USER',
    payload: http(token).get('private/customer/profile'),
  }),
  updateUser: (token, data) => ({
    type: 'UPDATE_USER',
    payload: http(token).patch('private/customer/profile', qs.stringify(data)),
  }),
  updatePicture: (token, data) => ({
    type: 'UPDATE_USER',
    payload: http(token).patch('private/customer/profile', data),
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
