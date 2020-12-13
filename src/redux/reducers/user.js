const initialStateProfile = {
  isSuccessUpdate: false,
  isSuccess: false,
  isLoading: false,
  isError: false,
  alertMsg: '',
  statusMsg: '',
  dataProfile: {},
  resultSearch: [],
};

export default (state = initialStateProfile, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    }
    case 'GET_USER_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        dataProfile: action.payload.data.results,
      };
    }
    case 'UPDATE_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPDATE_USER_REJECTED': {
      return {
        ...state,
        isSuccessUpdate: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: 'Failed to update data',
      };
    }
    case 'UPDATE_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccessUpdate: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        dataProfile: action.payload.data.results,
      };
    }
    case 'SEARCH_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SEARCH_USER_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        statusMsg: 'Failed',
        alertMsg: 'Failed to update data',
      };
    }
    case 'SEARCH_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        statusMsg: 'Succes',
        alertMsg: action.payload.data.message,
        resultSearch: action.payload.data.results,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccessUpdate: false,
        isSuccess: false,
        isLoading: false,
        isError: false,
        alertMsg: '',
        statusMsg: '',
      };
    }
    case 'CLEAR_RESULT_SEARCH': {
      return {
        ...state,
        resultSearch: [],
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...state,
        isSuccessUpdate: false,
        isSuccess: false,
        isLoading: false,
        isError: false,
        alertMsg: '',
        statusMsg: '',
        dataProfile: {},
        resultSearch: [],
      };
    }
    default: {
      return state;
    }
  }
};
