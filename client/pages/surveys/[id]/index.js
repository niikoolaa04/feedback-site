import { useState, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../../components/Navigation/Navigation'
import Footer from '../../../components/Other/Footer'
import Head from 'next/head'
import QuestionsList from '../../../components/Survey/QuestionsList'
import Pagination from '../../../components/Other/Pagination'
import { warningBar, getSurvey, submitSurvey, errorBar, getProfile } from '../../../utils/utils'
import { UserContext } from '../../../contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import DescriptionBox from '../../../components/Other/DescriptionBox'
import ProfileWidget from '../../../components/Profile/ProfileWidget'
import { useSelector } from 'react-redux'

export default function SurveyDetails() {
  const router = useRouter();
  const { id } = router.query;

  // const auth = useContext(UserContext)?.user;
  const auth = useSelector((state) => state.auth);
  const answerRef = useRef([]);
  
  const [questions, setQuestions] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [isLimit, setIsLimit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [viewResults, setViewResults] = useState(false);
  const [questionsPerPage] = useState(5);
  const [survey, setSurvey] = useState({
    id: 0,
    title: '',
    description: ''
  });

  const lastSurvey = currPage * questionsPerPage;
  const firstSurvey = lastSurvey - questionsPerPage;

  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  const handleChange = (index, event) => {
    inputFields[index - 1] = event.target.value;
    setInputFields(inputFields)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const surveyDetails = questions.map((v, i) => {
      return {
        id: i,
        question: v.text,
        answer: inputFields[i] || 'Not Answered'
      }
    })

    if(!auth?.id && survey?.needAuth == true) return errorBar("If you want to answer this Survey you need to be Logged in.");
    if(survey?.limit > 0 && survey?.submitters?.length == survey?.limit && user?.id) setIsLimit(true);
    if(isLimit == true) return errorBar(`This Survey has limit of ${result?.limit} users that can answer.`);
    await submitSurvey(id, auth, surveyDetails);
  }

  useEffect(() => {
    if(!router.isReady) return;
    async function fetchSurvey() {
      await getSurvey(id).then(async(result) => {
        if(!result) {
          router.push("/surveys");
          return;
        }
        await setQuestions(result?.questions?.map((x, i) => {
          return {
            id: i+1,
            text: x
          }
        }));
        await setSurvey(result);

        if(result?.publicResults == false && result?.user == auth?.id) {
          setViewResults(true)
        } else if(result?.publicResults == true) {
          setViewResults(true);
        }

        setLoading(false);
        if(result?.limit > 0 && result?.submitters.length == result?.limit && user?.id) setIsLimit(true);
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
    fetchSurvey();
  }, [router.isReady]);

  return (
    <div className='hideOverflow'>
      <Navigation active='surveys' />
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
                  <p className='text-light fs-3 fw-bold mb-0'>{ survey?.title } (#{ survey?.id })</p>
                  <p className='text-gray600'>{ survey?.shortDescription }</p>
                  <DescriptionBox text={survey?.description} />
                </div>
                <div className="px-md-5 mb-4 pt-3">
                  <p className="text-light fs-3 fw-bold mb-0">Survey Questions</p>
                  <p className='text-gray600'>These are questions on which you can answer.</p>
                  <QuestionsList loading={loading} questions={questions} inputFields={inputFields} handleChange={handleChange} 
                    lastSurvey={lastSurvey} firstSurvey={firstSurvey} 
                    currPage={currPage} answerRef={answerRef} />
                  <Pagination setCurrPage={setCurrPage} nextPage={nextPage} currPage={currPage} prevPage={prevPage} />
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
                  <button type='submit' className="btn btn-primary btn-lg me-2" onClick={(async(e) => await handleSubmit(e))}>Vote</button>
                  {
                    viewResults == true ? 
                    <button type='button' className="btn btn-success btn-lg ms-2">Results</button>
                    : ''
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