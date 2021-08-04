import { InAppState } from "@redux/reducers/app";
import {
  SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV,
  SWITCH_MODE, SET_PATH_NAME, NAV_STYLE,
  DEFAULT_VALUES
} from "../constants/app";

export const toggleCollapsedSideNav = (navCollapsed: string) => ({
  type: TOGGLE_COLLAPSED_NAV, navCollapsed
});

export const setPathName = (pathname: string) => ({
  type: SET_PATH_NAME, pathname
});

export const setDefaultValues = (payload: Partial<InAppState>) => ({
  type: DEFAULT_VALUES, payload
});

export const switchLanguage = (locale: 'ES' | 'EN') => ({
  type: SWITCH_LANGUAGE, locale
});

export const switchMode = (mode: 'dark' | 'light') => ({
  type: SWITCH_MODE, mode
});

export const onNavStyleChange = (navStyle: string) => ({
  type: NAV_STYLE, navStyle
});
