import {
  LOGIN_REQUEST_START,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST_SUCCESS,
  LOGIN_GOOGLE_START,
  LOGIN_GOOGLE_SUCCESS,
  HIDE_LOADER_AUTH,
  FORGOT_PASS_REQUEST_START,
  NEW_PASS_REQUEST_SUCCESS,
  SHOW_LOADER_AUTH,
  VERIFY_CODE_START
} from '../constants/auth'

export const forgotPassword = (payload) => ({
  type: FORGOT_PASS_REQUEST_START,
  payload,
})
export const verifyCode = (payload) => ({
  type: VERIFY_CODE_START,
  payload,
})
export const newPassword = (payload) => ({
  type: NEW_PASS_REQUEST_SUCCESS,
  payload,
})

export const loginGoogleStart = (userData) => ({
  type: LOGIN_GOOGLE_START,
  payload: userData,
})
export const loginGoogleSuccess = (userData) => ({
  type: LOGIN_GOOGLE_SUCCESS,
  payload: userData,
})

export const login = (credentials) => ({
  type: LOGIN_REQUEST_START,
  payload: credentials,
})

export const loginRequestSuccess = credentials => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: credentials,
})

export const logout = () => ({
  type: LOGOUT_REQUEST_SUCCESS,
})

export const showLoader = () => ({
  type: SHOW_LOADER_AUTH,
})

export const hideLoader = () => ({
  type: HIDE_LOADER_AUTH,
})