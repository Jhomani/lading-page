import React, { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { setDefaultColorMode, getNavigatorLocale } from '@utils/global'
import { setDefaultValues } from "@redux/actions/app";
import Layout from '@landing/Layout';

import { copyFileSync } from 'fs';
import { COPYFILE_FICLONE } from 'constants';

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

  console.log('int maing component yeah....')
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default memo(IndexPage);