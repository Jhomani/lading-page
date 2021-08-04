import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import { setDefaultColorMode, getNavigatorLocale } from '@utils/global'
import { setDefaultValues } from "@redux/actions/app";
import injectReducer from '@utils/inject-reducer';
import injectSaga from '@utils/inject-saga';

import saga from './redux/sagas';
import reducer from './redux/reducer';

export const IndexPage = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  // this only run one time
  useEffect(() => {
    let locale = getNavigatorLocale();
    let mode = setDefaultColorMode();

    moment.locale(locale.toUpperCase());

    console.log(mode, locale);
    dispatch(setDefaultValues({ locale, mode }));
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

const withReducer = injectReducer({ key: 'global', reducer });
const withSagas = injectSaga({ key: 'Global', saga });

//@ts-ignore
export default compose(withSagas, withReducer)(IndexPage);