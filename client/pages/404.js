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
            <p className="text-light fs-3 pt-5 pb-2">Page requested couldn't be found.</p>
            {
              error ? <p className='text-gray600'>{error}</p> : ''
            }
            <Link href="/">
              <button type="button" className="btn btn-primary btn-lg">Return Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
