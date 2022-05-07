import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import Head from 'next/head'
import Image from 'next/image'
import QuestionsList from '../../components/Survey/QuestionsList'
import Pagination from '../../components/Other/Pagination'
import { myLoader } from '../../utils/utils'

export default function SurveyDetails() {
  const router = useRouter()
  const answerRef = useRef([]);
  const [inputFields, setInputFields] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [usersPerPage] = useState(5);
  const { id } = router.query;
  const lastSurvey = currPage * usersPerPage;
  const firstSurvey = lastSurvey - usersPerPage;

  const [questions, setQuestions] = useState([{
    id: 1,
    text: 'This is first question?'
  }, {
    id: 2,
    text: 'This is second question?'
  }, {
    id: 3,
    text: 'This is third question?'
  }, {
    id: 4,
    text: 'This is fourth question?'
  }, {
    id: 5,
    text: 'This is fifth question?'
  }, {
    id: 6,
    text: 'This is sixth question?'
  }]);

  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  const handleChange = (index, event) => {
    inputFields[index - 1] = event.target.value;
    setInputFields(inputFields)
  }

  return (
    <div className='hideOverflow'>
      <Navigation active='surveys' />
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
                  <p className='text-light fs-3 fw-bold mb-0'>Survey Title (#518)</p>
                  <p className='text-gray600'>This is what survey is about & some other details.</p>
                  <textarea disabled className="form-control border-secdark bg-secdark mt-3 text-light" placeholder="Question for your Poll" id="pollQuestion" style={{ height: "9rem", resize: "none" }} value={"This is poll description."} />
                </div>
                <div className="px-md-5 mb-4 pt-3">
                  <p className="text-light fs-3 fw-bold mb-0">Survey Questions</p>
                  <p className='text-gray600'>These are questions on which you can answer.</p>
                  <QuestionsList questions={questions} inputFields={inputFields} handleChange={handleChange} setQuestions={setQuestions} lastSurvey={lastSurvey} firstSurvey={firstSurvey} currPage={currPage} answerRef={answerRef} />
                  <Pagination setCurrPage={setCurrPage} nextPage={nextPage} currPage={currPage} prevPage={prevPage} />
                </div>
                <div className="px-md-5 mb-5 pt-3">
                  <p className="text-light fs-3 fw-bold mb-0">Poll Author</p>
                  <div className='mt-3'>

                    <div className="container g-0">
                      <div className="row">
                        <div className=''>
                          <div className='d-flex flex-row'>
                            <Image className='rounded-3 mw-100' src="https://www.komysafety.com/images/banner/no-image.png" loader={  myLoader} width="128px" height="128px" />
                            <div className='d-flex flex-column'>
                              <p className='text-light fw-bold ps-3 mb-0'>User Username</p>
                              <p className='ps-3 text-gray500'>⭐⭐⭐⭐⭐ (5)</p>
                              <div className="d-block ps-3">
                                <button className='btn btn-primary btn-sm'>Visit Profile</button>
                              </div>
                            </div>
                          </div>
                          <textarea disabled className="form-control border-secdark bg-secdark mt-3 text-light" placeholder="Question for your Poll" id="pollQuestion" style={{ height: "5rem", resize: "none" }} value={"This is Profile description."} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pb-3">
                  <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                </div>
                <div className='px-md-5 py-3 pb-4 text-center'>
                  <button className="btn btn-primary btn-lg me-2">Vote</button>
                  {/* IF EVERYONE CAN SEE THEM */}
                  <button className="btn btn-success btn-lg ms-2">Results</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
