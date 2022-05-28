import { useEffect, useState } from 'react'
import Pagination from '../Other/Pagination'
import { getSurvey, getProfile } from '../../utils/utils';
import { useRouter } from 'next/router';
import DescriptionBox from '../Other/DescriptionBox';

export default function SurveyResult() {
  const router = useRouter()
  const { id, resultId } = router.query;
  const [results, setResults] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState({
    id: 0,
    title: '',
    description: '',
    submitters: [{}]
  });
  
  useEffect(() => {
    if(!router.isReady) return;
    async function fetchSurvey(resId = resultId) {
      const surveyData = await getSurvey(id).then(async(result) => {
        let currSurvey = result?.submitters[resId];
        setResults(currSurvey);
        setSurvey(result);
        setLoading(false);
  
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
  
        return result;
      })
  
      return surveyData;
    }

    fetchSurvey().then(async(res) => {
      console.log(survey);
    })
  }, [resultId, router.isReady])

  return (
    <div>
      <div className='px-md-5 mb-3 pt-4'>
        <p className='text-light fs-3 fw-bold mb-0'>{ survey?.title } (#{ survey?.id })</p>
        <p className='text-gray600'>This is what survey is about & some other details.</p>
        <DescriptionBox text={survey?.description} />
      </div>
      <div className="px-md-5 mb-4 pt-3">
        <p className="text-light fs-3 fw-bold mb-0">Survey Questions & Answers</p>
        <p className='text-gray600'>These are questions on which you can answer.</p>

        {
          survey?.submitters[resultId]?.answers?.map((q, i) => (
          <div className='' key={q.id + Math.random() * 5116785}>
            { q.id }
            <div className='text-light py-2 w-100'>
              <div className="row">
                <div className='d-flex'>
                  <span className={ 'w-100 py-2 px-3 rounded-1 bg-secdark'} key={q.id + "-123"}>
                    <span className='text-gray500 pe-2'>{q.id+1}.</span>{q.question}
                    <input type="text" className="form-control bg-maindark mt-2 mb-1 border-start border-secdark bg-secdark text-light" 
                      defaultValue={q.answer}
                      disabled={true} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          ))
        }
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
                    <p className='text-light'>- Guest answered this Survey (learn more)</p>
                  </div> :
                  <>
                    <p className='text-light'>- <b>{ userProfile?.username }</b> answered this Survey (view profile)</p>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className='btn btn-secondary btn-lg' onClick={(() => {
        router.push(`/surveys/${id}/results/${parseInt(resultId) - 1}`)
      })}>Prev Page</button>
      <button className='btn btn-secondary btn-lg' onClick={(() => {
        router.push(`/surveys/${id}/results/${parseInt(resultId) + 1}`)
      })}>Next Page</button>
    </div>
  )
}
