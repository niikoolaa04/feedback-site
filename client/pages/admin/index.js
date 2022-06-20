import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Other/Footer';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPen, faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function Admin() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if(!router.isReady) return;
    if(auth?.role == 0) router.push("/");
  }, [router.isReady])

  return (
    <div className='hideOverflow'>
      <Navigation active='admin' />
      <Head>
        <title>Feedback - Admin Dashboard</title>
      </Head>
      <div className='bg-maindark'>
        <div className='container'>
          <div className="row py-6">
            <div>
              <p className='text-white px-4 px-md-0 p-0 m-0 fs-4 fw-bold'>Admin Dashboard</p>
              <p className='text-gray600 p-0 m-0 mb-3 px-4 px-md-0'>Manage website by using different tools.</p>
            </div>
            <div className="row d-flex justify-content-center mt-4">
              <Link href={"/admin/users"}>
                <div className="col-sm col-md-2 text-center mx-2 cursor zoomIn py-2 my-md-0">
                  <FontAwesomeIcon icon={faUsers} className="text-white fa-3x py-3" /> 
                  <p className='text-center text-white'>Manage Users</p>
                </div>
              </Link>
              <Link href={"/admin/manage"}>
                <div className="col-sm col-md-2 text-center mx-2 cursor zoomIn py-2 my-md-0">
                  <FontAwesomeIcon icon={faGear} className="text-white fa-3x py-3" /> 
                  <p className='text-center text-white'>Manage Site</p>
                </div>
              </Link>
              <div className="col-sm col-md-2 text-center mx-2 cursor zoomIn py-2 my-md-0" onClick={(() => router.push("/"))}>
                <FontAwesomeIcon icon={faRightFromBracket} className="text-white fa-3x py-3" /> 
                <p className='text-center text-white'>Exit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}