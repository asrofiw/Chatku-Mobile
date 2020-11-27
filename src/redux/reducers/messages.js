const initialStateProfile = {
  isSuccess: false,
  isLoading: false,
  isError: false,
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
        detailChats: action.payload.data.result,
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
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_MESSAGE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        dataPost: action.payload.data.result,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: false,
        alertMsg: '',
        statusMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
