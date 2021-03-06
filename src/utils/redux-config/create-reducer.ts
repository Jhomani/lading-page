import { combineReducers } from "redux";
// import commonData from "@redux/reducers/common";
// import landingPage from "@redux/reducers/landingPage";
import app from "@redux/reducers/app";
import auth from '@redux/reducers/auth';
import global from '@main/redux/reducer'

export default function createReducer(asyncReducers) {
  return combineReducers({
    auth,
    app,
    global,
    ...asyncReducers,
  });
}
