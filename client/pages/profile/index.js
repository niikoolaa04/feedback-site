import { useState, useEffect, useRef, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import { getAllProfiles, warningBar } from '../../utils/utils'
import BrowseList from '../../components/Profile/BrowseList'
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
  const [sort, setSort] = useState("none");
  
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
      await getAllProfiles().then(async(res) => {
        if(filters.user) {
          res = res.filter((x) => x.user == filters.user);
        }
        if(sort == "most_reputation") {
          res = res.sort((a, b) => b.likes.length - a.likes.length);
        } else if(sort == "least_reputation") {
          res = res.sort((a, b) => a.dislikes.length - b.dislikes.length);
        } else if(sort == "most_polls") {
          res = res.sort((a, b) => b.polls.length - a.polls.length);
        } else if(sort == "least_polls") {
          res = res.sort((a, b) => a.polls.length - b.polls.length);
        } else if(sort == "most_surveys") {
          res = res.sort((a, b) => b.surveys.length - a.surveys.length);
        } else if(sort == "least_surveys") {
          res = res.sort((a, b) => a.surveys.length - b.surveys.length);
        } else if(sort == "staff") {
          res = res.filter((t) => t.role > 0)
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
      <Navigation active='browse' />
      <Head>
        <title>Feedback - Browse Profiles</title>
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <p className='text-light fs-2 fw-bold mb-0'>Profiles List</p>
              <p className='text-gray600 mb-0 mt-0'>List of all users registered to our site.</p>
              <div className='mb-3 '>
                <div className="btn-group mt-3">
                  <button type="button" className="btn btn-secondary dropdown-toggle bg-secdark border-maindark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort Profiles
                  </button>
                  <div className="dropdown-menu dropdown-menu-dark bg-maindark">
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("most_reputation"))}>Most Reputation</button>
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("least_reputation"))}>Least Reputation</button>
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("most_polls"))}>Most Polls</button>
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("least_polls"))}>Least Polls</button>
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("most_surveys"))}>Most Surveys</button>
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("least_surveys"))}>Least Surveys</button>
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("staff"))}>Website Staff</button>
                  </div>
                </div>
              </div>
              <BrowseList profiles={items} />
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