import {
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST_SUCCESS,
  LOGIN_GOOGLE_SUCCESS,
  SHOW_LOADER_AUTH,
  HIDE_LOADER_AUTH
} from '../constants/auth'

export const INIT_STATE = {
  userToken: '',
  dateLogin: '',
  userType: '',
  loader: false,
  dataUser: {}
};

export type InAuthRed = typeof INIT_STATE;

export default function auth(state = INIT_STATE, action) {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      const { dataUser, ...firstGrade } = action.payload;

      return {
        ...state,
        ...firstGrade,
        dataUser: { ...state.dataUser, ...dataUser }
      };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        dataUser: { ...state.dataUser, ...action.payload }
      };
    case SHOW_LOADER_AUTH:
      return {
        ...state,
        loader: true
      };
    case HIDE_LOADER_AUTH:
      return {
        ...state,
        loader: false
      };
    case LOGOUT_REQUEST_SUCCESS:
      return INIT_STATE;
    default:
      return state;
  }
}
