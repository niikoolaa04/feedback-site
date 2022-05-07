import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'

export default function Register() {
  const testRef = useRef(null)
  return (
    <div className='hideOverflow'>
      <Head>
        <title>Feedback App - Create Poll</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-maindark'>
        <div>
          <div className="container py-5">
            <div className="row d-flex justify-content-center">
              <div className='w-100 w-md-50'>
                <p className='text-light fw-bolder fs-1 pt-2 mb-1'>Sign Up</p>
                <div className='bg-gray700 mb-4' style={{ width: "10rem", height: "1px" }} />
                <div className='form-floating mb-3'>
                  <input type="text" ref={testRef} className="form-control border-secdark bg-bluedark h-25 text-light" id="usernameField" />
                  <label htmlFor="usernameField" className="form-label text-light">Username</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="text" ref={testRef} className="form-control border-secdark bg-bluedark h-25 text-light" id="nameField" />
                  <label htmlFor="nameField" className="form-label text-light">Profile Name</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="text" ref={testRef} className="form-control border-secdark bg-bluedark h-25 text-light" id="emailField" />
                  <label htmlFor="emailField" className="form-label text-light">Email</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="password" ref={testRef} className="form-control border-secdark bg-bluedark h-25 text-light" id="pwField" />
                  <label htmlFor="pwField" className="form-label text-light">Password</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="password" ref={testRef} className="form-control border-secdark bg-bluedark h-25 text-light" id="confirmPwField" />
                  <label htmlFor="confirmPwField" className="form-label text-light">Confirm Password</label>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='bg-gray700 rounded-1 w-75' style={{ height: "1px" }} />
                </div>
                <div className='mt-4'>
                  <div className='d-flex justify-content-center w-100 mb-1'>
                    <button className="btn btn-primary w-50">Sign Up</button>
                  </div>
                  <div className='text-center'>
                    <a className='text-light text-decoration-none'>Already have an account? Sign In</a>
                  </div>
                </div>
                {/* FORMS */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
