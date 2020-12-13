const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  alertMsg: '',
  token: '',
  isLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'AUTH_USER_FULFILLED': {
      return {
        ...state,
        token: action.payload.data.token,
        isSuccess: true,
        isError: false,
        isLoading: false,
        alertMsg: action.payload.data.message,
      };
    }
    case 'LOGIN_USER': {
      return {
        ...state,
        isLogin: true,
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: false,
        alertMsg: '',
        token: '',
        isLogin: false,
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccess: false,
        isError: false,
        isLoading: false,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
