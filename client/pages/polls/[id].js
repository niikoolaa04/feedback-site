import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import ChoicesList from '../../components/Poll/ChoicesList'
import { errorBar, getPoll, getProfile, myLoader, submitPoll, warningBar } from '../../utils/utils'
import { UserContext } from '../../contexts/UserContext'
import { ToastContainer } from 'react-toastify'

export default function PollDetails() {
  const router = useRouter();
  const { id } = router.query;
  const currUser = useContext(UserContext)?.user;
  const [selected, setSelected] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [isLimit, setIsLimit] = useState(false);
  const [poll, setPoll] = useState({
    id: 0,
    title: '',
    question: ''
  });
  const [choices, setChoices] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const handleSubmit = async() => {
    if(selected == -1) return errorBar("You didn't choose option for which to vote.");
    if(!currUser?.id && result?.needAuth == true) return errorBar("If you want to vote for this Poll you need to be Logged in.");
    if(isLimit == true) return errorBar(`This Poll has limit of ${result?.limit} users that can vote`);
    await submitPoll(id, currUser, selected);
  }
  
  useEffect(() => {
    if(!router.isReady) return;
    async function fetchPoll() {
      await getPoll(id).then(async(result) => {
        setChoices(result?.options?.map((x, i) => {
          return {
            id: i+1,
            text: x
          }
        }));
        setPoll(result);
        setLoading(false);
        if(result?.limit > 0 && result?.submitters.length == result?.limit) setIsLimit(true);
        if(result?.user == "-1" || !result?.user) {
          setUserProfile({
            id: -1,
            username: "N/A"
          });
        } else {
          await getProfile(result?.user).then((res) => {
            if(res?.user) setUserProfile(res);
          });
        }
        if(!currUser?.id && result?.needAuth == true) warningBar("If you want to vote for this Poll you need to be Logged in.");
      })
    }
    fetchPoll();
  }, [router.isReady]);
  
  return (
    <div className='hideOverflow'>
      <Navigation active='polls' />
      <Head>
        <title>Feedback App - Poll #{id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <div className='bg-maindark'>
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <div className="bg-bluedark shadow w-100 w-md-75 rounded-1">
                {/* TITLE & DESCRIPTION */}
                <div className='px-md-5 mb-3 pt-4'>
                  <p className='text-light fs-3 fw-bold mb-0'>{ poll?.title } (#{id})</p>
                  <p className='text-gray600'>This is what poll is about & some other details.</p>
                  <textarea disabled className="form-control border-secdark bg-secdark mt-3 text-light" placeholder="Question for your Poll" id="pollQuestion" style={{ height: "9rem", resize: "none" }}  value={poll?.question} />
                </div>
                <div className="px-md-5 mb-4 pt-3">
                  <p className="text-light fs-3 fw-bold mb-0">Poll Choices</p>
                  <p className='text-gray600'>These are options for which you can vote.</p>
                  {
                    loading == false ? <ChoicesList selected={selected} setSelected={setSelected} choices={choices} /> : 'false'
                  }
                </div>
                <div className="px-md-5 mb-5 pt-3">
                  <p className="text-light fs-3 fw-bold mb-0">Poll Author</p>
                  <div className='mt-3'>
                    <div className="container g-0">
                      <div className="row">
                        <div className=''>
                          {
                            userProfile?.id == -1 || !userProfile?.mail ? 
                            <div>
                              <p className='text-light'>- This poll was created by Guest User (learn more)</p>
                            </div> :
                            <>
                              <div className='d-flex flex-row'>
                                <Image className='rounded-3 mw-100' src="https://www.komysafety.com/images/banner/no-image.png" loader={  myLoader} width="128px" height="128px" />
                                  
                                  <div className='d-flex flex-column'>
                                    <p className='text-light fw-bold ps-3 mb-0'>{ userProfile?.username }</p>
                                    <p className='ps-3 text-gray500'>⭐⭐⭐⭐⭐ (5)</p>
                                    <div className="d-block ps-3">
                                      <Link href={"/profile/" + userProfile?.id}>
                                        <button className='btn btn-primary btn-sm'>Visit Profile</button>
                                      </Link>
                                    </div>
                                  </div>
                              </div>
                              <textarea disabled className="form-control border-secdark bg-secdark mt-3 text-light" placeholder="Question for your Poll" id="pollQuestion" style={{ height: "5rem", resize: "none" }} value={"This is Profile description."} />
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pb-3">
                  <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                </div>
                <div className='px-md-5 py-3 pb-4 text-center'>
                  <button className="btn btn-primary btn-lg me-2" onClick={(async(e) => {
                    e.preventDefault()
                    await handleSubmit()
                  })}>Vote</button>
                  {/* IF EVERYONE CAN SEE THEM */}
                  <button className="btn btn-success btn-lg ms-2">Results</button>
                </div>
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
