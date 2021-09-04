import { all } from "redux-saga/effects";
import auth from "@redux/sagas/auth";
import global from "@main/redux/sagas";

export default function* rootSaga() {
  yield all([auth(), global()]);
}
