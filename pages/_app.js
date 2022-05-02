import { useEffect } from 'react'
import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import '../scss/bootstrap.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("../node_modules/bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{dom.css()}</style>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
