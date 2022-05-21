import { useState, useEffect, useRef } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { myLoader } from '../../utils/utils'
import '../../styles/Profile.module.css'

export default function Profile() {
  return (
    <div className='hideOverflow'>
      <Navigation active='profile' />
      <Head>
        <title>Feedback App - Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <div className='bg-maindark'>
          <div className="container py-6">
            {/* MAIN PROFILE - USERNAME, ABOUT ME, PROFILE PICTURE */}
            <div className='mb-5'>
              <div className='d-flex flex-row'>
                <Image className='rounded-3 mw-100' src="https://www.komysafety.com/images/banner/no-image.png" loader={  myLoader} width="128px" height="128px" />
                <div className='d-flex flex-column'>
                  <p className='text-light fw-bold ps-3 mb-0 lh-sm'>User Username</p>
                  <p className='text-gray600 ps-3 mt-0 lh-sm mb-1'>@username
                    <span className='cursor text-gray500'>
                      <svg xmlns="http://www.w3.org/2000/svg" className='ms-2' style={{ height: "16px", width: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </p>
                  <p className='ps-3 text-gray500 mt-0 mb-1'>Joined on 5th of May, 2022</p>
                  <p className='ps-3 text-gray500'>⭐⭐⭐⭐⭐ (5)</p>
                </div>
                {/* SOME BUTTON HERE */}
              </div>
              <textarea disabled className="form-control border-secdark bg-secdark mt-4 text-light" placeholder="Question for your Poll" id="pollQuestion" style={{ height: "5rem", resize: "none" }} value={"This is Profile description."} />
            </div>
            {/* LIST OF PAST 5 POLLS */}
            <div className='mt-4'>
              <div>
                <p className='text-light fs-3 fw-bold mb-0'>Latest Polls</p>
                <p className='text-gray600'>Three latest polls that this User Created.</p>
              </div>
              <Link href={"/polls/2"}>
                <div className='bg-secdark pt-3 ps-2 pb-0 rounded-1 w-100 zoomIn cursor'>
                  <p className='text-light fw-bold mb-1 mt-0 fs-5'>Poll Title</p>
                  <div className='d-flex pt-0'>
                    <p className='text-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis ducimus in magnam corrupti sint sequi aliquam porro minus sed, nostrum cumque dolorum dolorem debitis consequatur.</p>
                  </div>
                  {/* <button className="btn btn-primary mb-3">View Poll</button> */}
                </div>
              </Link>
              <button className="btn btn-success mt-3">View All Polls</button>
            </div>
            {/* LIST OF PAST 5 SURVEYS */}
            <div className='mt-4'>
              <div>
                <p className='text-light fs-3 fw-bold mb-0'>Latest Surveys</p>
                <p className='text-gray600'>Three latest surveys that this User Created.</p>
              </div>
              <Link href={"/surveys/2"}>
                <div className=' bg-secdark pt-3 ps-2 pb-0 rounded-1 w-100 cursor zoomIn'>
                  <p className='text-light fw-bold mb-1 mt-0 fs-5'>Survey Title</p>
                  <div className='d-flex pt-0'>
                    <p className='text-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis ducimus in magnam corrupti sint sequi aliquam porro minus sed, nostrum cumque dolorum dolorem debitis consequatur.</p>
                  </div>
                </div>
              </Link>
              <button className="btn btn-success mt-3">View All Surveys</button>
            </div>
            {/* LIST OF PAST 3 COMMENTS */}
            <div className='mt-5'>
              <div>
                <p className='text-light fs-3 fw-bold mb-0'>Latest Comments</p>
                <p className='text-gray600'>Three latest comments that this User Received.</p>
              </div>
              <Link href={"/comments/2"}>
                <div className=' bg-secdark pt-3 ps-2 pb-0 rounded-1 w-100 cursor zoomIn'>
                  <div className='d-flex flex-row align-items-center'>
                    <div className='d-flex align-items-center'>
                      <Image className='rounded-circle' src="https://www.komysafety.com/images/banner/no-image.png" loader={  myLoader} width="32px" height="32px" />
                      <p className='text-light ms-2 mb-0 lh-sm'>User Username <span className='text-gray600 fs-7'>@username</span></p>
                    </div>
                  </div>
                  <div className='d-flex pt-2'>
                    <p className='text-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis ducimus in magnam corrupti sint sequi aliquam porro minus sed, nostrum cumque dolorum dolorem debitis consequatur.</p>
                  </div>
                </div>
              </Link>
              <button className="btn btn-success mt-3">View All Comments</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}