import http from '../../helpers/http';
import qs from 'querystring';

export default {
  getListOfChats: (token) => ({
    type: 'GET_LIST_OF_CHATS',
    payload: http(token).get('private/message'),
  }),
  getDetailChats: (token, data) => ({
    type: 'GET_DETAIL_CHATS',
    payload: http(token).get(`private/message/${data}`),
  }),
  getDataNextPage: (token, path) => ({
    type: 'GET_DETAIL_NEXT_PAGE',
    payload: http(token).get(path),
  }),
  postMessage: (token, id, data) => ({
    type: 'POST_MESSAGE',
    payload: http(token).post(`private/message/${id}`, qs.stringify(data)),
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
