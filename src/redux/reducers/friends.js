const initialStateProfile = {
  isSuccess: false,
  isLoading: false,
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
