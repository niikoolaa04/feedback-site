import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DescriptionBox from '../Other/DescriptionBox'
import config from '../../config.json'
import { myLoader } from '../../utils/utils'

export default function ProfileWidget({ userProfile }) {
  return (
    <div>
      <div className='d-flex flex-row'>
        <Image className='rounded-3 mw-100' src={ userProfile?.profilePicture || config.defaultPicture } loader={myLoader} width="128px" height="128px" />
                                  
        <div className='d-flex flex-column'>
          <p className='text-light fw-bold ps-3 mb-0'>{ userProfile?.profileName }</p>
          <p className='ps-3 text-gray500'>{ userProfile?.likes?.length } - 👍 | { userProfile?.dislikes?.length } - 👎</p>
          <div className="d-block ps-3">
            <Link href={"/profile/" + userProfile?.id}>
              <button className='btn btn-primary btn-sm'>Visit Profile</button>
            </Link>
          </div>
        </div>
      </div>
      <DescriptionBox text={userProfile?.about} />
    </div>
  )
}
