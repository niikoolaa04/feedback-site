import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import Choices from '../../components/Poll/Choices'

export default function NewPoll() {
  const inputRef = useRef([]);
  const [answers, setAnswers] = useState([{
    id: 1,
    text: ''
  }])
  const titleRef = useRef("");
  const descriptionRef = useRef("");

  const removeItem = async(index) => {
    /* Send Error Toast */
    if(index == 0 && answers.length == 1) return;
    let inputArr = inputRef.current.map((x, ind) => {
      return {
        id: ind,
        text: x?.value
      }
    }).filter(val => val.text != undefined);
    inputArr.splice(index, 1);
    setAnswers([...inputArr])
  }

  return (
    <div className='hideOverflow'>
      <Navigation active='polls' />
      <Head>
        <title>Feedback App - Create Poll</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <div className="bg-bluedark shadow w-75 rounded-1">
                {/* FORMS */}
                <div className='px-5'>
                  <div className='mb-3'>
                    <div className="titleSection pt-4">
                      <p className='text-light fs-3 fw-bold mb-0'>Details</p>
                      <p className='text-gray600'>Set general Poll details like Title, Description and similar.</p>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="pollTitle" className="form-label text-light">Poll Title</label>
                      <input type="text" ref={titleRef} className="form-control border-secdark bg-secdark text-light" placeholder="Title of Poll" id="pollTitle" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="pollQuestion" className="form-label text-light">Poll Question</label>
                      <textarea className="form-control border-secdark bg-secdark text-light" placeholder="Question for your Poll" ref={descriptionRef} id="pollQuestion" style={{ height: "8rem", resize: "none" }} />
                    </div>
                    <div className="mt-3">
                      <p className='text-light mb-2'>List of Choices</p>
                      <Choices removeItem={removeItem} setAnswers={setAnswers} answers={answers} inputRef={inputRef} className="mb-4" />
                      <div className='border-secdark bg-secdark text-light py-1 mt-4 text-center rounded-1 hoverEffect cursor' onClick={(() => setAnswers([...answers, '']))}>➕</div>
                    </div>
                  </div>
                </div>
                {/* OPTIONS */}
                <div className="px-5 mb-3 pt-3">
                  <div>
                    <p className='fs-3 text-light fw-bold mb-0'>Options</p>
                    <p className='text-gray600'>Set advanced poll details.</p>
                  </div>
                  {/* CHECKMARKS */}
                  <div className='mb-5'>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label text-light" htmlFor="flexCheckDefault">Allow everyone to see results?</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label text-light" htmlFor="flexCheckDefault">Does Voters need to be Registered?  </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pb-3">
                  <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                </div>
                <div className='px-5 py-3 pb-4 text-center'>
                  <button className="btn btn-primary btn-lg me-2">Finish</button>
                  <button className="btn btn-danger btn-lg ms-2">Cancel</button>
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