import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import config from '../../config.json'
import { myLoader } from '../../utils/utils'

export default function CommentList({ comments, firstComment, lastComment, currPage }) {
  const router = useRouter();
  const [commentList, setCommentList] = useState(comments)
  useEffect(() => {
    setCommentList(comments?.slice(firstComment, lastComment))
  }, [currPage, router.isReady, comments?.length]);

  return commentList?.map((c, i) => (
    <div className='mt-2' key={c.id + "-" + i}>
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
    </div>
  ))
}
