import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Other/Footer';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import UsersList from '../../components/Admin/UsersList';

export default function Users() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='hideOverflow'>
      <Navigation active='browse' />
      <Head>
        <title>Feedback - Browse Polls</title>
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container d-flex justify-content-center py-6">
            <div className="row">
              <p className='text-white px-4 px-md-0 p-0 m-0 fs-4 fw-bold'>List of registered Users</p>
              <p className='text-gray600 p-0 m-0 mb-3 px-4 px-md-0'>All users registered to our site.</p>
              <UsersList />
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </div>
  )
}
