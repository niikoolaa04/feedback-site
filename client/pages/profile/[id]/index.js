import { useState, useEffect, useRef, useContext } from 'react'
import Navigation from '../../../components/Navigation/Navigation'
import Footer from '../../../components/Other/Footer'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import DescriptionBox from '../../../components/Other/DescriptionBox'
import Pagination from '../../../components/Other/Pagination'
import config from '../../../config.json';
import CommentList from '../../../components/Profile/CommentList'
import SurveyList from '../../../components/Profile/SurveyList'
import { getProfile, myLoader, createComment,
   errorBar, getAllComments, successBar, getUserPolls, getUserSurveys, postReputation } from '../../../utils/utils'
import PollList from '../../../components/Profile/PollList'
import { UserContext } from '../../../contexts/UserContext'
import Badge from '../../../components/Admin/Badge'

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const commentRef = useRef("");
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [comments, setComments] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [polls, setPolls] = useState([]);
  const [commentsPerPage] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [repStatus, setRepStatus] = useState('neutral');
  const [repCount, setRepCount] = useState({ pos: 0, neg: 0 });

  const lastComment = currPage * commentsPerPage;
  const firstComment = lastComment - commentsPerPage;

  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  const submitReputation = async(type) => {
    if(!user || !user?.id) return errorBar("You must be authorized to be able to leave reputation.");
    if(user?.id == id) return errorBar("You can't leave reputation on yourself.");
    await postReputation(type, id, user?.id).then(async(res) => {
      if(typeof(res.response) == "string") successBar("You've removed Reputation from this User");
      else successBar("You've left Reputation for this User", 3000);
      await getUserProfile()
    });
  }

  const submitComment = async(e) => {
    e.preventDefault();
    if(commentRef.current.value == "") return errorBar("You didn't enter comment text.");

    let commDetails = {
      author: {
        id,
        profileName: userProfile?.profileName,
        username: userProfile?.username,
        profilePicture: userProfile?.profilePicture
      },
      comment: commentRef.current.value
    }

    await createComment(commDetails).then(() => {
      successBar("Comment have been posted successfully")
      commentRef.current.value = "";
    });
  }

  async function getUserProfile() {
    await getProfile(id).then((res) => {
      if(!res) {
        router.push({
          pathname: "/404",
          query: {
            errorType: "profileNotFound",
            error: "Profile with such ID couldn't be found"
          }
        });
        return;
      }
      setUserProfile(res);
      setRepCount({
        pos: res?.likes?.length || 0,
        neg: res?.dislikes?.length || 0
      });
      if(user && user?.id) {
        if(res?.likes?.find((like) => like.user == user?.id)) setRepStatus('positive');
        else if(res?.dislikes?.find((dislike) => dislike.user == user?.id)) setRepStatus('negative');
        else setRepStatus('neutral')
      }
    });
  }

  useEffect(() => {
    console.log(user)
    if(!router.isReady) return;
    async function fetchComments() {
      await getAllComments(id).then((res) => {
        if(!res) return console.log(res); 
        setComments(res);
      });
    }
    async function fetchPolls() {
      await getUserPolls(id).then((res) => {
        if(!res) return console.log(res); 
        setPolls(res?.slice(0, 3));
      });
    }
    async function fetchSurveys() {
      await getUserSurveys(id).then((res) => {
        if(!res) return console.log(res); 
        setSurveys(res?.slice(0, 3));
      });
    }
    
    getUserProfile();
    fetchComments();
    fetchSurveys();
    fetchPolls();
  }, [router.isReady]);
  
  return (
    <div className='hideOverflow'>
      <Navigation active='profile' />
      <Head>
        <title>Feedback - Profile</title>
      </Head>
      <div className="">
        <div className='bg-maindark'>
          <div className="container py-6">
            {/* MAIN PROFILE - USERNAME, ABOUT ME, PROFILE PICTURE */}
            <div className='mb-5'>
              <div className='d-flex flex-row'>
                <Image className='rounded-3 mw-100' src={userProfile?.profilePicture || config.defaultImage} loader={myLoader} width="128px" height="128px" />
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center'>
                    <p className='text-light fw-bold ps-3 mb-0 lh-sm'>{ userProfile?.profileName }</p>
                    <Badge type={"admin"} />
                  </div>
                  <p className='text-gray600 ps-3 mt-0 lh-sm mb-1'>@{ userProfile?.username }
                    <span className='cursor text-gray500' data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Copy Username" onClick={(() => {
                      navigator.clipboard.writeText(userProfile?.username)
                    })}>
                      <svg xmlns="http://www.w3.org/2000/svg" className='ms-2' style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </p>
                  <p className='ps-3 text-gray500 mt-0 mb-1'>Joined on 5th of May, 2022</p>
                  {
                    repStatus == 'neutral' ?
                    <p className='ps-3 text-gray500 cursor'><span onClick={(async() => await submitReputation("pos"))}>{ repCount.pos } - 👍</span> | <span onClick={(async() => await submitReputation("neg"))}>{ repCount.neg } - 👎</span></p> :
                    repStatus == 'positive' ?
                    <p className='ps-3 text-gray500 cursor'><span onClick={(async() => await submitReputation("pos"))}>{ repCount.pos } - 👍</span> | <span onClick={(async() => await submitReputation("neg"))} className='opacity-50'>{ repCount.neg } - 👎</span></p> :
                    <p className='ps-3 text-gray500 cursor'><span onClick={(async() => await submitReputation("pos"))} className='opacity-50'>{ repCount.pos } - 👍</span> | <span onClick={(async() => await submitReputation("neg"))}>{ repCount.neg } - 👎</span></p>
                  }
                </div>
                {/* SOME BUTTON HERE */}
              </div>
              <DescriptionBox text={userProfile?.about} />
            </div>
            {/* LIST OF PAST 5 POLLS */}
            <div className='mt-4'>
              <div>
                <p className='text-light fs-3 fw-bold mb-0'>Latest Polls</p>
                <p className='text-gray600'>Three latest polls that this User Created.</p>
              </div>
              {
                polls?.length > 0 ? <div>
                  <PollList polls={polls} />
                  <Link href={`/polls?author=${userProfile?.id}`}>
                    <button className="btn btn-success mt-3">View All Polls</button>
                  </Link>
                </div> : 
                <div className='bg-secdark text-light pb-0 rounded-1 w-50'>
                  <p className='m-0 p-2'>This User didn't create any Poll, yet.</p>
                </div>
              }
            </div>
            {/* LIST OF PAST 5 SURVEYS */}
            <div className='mt-4'>
              <div>
                <p className='text-light fs-3 fw-bold mb-0'>Latest Surveys</p>
                <p className='text-gray600'>Three latest surveys that this User Created.</p>
              </div>
              {
                surveys?.length > 0 ? <div>
                  <SurveyList surveys={surveys} />
                  <Link href={`/surveys?author=${userProfile?.id}`}>
                    <button className="btn btn-success mt-3">View All Surveys</button>
                  </Link>
                </div> : 
                <div className='bg-secdark text-light pb-0 rounded-1 w-50'>
                  <p className='m-0 p-2'>This User didn't create any Survey, yet.</p>
                </div>
              }
            </div>
            {/* LIST OF PAST 3 COMMENTS */}
            <div className='mt-5'>
              <div>
                <p className='text-light fs-3 fw-bold mb-0'>Latest Comments</p>
                <p className='text-gray600'>Comments that have been posted on this User's Profile.</p>
              </div>
              {
                comments?.length > 0 ?
                <div>
                  <CommentList comments={comments} 
                    firstComment={firstComment} lastComment={lastComment}
                    currPage={currPage} />
                  <Pagination setCurrPage={setCurrPage} nextPage={nextPage} currPage={currPage} prevPage={prevPage} />
                </div> :
                <div>
                  <div className='bg-secdark text-light pb-0 rounded-1 w-50'>
                    <p className='m-0 p-2'>There are no comments posted on this Profile.</p>
                  </div>
                </div>
              }
            </div>
            {
              (user?.id != null || user?.id > 0) && userProfile?.id != user?.id ?
              <div>
                <div className="mb-2 mt-4">
                  <label htmlFor="profileComm" className="form-label text-light">Leave comment</label>
                  <textarea className="form-control border-secdark bg-secdark text-light" ref={commentRef} placeholder="Leave your comment here." id="profileComm" style={{ height: "5rem", resize: "none" }} />
                </div>
                <button className='btn btn-success' onClick={(async(e) => {
                  await submitComment(e)
                })}>Comment</button>
              </div> :
              <div>
                <div className="mb-2 mt-4">
                  <label htmlFor="profileComm" className="form-label text-light">Leave comment ({ user?.id == null ? 'You must be logged in' : 'You cannot leave comment to yourself' })</label>
                  <textarea disabled className="form-control border-secdark bg-secdark text-light" ref={commentRef} placeholder="Leave your comment here." id="profileComm" style={{ height: "5rem", resize: "none" }} />
                </div>
                <button disabled className='btn btn-success'>Comment</button>
              </div> 
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}