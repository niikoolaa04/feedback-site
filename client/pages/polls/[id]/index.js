import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../../../components/Navigation/Navigation'
import Footer from '../../../components/Other/Footer'
import ChoicesList from '../../../components/Poll/ChoicesList'
import { errorBar, getPoll, getProfile, submitPoll, successBar, warningBar } from '../../../utils/utils'
import { UserContext } from '../../../contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import DescriptionBox from '../../../components/Other/DescriptionBox'
import ProfileWidget from '../../../components/Profile/ProfileWidget'
import { useSelector } from 'react-redux'

export default function PollDetails() {
  const router = useRouter();
  const { id } = router.query;

  const auth = useSelector((state) => state.auth);

  const [choices, setChoices] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [selected, setSelected] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [isLimit, setIsLimit] = useState(false);
  const [viewResults, setViewResults] = useState(false);
  const [poll, setPoll] = useState({
    id: 0,
    title: '',
    question: ''
  });

  const handleSubmit = async() => {
    if(selected == -1) return errorBar("You didn't choose option for which to vote.");
    if(!auth?.id && poll?.needAuth == true) return errorBar("If you want to vote for this Poll you need to be Logged in.");
    if(poll?.limit > 0 && poll?.submitters?.length == poll?.limit && auth?.id) setIsLimit(true);
    if(isLimit == true) return errorBar(`This Poll has limit of ${poll?.limit} users that can vote`);
    await submitPoll(id, user, selected).then((res) => {
      successBar("You have voted for this poll successfully.");
    });
  }
  
  useEffect(() => {
    if(!router.isReady) return;
    async function fetchPoll() {
      await getPoll(id).then(async(result) => {
        if(!result) {
          router.push("/polls");
          return;
        }
        setChoices(result?.options?.map((x, i) => {
          return {
            id: i+1,
            text: x
          }
        }));
        
        if(result?.publicResults == false && result?.user == auth?.id) {
          setViewResults(true)
        } else if(result?.publicResults == true) {
          setViewResults(true);
        }

        setPoll(result);
        setLoading(false);
        if(result?.limit > 0 && result?.submitters?.length == result?.limit && auth?.id) setIsLimit(true);
        if(result?.user == "-1" || !result?.user) {
          setUserProfile({
            id: -1,
            username: "N/A"
          });
        } else {
          await getProfile(result?.user).then((res) => {
            if(res) setUserProfile(res);
          });
        }
        if(!auth?.id && result?.needAuth == true) warningBar("If you want to vote for this Poll you need to be Logged in.");
      })
    }
    fetchPoll();
  }, [router.isReady]);
  
  return (
    <div className='hideOverflow'>
      <Navigation active='polls' />
      <Head>
        <title>Feedback - Poll #{id}</title>
      </Head>
      <div className="">
        <div className='bg-maindark'>
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <div className="bg-bluedark shadow w-100 w-md-75 rounded-1">
                {/* TITLE & DESCRIPTION */}
                <div className='px-md-5 mb-3 pt-4'>
                  <p className='text-light fs-3 fw-bold mb-0'>{ poll?.title } (#{id})</p>
                  <p className='text-gray600'>{poll?.shortDescription}</p>
                  <DescriptionBox text={poll?.question} />
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
                              <p className='text-light'>- This poll was created by Guest User</p>
                            </div> :
                            <ProfileWidget userProfile={userProfile} />
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

                  {
                    viewResults == true ? 
                    <Link href={`/polls/${id}/results`}>
                      <button className="btn btn-success btn-lg ms-2">Results</button>
                    </Link> : ''
                  }
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
