import React from 'react'
import Link from 'next/link'
import config from '../../config.json'

export default function CommentList({ comments }) {
  return comments?.map((c, i) => (
    <div>
      <Link href={"/comments/2"}>
        <div className=' bg-secdark pt-3 ps-2 pb-0 rounded-1 w-100 cursor zoomIn'>
          <div className='d-flex flex-row align-items-center'>
            <div className='d-flex align-items-center'>
              <Image className='rounded-circle' src={c?.author?.profilePicture || config.defaultPicture} loader={  myLoader} width="32px" height="32px" />
              <p className='text-light ms-2 mb-0 lh-sm'>{ c?.author?.profileName } <span className='text-gray600 fs-7'>@{ c?.author?.username }</span></p>
            </div>
          </div>
          <div className='d-flex pt-2'>
            <p className='text-light'>{ c?.comment }</p>
          </div>
        </div>
      </Link>
    </div>
  ))
}
