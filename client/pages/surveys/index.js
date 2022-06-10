import { useState, useEffect, useRef, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import { getAllSurveys, warningBar, errorBar } from '../../utils/utils'
import BrowseList from '../../components/Survey/BrowseList'
import { ToastContainer } from 'react-toastify'

export default function Surveys() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    user: router.query.author || null
  });
  const [surveys, setSurveys] = useState([]);
  const [perPage] = useState(3);
  const [next, setNext] = useState(perPage);
  const [items, setItems] = useState([]);
  
  const nextPage = () => {
    if(items.length == surveys?.length) return warningBar("You have reached end of list.", 2000);
    let slicedSurveys = surveys?.slice(next, parseInt(next) + parseInt(perPage));
    setItems(items.concat(slicedSurveys));
    setNext(next + perPage);
  };

  useEffect(() => {
    if(!router.isReady) return;
    setFilters({
      user: router.query.author || null
    });
  }, [router.isReady])

  useEffect(() => {
    const fetchSurveys = async() => {
      await getAllSurveys().then(async(res) => {
        if(filters.user) {
          res = res.filter((x) => x.user == filters.user);
        }
        setSurveys(res);
        setNext(perPage);
        setItems(res?.slice(0, next));
      })
    }

    fetchSurveys();
  }, [])

  return (
    <div className='hideOverflow'>
      <Navigation active='surveys' />
      <Head>
        <title>Feedback - Browse Surveys</title>
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <p className='text-light fs-2 fw-bold mb-0'>Surveys list</p>
              <p className='text-gray600 mb-3 mt-0'>
                { filters.user ? `List of all Surveys that meet your Filter (User)` : 'List of all public surveys which you can answer.' }
              </p>
              <BrowseList surveys={items} />
            </div>
            <div className='text-center mt-5 mb-0'>
              <button className='btn btn-primary btn-lg' onClick={(() => nextPage())}>Load More</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}