import { useEffect, useState, useMemo } from 'react'
import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { dom } from "@fortawesome/fontawesome-svg-core";
import '../scss/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { decodeToken, getProfile } from '../utils/utils';
import { UserContext } from '../contexts/UserContext'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    id: null,
    username: null,
    profileName: null,
    mail: null,
    picture: null,
    role: 0,  
  });

  useEffect(() => {
    async function loadBootstrap() {
      const { Tooltip } = await import("../node_modules/bootstrap/dist/js/bootstrap");

      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl)
      });
    }
    async function getUser() {
      await decodeToken().then(async(res) => {
        await getProfile(res?.id).then(async(usr) => {
          if(!usr) return setUser({
            id: null,
            username: null,
            profileName: null,
            mail: null,
            picture: null,
            role: 0,         
          })
          
          setUser({
            id: usr?.id,
            username: usr?.username,
            profileName: usr?.profileName,
            mail: usr?.mail,
            picture: usr?.profilePicture,
            role: usr?.role
          });
        })
      })
    }

    loadBootstrap();
    getUser();
  }, []);

  const ctxValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossOrigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{dom.css()}</style>
      </Head>
      <UserContext.Provider value={ctxValue}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
