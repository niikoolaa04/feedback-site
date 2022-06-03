import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NotFound() {
  let router = useRouter();
  const { error, errorType } = router.query;

  return (
    <div className='vh-100 bg-maindark'>
      <div className="container-fluid">
        <div className="row m-0 p-0">
          <div className='text-center mt-5'>
            <img className='m-0 p-0' style={{ transform: "scale(1)" }} src="https://cdn-icons-png.flaticon.com/256/5058/5058040.png" alt="" />
            {
              error ? <div>
                <p className="text-light fs-3 pt-5 mb-1">Page requested couldn't be found.</p>
                <p className='m-0 p-0 text-gray600'>{error}</p>
              </div> : <p className="text-light fs-3 pt-5 mb-1">Page requested couldn't be found.</p>
            }
            <Link href="/">
              <button type="button" className="btn mt-4 btn-primary btn-lg">Return Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
