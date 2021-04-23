import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

if (process.browser) {
  NProgress.start();
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    NProgress.done();
    const ssrStyles = document.getElementById('ssr-styles');
    ssrStyles && document.head.removeChild(ssrStyles);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
      </Head>
    </>
  )
}
