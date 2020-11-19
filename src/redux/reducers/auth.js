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
        isLogin: true,
      };
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'LOGOUT_USER': {
      return {
        isLogin: false,
        token: '',
        isError: false,
        alertMsg: 'Logout Successfully',
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
