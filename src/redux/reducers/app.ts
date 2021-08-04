import {
  SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH,
  SET_PATH_NAME, SWITCH_MODE, DEFAULT_VALUES
} from "../constants/app";

const initialApp = {
  navCollapsed: true,
  pathname: '',
  width: 1367,
  locale: 'EN',
  mode: 'light'
};

export type InAppState = typeof initialApp;

const app = (state = initialApp, action) => {
  switch (action.type) {
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.navCollapsed
      };
    case SET_PATH_NAME:
      console.log(action)
      return {
        ...state,
        pathname: action.pathname
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case SWITCH_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.locale
      };
    case DEFAULT_VALUES:
      return {
        ...state,
        ...action.payload
      };
    default: return state;
  }
};

export default app;
