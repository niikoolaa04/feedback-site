import { useEffect, useState, useMemo } from 'react'
import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { dom } from "@fortawesome/fontawesome-svg-core";
import '../scss/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import store from '../store/store';
import { Provider } from 'react-redux';
import { loadUser } from '../store/actions/authActions';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    async function loadBootstrap() {
      const { Tooltip } = await import("../node_modules/bootstrap/dist/js/bootstrap");

      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl)
      });
    }

    loadBootstrap();
  }, []);


  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{dom.css()}</style>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
