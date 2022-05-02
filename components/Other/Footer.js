import { useRef, useEffect, useState } from 'react'

export default function Footer() {
  return (
    <div className='bg-maindark pt-6 border-top border-secdark'>
      <div className="container">
        <div className="row gx-5">
          {/* Company Info */}
          <div className="col-md-4 mb-3 mb-md-0 text-center text-md-start">
            <p className='text-light fw-bolder fs-4 mb-1'>Feedback.ROCKS</p>
            <div className='d-flex d-md-block justify-content-center justify-content-md-start'>
              <div className='bg-light rounded-1' style={{ width: "6rem", height: "2px" }} />
            </div>
            <p className='text-gray500 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum doloremque illo unde quidem quasi autem!</p>
          </div>
          {/* FIRST SET OF LINKS */}
          <div className="text-center text-md-start col-md-3">
            <div className='d-flex justify-content-center justify-content-md-start'>
              <svg xmlns="http://www.w3.org/2000/svg" className='text-light pe-2' style={{ width: "25px", height: "25px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <p className='text-uppercase mb-2 pb-0 fw-bold text-gray600'>Social Links</p>
            </div>
            <div className='d-flex d-md-block justify-content-center justify-content-md-start'>
              <div className='bg-light rounded-1' style={{ width: "6rem", height: "2px" }} />
            </div>
            <ul className="list-unstyled mt-3">
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none">
                  <span className='text-gray500'>Facebook</span>
                </a>
              </li>
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none -ms-1">
                  <span className='text-gray500'>GitHub</span>
                </a>
              </li>
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none">
                  <span className='text-gray500'>Instagram</span>
                </a>
              </li>
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none">
                  <span className='text-gray500'>LinkedIn</span>
                </a>
              </li>
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none">
                  <span className='text-gray500'>Twitter</span>
                </a>
              </li>
            </ul>
          </div>
          {/* SECOND SET OF LINKS */}
          <div className="text-center text-md-start col-md-3">
            <div className='d-flex justify-content-center justify-content-md-start'>
              <svg xmlns="http://www.w3.org/2000/svg" className='text-light pe-2' style={{ width: "25px", height: "25px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path stroke-linecap="round" strokeLineJoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className='text-uppercase mb-2 pb-0 fw-bold text-gray600'>Contact</p>
            </div>
            <div className='d-flex d-md-block justify-content-center justify-content-md-start'>
              <div className='bg-light rounded-1' style={{ width: "6rem", height: "2px" }} />
            </div>
            <ul className="list-unstyled mt-3">
              <li className='pb-1'>
                <span className='text-gray500 cursor' data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Copy Phone Number">+0 123 456 789</span>
              </li>
              <li className='pb-1'>
                <span className='text-gray500'>Belmont, California(CA), 94002</span>
              </li>
              <li className='pb-1'>
                <span className='text-gray500 cursor' data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Copy Email Address">contact@feedback.rocks</span>  
              </li>
              <li className='pb-1'>
                <a href="" className='text-decoration-none hoverSocial'>
                  <span className='text-gray500'>Live Chat</span>
                </a>
              </li>
            </ul>
          </div>
          {/* THIRD SET OF LINKS */}
          <div className="text-center text-md-start col-md-2">
            <div className='d-flex justify-content-center justify-content-md-start'>
              <svg xmlns="http://www.w3.org/2000/svg" className='text-light pe-2' style={{ width: "25px", height: "25px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <p className='text-uppercase mb-2 pb-0 fw-bold text-gray600'>Other</p>
            </div>
            <div className='d-flex d-md-block justify-content-center justify-content-md-start'>
              <div className='bg-light rounded-1' style={{ width: "6rem", height: "2px" }} />
            </div>
            <ul className='list-unstyled mt-3'>
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none">
                  <span className='text-gray500'>Terms of Service</span>
                </a>
              </li>
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none -ms-1">
                  <span className='text-gray500'>Report a Bug</span>
                </a>
              </li>
              <li className='pb-1 hoverSocial'>
                <a href="" className="text-decoration-none">
                  <span className='text-gray500'>Cookies</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className='text-center'>
            <div className="text-light py-4 align-middle border-top border-gray700">
              &copy; Copyright 2022 - Feedback.ROCKS
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
