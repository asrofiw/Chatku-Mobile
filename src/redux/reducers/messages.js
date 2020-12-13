const initialStateProfile = {
  isSuccessRead: false,
  isSuccessSend: false,
  isSuccess: false,
  isLoading: false,
  isError: false,
  isErrorSend: false,
  alertMsg: '',
  statusMsg: '',
  listOfChats: [],
  detailChats: [],
  dataNextPage: [],
  dataUser: [],
  pageInfo: {},
  dataPost: {},
};

export default (state = initialStateProfile, action) => {
  switch (action.type) {
    case 'GET_LIST_OF_CHATS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_LIST_OF_CHATS_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_LIST_OF_CHATS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        listOfChats: action.payload.data.results,
      };
    }
    case 'GET_DETAIL_CHATS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DETAIL_CHATS_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
        detailChats: [],
      };
    }
    case 'GET_DETAIL_CHATS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        detailChats: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_DETAIL_NEXT_PAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DETAIL_NEXT_PAGE_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_DETAIL_NEXT_PAGE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        detailChats: [...state.detailChats, ...action.payload.data.result],
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'POST_MESSAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_MESSAGE_REJECTED': {
      return {
        ...state,
        isSuccessSend: false,
        isLoading: false,
        isErrorSend: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_MESSAGE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isErrorSend: false,
        isSuccessSend: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        dataPost: action.payload.data.result,
      };
    }
    case 'READ_MESSAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'READ_MESSAGE_REJECTED': {
      return {
        ...state,
        isSuccessRead: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'READ_MESSAGE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccessRead: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccessRead: false,
        isSuccessSend: false,
        isSuccess: false,
        isLoading: false,
        isErrorSend: false,
        isError: false,
        alertMsg: '',
        statusMsg: '',
      };
    }
    case 'LOGOUT_MESSAGE': {
      return {
        ...state,
        isSuccessRead: false,
        isSuccessSend: false,
        isSuccess: false,
        isLoading: false,
        isError: false,
        isErrorSend: false,
        alertMsg: '',
        statusMsg: '',
        listOfChats: [],
        detailChats: [],
        dataNextPage: [],
        dataUser: [],
        pageInfo: {},
        dataPost: {},
      };
    }
    default: {
      return state;
    }
  }
};
