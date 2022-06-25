import { useState, useEffect, useContext, useMemo } from 'react'
import Navigation from '../../../../components/Navigation/Navigation'
import Footer from '../../../../components/Other/Footer'
import ResultsList from '../../../../components/Survey/ResultList'
import Pagination from '../../../../components/Other/Pagination'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getSurvey, getProfile } from '../../../../utils/utils'
import DescriptionBox from '../../../../components/Other/DescriptionBox'
import Loading from '../../../../components/Other/Loading'
import { useSelector } from 'react-redux'

export default function SurveyDetails() {
  const router = useRouter()
  const { id, resultId } = router.query;

  const auth = useSelector((state) => state.auth);

  const [currPage, setCurrPage] = useState(1);
  const [questionsPerPage] = useState(5)
  const [results, setResults] = useState([]);
  const [pageResults, setPageResults] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [publicResults, setPublicResults] = useState(false);
  const [survey, setSurvey] = useState({
    id: 0,
    title: '',
    description: '',
    submitters: [{}]
  });

  const lastSurvey = currPage * questionsPerPage;
  const firstSurvey = lastSurvey - questionsPerPage;

  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  useEffect(() => {
    if(!router.isReady) return;
    async function fetchSurvey(resId = resultId) {
      await getSurvey(id).then(async(result) => {
        setPublicResults(result?.publicResults);
        let currSurvey = result?.submitters[resId];
        setResults(currSurvey);
        setSurvey(result);
        setPageResults(currSurvey?.answers?.slice(firstSurvey, lastSurvey));
  
        if(currSurvey?.user == "-1" || !currSurvey?.user) {
          setUserProfile({
            id: -1,
            username: "N/A"
          });
        } else {
          await getProfile(currSurvey?.user).then((res) => {
            if(res) setUserProfile(res);
          });
        }
      })
    }

    fetchSurvey();
  }, [resultId, currPage]);

  useMemo(() => {
    if(survey?.publicResults == false && survey?.user !== auth.id) {
      return router.push("/surveys");
    }
  }, [auth, router.isReady, survey]);

  return (
    <div className='hideOverflow'>
      <Navigation active='surveys' />
      <Head>
        <title>Feedback - Survey</title>
      </Head>
      <div className="">
        <div className='bg-maindark'>
          <div className="container py-6">
            {
              publicResults == false && survey?.user != auth?.id ? <Loading w={"128px"} h={"128px"} /> : 
              <div className="row d-flex justify-content-center">
                <div className="bg-bluedark shadow w-100 w-md-75 rounded-1">
                  <div className='px-md-5 mb-3 pt-4'>
                    <p className='text-light fs-3 fw-bold mb-0'>{ survey?.title }</p>
                    <p className='text-gray600'>{ survey?.shortDescription }</p>
                    <DescriptionBox text={survey?.description} />
                  </div>
                  <div className="px-md-5 mb-4 pt-3">
                    <p className="text-light fs-3 fw-bold mb-0">Survey Questions & Answers</p>
                    <p className='text-gray600'>These are questions on which you can answer.</p>
                    <ResultsList loading={loading} setLoading={setLoading} firstSurvey={firstSurvey} lastSurvey={lastSurvey} pageResults={pageResults} />
                    <Pagination prevPage={prevPage} currPage={currPage} nextPage={nextPage} setCurrPage={setCurrPage}/>
                  </div>
                  <div className="px-md-5 mb-5 pt-3">
                    <p className="text-light fs-3 fw-bold mb-0">Poll Voter</p>
                    <div className='mt-3'>
                      <div className="container g-0">
                        <div className="row">
                          <div className=''>
                          {
                            userProfile?.id == -1 || !userProfile?.mail ? 
                            <div>
                              <p className='text-light'>- Guest answered this Survey</p>
                            </div> :
                            <>
                              <p className='text-light'>- <b>{ userProfile?.username }</b> answered this Survey (view profile)</p>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center pb-3">
                    <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                  </div>
                  <div className='px-md-5 py-3 pb-4 text-center'>
                    <button className="btn btn-primary btn-lg me-2" onClick={(() => {
                      setLoading(true)
                      router.push(`/surveys/${id}/results/${parseInt(resultId) - 1}`)
                    })}>Prev. Page</button>
                    <button className="btn btn-primary btn-lg me-2" onClick={(() => {
                      setLoading(true)
                      router.push(`/surveys/${id}/results/${parseInt(resultId) + 1}`)
                    })}>Next Page</button>
                  </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}