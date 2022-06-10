import { useState, useEffect, useRef, useContext } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import QuestionsCreate from '../../components/Survey/QuestionsCreate'
import Head from 'next/head'
import { useRouter }from 'next/router'
import { ToastContainer } from 'react-toastify';
import { errorBar, successBar, getProfile, createSurvey } from '../../utils/utils'
import { UserContext } from '../../contexts/UserContext'

export default function NewSurvey() {
  const router = useRouter();

  const { user } = useContext(UserContext);
  const [questionsList, setQuestionsList] = useState([{
    id: 1,
    text: ''
  }]);
  const [author, setAuthor] = useState("");
  const [limitNum, setLimitNum] = useState(-1);
  const questionRef = useRef([]);
  const titleRef = useRef("");
  const shortDescRef = useRef("");
  const descriptionRef = useRef("");
  const checksRef = useRef([]);

  const removeItem = async(index) => {
    if(index == 0 && questionsList.length == 1) return errorBar("You cannot remove first Item.");
    let inputArr = questionRef.current.map((x, ind) => {
      return {
        id: ind,
        text: x?.value
      }
    }).filter(val => val.text != undefined);
    inputArr.splice(index, 1);
    setQuestionsList([...inputArr])
  }

  async function getUserProfile() {
    await getProfile(user.id).then((res) => setAuthor(res?._id));
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  const submitNewSurvey = async(e) => {
    e.preventDefault();
    if(titleRef.current.value == "") return errorBar("You didn't enter Survey Title");
    if(shortDescRef.current.value == "") return errorBar("You didn't enter Short Description");
    if(descriptionRef.current.value == "") return errorBar("You didn't enter Survey Description");
    if(questionRef.current.map((v) => v.value)?.length < 1) return errorBar("You need to provide at least 1 question");
    if(limitNum < 1 || limitNum == "") setLimitNum(-1);

    let details = {
      user: user?.id || "-1",
      title: titleRef.current.value,
      shortDescription: shortDescRef.current.value,
      description: descriptionRef.current.value,
      questions: questionRef.current.map((v) => v.value),
      limit: limitNum,
      needAuth: checksRef.current.auth.checked,
      publicResults: checksRef.current.results.checked,
      publicList: checksRef.current.explore.checked,
      date: new Date().toLocaleDateString()
    }

    await createSurvey(details).then((result) => {
      if(result.code == 201) {
        successBar("Survey have been created, redirecting.");
        setTimeout(() => router.push(`/surveys/${result.response.id}`), 3000);
      }
    });
  }

  return (
    <div className='hideOverflow'>
      <Navigation active="survey" />
      <Head>
        <title>Feedback App - Create Survey</title>
      </Head>
      <div>
        <div className="bg-maindark">
          <form className="container py-6" onSubmit={(async(e) => await submitNewSurvey(e))}>
            <div className="row">
              <div className="d-flex justify-content-center">
                <div className="bg-bluedark shadow w-100 w-md-75 rounded-1">
                  {/* FORMS */}
                  <div className='px-md-5'>
                    <div className='mb-3'>
                      <div className="titleSection pt-4">
                        <p className='text-light fs-3 fw-bold mb-0'>Details</p>
                        <p className='text-gray600'>Set details for Survey like Title, Description and list of Questions.</p>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="surveyTitle" className="form-label text-light">Survey Title</label>
                        <input type="text" ref={titleRef} className="form-control border-secdark bg-secdark text-light" placeholder="Title for Survey" id="surveyTitle" />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="survShortDesc" className="form-label text-light">Short Survey Description</label>
                        <input type="text" ref={shortDescRef} minLength={6} maxLength={256} className="form-control border-secdark bg-secdark text-light" placeholder="Short description of this Survey." id="survShortDesc" />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="surveyDescription" className="form-label text-light">Survey Description</label>
                        <textarea className="form-control border-secdark bg-secdark text-light" ref={descriptionRef} placeholder="Description for Survey" id="surveyDescription" style={{ height: "8rem", resize: "none" }} />
                      </div>
                      <div className="mt-3">
                        <p className='text-light mb-2'>List of Questions</p>
                        <QuestionsCreate removeItem={removeItem} questionRef={questionRef} questions={questionsList} className="mb-4" />
                        <div className='border-secdark bg-secdark text-light py-1 mt-4 text-center rounded-1 hoverEffect cursor' onClick={(() => setQuestionsList([...questionsList, '']))}>➕</div>
                      </div>
                    </div>
                  </div>
                  {/* OPTIONS */}
                  <div className="px-5 mb-3 pt-3">
                    <div>
                      <p className='fs-3 text-light fw-bold mb-0'>Options</p>
                      <p className='text-gray600'>Set advanced Survey details.</p>
                    </div>
                    {/* CHECKMARKS */}
                    <div className='mb-5'>
                      <div className="form-check">
                        <input className="form-check-input" ref={((el) => (checksRef.current["results"] = el))} defaultChecked={true} type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label text-light" htmlFor="flexCheckDefault">Allow everyone to see results?</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label text-light" ref={((el) => (checksRef.current["auth"] = el))} htmlFor="flexCheckDefault">Does Users need to be Registered?</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" ref={((el) => (checksRef.current["explore"] = el))} defaultChecked={true} type="checkbox" value="" id="explorePoll" />
                        <label className="form-check-label text-light" htmlFor="explorePoll">Is this Poll Listed in 'Explore Polls' section?</label>
                      </div>
                      <div className="">
                        <input className="m-0 p-0 bg-secdark limitNumber text-light rounded-1 border-0" onChange={((e) => setLimitNum(e.target.value))} style={{ "width": "50px", "outline": "none" }} type="number" id="limitNumber" />
                        <label className="form-check-label text-light ps-2" htmlFor="limitNumber">How much users can answer Survey?</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center pb-3">
                    <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                  </div>
                  <div className='px-5 py-3 pb-4 text-center'>
                    <button type="submit" className="btn btn-primary btn-lg me-2">Finish</button>
                    <button type="button" onClick={(() => router.push("/surveys"))} className="btn btn-danger btn-lg ms-2">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}
