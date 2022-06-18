import { useState, useEffect, useRef, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import { getAllPolls, warningBar, errorBar } from '../../utils/utils'
import BrowseList from '../../components/Poll/BrowseList'
import { ToastContainer } from 'react-toastify'

export default function Polls() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    user: router.query.author || null
  });
  const [polls, setPolls] = useState([]);
  const [perPage] = useState(3);
  const [next, setNext] = useState(perPage);
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("none");
  
  const nextPage = () => {
    if(items.length == polls?.length) return warningBar("You have reached end of list.", 2000);
    let slicedPolls = polls?.slice(next, parseInt(next) + parseInt(perPage));
    setItems(items.concat(slicedPolls));
    setNext(next + perPage);
  };

  useEffect(() => {
    if(!router.isReady) return;
    setFilters({
      user: router.query.author || null
    });
  }, [router.isReady])

  useEffect(() => {
    const fetchPolls = async() => {
      await getAllPolls().then(async(res) => {
        if(filters.author) {
          res = res.filter((x) => x.user == filters.user)
        }
        if(sort == "most_votes") {
          res = res.sort((a, b) => b.submitters.length - a.submitters.length);
        } else if(sort == "least_votes") {
          res = res.sort((a, b) => a.submitters.length - b.submitters.length);
        }
        setPolls(res);
        setNext(perPage);
        setItems(res?.slice(0, next));
      })
    }

    fetchPolls();
  }, [sort]);

  return (
    <div className='hideOverflow'>
      <Navigation active='browse' />
      <Head>
        <title>Feedback - Browse Polls</title>
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <p className='text-light fs-2 fw-bold mb-0'>Polls list</p>
              <p className='text-gray600 mb-0 mt-0'>List of all public polls for which you can vote.</p>
              <div className='mb-3 '>
                <div className="btn-group mt-3">
                  <button type="button" className="btn btn-secondary dropdown-toggle bg-secdark border-maindark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort Polls
                  </button>
                  <div className="dropdown-menu dropdown-menu-dark bg-maindark">
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("most_votes"))}>Most Votes</button>
                    <button className="dropdown-item text-white" type="button" onClick={(() => setSort("least_votes"))}>Least Votes</button>
                    {/* <button className="dropdown-item text-white" type="button">Administrator</button> */}
                  </div>
                </div>
              </div>
              <BrowseList polls={items} />
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