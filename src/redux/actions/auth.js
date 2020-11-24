import qs from 'querystring';
import http from '../../helpers/http';

export default {
  register: (data) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login', qs.stringify(data)),
  }),
  login: () => ({
    type: 'LOGIN_USER',
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
