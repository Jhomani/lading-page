import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import withReduxStore from "@utils/with-redux-store";
import Main from "src/containers/Main";
import Router from 'next/router';

// import 'nprogress/nprogress.css';
import 'styles/index.less';

// NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', (url) => {
  // NProgress.start();
});
Router.events.on('routeChangeComplete', (url) => {
  // NProgress.done();
});
Router.events.on('routeChangeError', () => {
  // NProgress.done();
});

function MyApp({ Component, pageProps, reduxStore }) {
  console.log('into re-render app')

  useEffect(() => {
  }, []);

  return (
    <Provider store={reduxStore}>
      <Main pageProps={pageProps} Component={Component} />
    </Provider>
  )
}

export default withReduxStore(MyApp);
