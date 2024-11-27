import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  UPDATE_USER_PENDING,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_REJECTED,
  REFRESH_ACCESS_TOKEN_PENDING,
  REFRESH_ACCESS_TOKEN_FULFILLED,
  REFRESH_ACCESS_TOKEN_REJECTED,
  LOGOUT,
  UPDATE_AVATAR_FULFILLED,
} from "./actionTypes";

const initialState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  userInfo: null,
  error: null,
  avatarUrl: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case SIGNUP_PENDING:
    case FETCH_USER_PENDING:
    case UPDATE_USER_PENDING:
    case REFRESH_ACCESS_TOKEN_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userInfo: action.payload.userInfo,
      };
    case SIGNUP_FULFILLED:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userInfo: action.payload.userInfo,
      };
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        avatarUrl: action.payload.avatarUrl,
      };
    case UPDATE_USER_FULFILLED:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case REFRESH_ACCESS_TOKEN_FULFILLED:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOGIN_REJECTED:
    case SIGNUP_REJECTED:
    case FETCH_USER_REJECTED:
    case UPDATE_USER_REJECTED:
    case REFRESH_ACCESS_TOKEN_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case UPDATE_AVATAR_FULFILLED:
      return {
        ...state,
        loading: false,
        avatarUrl: action.payload.avatarUrl,
      };
    //   case SET_ACCESS_TOKEN:
    //     console.log("LOGGING OIT")
    //     return {
    //         ...state,
    //         loading: false,
    //         error: action.error.message,
    //       };
    default:
      return state;
  }
};

export default userReducer;
