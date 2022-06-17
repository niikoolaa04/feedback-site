import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Other/Footer';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import UsersList from '../../components/Admin/UsersList';
import Pagination from '../../components/Other/Pagination';
import { getAllUsers } from '../../utils/utils';

export default function Users() {
  const router = useRouter();
  const { id } = router.query;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [usersPerPage] = useState(10);
  const lastUser = currPage * usersPerPage;
  const firstUser = lastUser - usersPerPage;

  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  useEffect(() => {
    if(!router.isReady) return;

    const getUserList = async() => {
      await getAllUsers().then(async(res) => {
        setUsers(res);
        setLoading(false);
      })
    }

    getUserList();
  }, []);

  return (
    <div className='hideOverflow'>
      <Navigation active='admin' />
      <Head>
        <title>Feedback - Admin Dashboard</title>
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container d-flex justify-content-center py-6">
            <div className="row">
              <p className='text-white px-4 px-md-0 p-0 m-0 fs-4 fw-bold'>Registered Users</p>
              <p className='text-gray600 p-0 m-0 mb-3 px-4 px-md-0'>All users registered on our site.</p>
              <UsersList users={users} firstUser={firstUser} lastUser={lastUser} currPage={currPage} loading={loading} />
              {
                users.length > 10 ?
                <Pagination setCurrPage={setCurrPage} nextPage={nextPage} currPage={currPage} prevPage={prevPage} />
                : ''
              }
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </div>
  )
}
