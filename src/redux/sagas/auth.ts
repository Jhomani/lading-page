//@ts-check
import Router from "next/router";
import moment from "moment";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import request, {
  getOptionsWithToken, postOptionsWithoutToken
} from "@utils/request";

import {
  LOGIN_GOOGLE_START,
  FORGOT_PASS_REQUEST_START,
  LOGIN_REQUEST_START,
  NEW_PASS_REQUEST_SUCCESS,
  VERIFY_CODE_START,
  LOGIN_GOOGLE_SUCCESS
} from "../constants/auth";
import {
  loginRequestSuccess, showLoader,
  hideLoader
} from "@redux/actions/auth";
import payments from "@utils/services/PaymentService";

export function* login(arg) {
  let url, options, filter;
  let payload = arg.payload;

  try {
    yield put(showLoader());
    url = `${process.env.BACK_URL}/users/login`;
    options = yield postOptionsWithoutToken(payload);
    const requestToken = yield call(request, url, options);

    url = `${process.env.BACK_URL}/users/me`;
    options = yield getOptionsWithToken(requestToken.token);
    const requestUser = yield call(request, url, options);

    yield all([
      put(
        loginRequestSuccess({
          dateLogin: moment().format(),
          userToken: requestToken.token,
          dataUser: { ...requestUser, avatar: null },
        })
      ),
      call(Router.replace, '/app'),
    ]);

  } catch (err) {
    console.log(err.message)
    if (err.message == "401" || err.message == "404") console.log('Credenciales Incorrectas')
  } finally {
    yield put(hideLoader());
  }
}

export function* register(arg) {
  const { roleUser } = yield select((state) => state.global);
  let url, options;
  let payload = arg.payload;

  try {
    yield put(showLoader());

    url = `${process.env.BACK_URL}/users/register`;
    options = yield postOptionsWithoutToken({ ...payload, roleId: roleUser });
    const userData = yield call(request, url, options);

    yield all([
      call(Router.push, '/login'),
      call(console.log, 'Good, now you login to sistem'),
    ]);
  } catch (err) {
    console.log(err.message)
    if (err.message == "500") console.log('Server Error');
    else if (err.message == "400")
      console.log('Already we have that email!');
    else console.log(err.message);
  } finally {
    yield put(hideLoader());
  }
}

export function* loginWithGoogle(arg) {
  const { roleUser } = yield select((state) => state.global);
  let url, options;
  const { avatar, ...others } = arg.payload;

  try {
    yield put(showLoader());

    url = `${process.env.BACK_URL}/users/social-media`;
    options = yield postOptionsWithoutToken({ ...others, roleId: roleUser });
    const tokenObj = yield call(request, url, options);

    url = `${process.env.BACK_URL}/users/me`;
    options = yield getOptionsWithToken(tokenObj.token);
    const requestUser = yield call(request, url, options);

    yield all([
      put(loginRequestSuccess({
        dateLogin: moment().format(),
        userToken: tokenObj.token,
        dataUser: { ...requestUser, avatar },
      })),
      call(Router.replace, '/app')
    ]);
  } catch (err) {
    console.log(err.message)
    if (err.message == "500") console.log('Server Error');
    else if (err.message == "400")
      console.log('Already we have that email!');
    else console.log(err.message);
  } finally {
    yield put(hideLoader());
  }
}

export function* forgotPasswordSaga(arg) {
  let url, options, msg;
  const { res, rej, ...other } = arg.payload;

  try {
    yield put(showLoader());

    url = `${process.env.BACK_URL}/users/reset-password`;
    options = yield postOptionsWithoutToken(other);
    const { token } = yield call(request, url, options);

    msg = 'We send a code to your email';
    yield call(res, { msg, current: 'code', token })
  } catch (err) {

    if (err.message == "500") console.log('Server Error');
    else msg = err.message;
    yield call(rej, msg);
  } finally {
    yield put(hideLoader());
  }
}

export function* newPasswordSaga(arg) {
  let url, options, msg;
  const { res, rej, ...other } = arg.payload;

  try {
    yield put(showLoader());

    url = `${process.env.BACK_URL}/users/new-password`;
    options = yield postOptionsWithoutToken(other);
    yield call(request, url, options);

    msg = 'Ready, you can login';
    yield call(res, { msg, current: 'ready' })
  } catch (err) {
    console.log(err.message)
    if (err.message == "500") msg = 'Error de servidor';
    else msg = err.message;
    yield call(rej, msg);
  } finally {
    yield put(hideLoader());
  }
}

export function* verifyCode(arg) {
  let url, options, msg;
  const { res, rej, ...other } = arg.payload;

  try {
    yield put(showLoader());

    url = `${process.env.BACK_URL}/users/verify-code`;
    options = yield postOptionsWithoutToken(other);
    yield call(request, url, options);

    // yield call(Router.push, '/ingreso');
    msg = 'Good!! now put your new password';
    yield call(res, { msg, current: 'newpass' })
  } catch (err) {
    console.log(err.message)
    if (err.message == "500") msg = 'Error de servidor';
    else if (err.message == "401") msg = "The code is incorrent";
    yield call(rej, msg);
  } finally {
    yield put(hideLoader());
  }
}

export default function* signInSaga() {
  yield takeLatest(LOGIN_GOOGLE_START, register);
  yield takeLatest(LOGIN_GOOGLE_SUCCESS, loginWithGoogle);
  yield takeLatest(LOGIN_REQUEST_START, login);
  yield takeLatest(FORGOT_PASS_REQUEST_START, forgotPasswordSaga);
  yield takeLatest(NEW_PASS_REQUEST_SUCCESS, newPasswordSaga);
  yield takeLatest(VERIFY_CODE_START, verifyCode);
}