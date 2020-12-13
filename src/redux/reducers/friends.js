const initialStateProfile = {
  isSuccessAdd: false,
  isSuccess: false,
  isLoading: false,
  isErrorAdd: false,
  isError: false,
  alertMsg: '',
  statusMsg: '',
  dataFriends: {},
};

export default (state = initialStateProfile, action) => {
  switch (action.type) {
    case 'GET_FRIENDS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_FRIENDS_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_FRIENDS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        dataFriends: action.payload.data.results,
      };
    }
    case 'ADD_FRIENDS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'ADD_FRIENDS_REJECTED': {
      return {
        ...state,
        isSuccessAdd: false,
        isLoading: false,
        isErrorAdd: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'ADD_FRIENDS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isErrorAdd: false,
        isSuccessAdd: true,
        statusMsg: 'Success',
        alertMsg: action.payload.data.message,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccessAdd: false,
        isSuccess: false,
        isLoading: false,
        isError: false,
        isErrorAdd: false,
        alertMsg: '',
        statusMsg: '',
      };
    }
    case 'LOGOUT_FRIENDS': {
      return {
        ...state,
        isSuccessAdd: false,
        isSuccess: false,
        isLoading: false,
        isErrorAdd: false,
        isError: false,
        alertMsg: '',
        statusMsg: '',
        dataFriends: {},
      };
    }
    default: {
      return state;
    }
  }
};
