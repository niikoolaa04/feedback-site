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
  const [polls, setPolls] = useState([]);
  const [perPage] = useState(3);
  const [next, setNext] = useState(perPage);
  const [items, setItems] = useState([]);
  
  const nextPage = () => {
    if(items.length == polls?.length) return warningBar("You have reached end of list.", "top-right", 2000);
    let slicedPolls = polls?.slice(next, parseInt(next) + parseInt(perPage));
    setItems(items.concat(slicedPolls));
    setNext(next + perPage);
  };

  useEffect(() => {
    const fetchPolls = async() => {
      await getAllPolls().then(async(res) => {
        setPolls(res);
        setNext(perPage);
        setItems(res?.slice(0, next));
      })
    }

    fetchPolls();
  }, [])

  return (
    <div className='hideOverflow'>
      <Navigation active='polls' />
      <Head>
        <title>Feedback App - Browse Polls</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <p className='text-light fs-2 fw-bold mb-0'>Polls list</p>
              <p className='text-gray600 mb-3 mt-0'>List of all public polls for which you can vote.</p>
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