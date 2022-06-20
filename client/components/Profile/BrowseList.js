import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { deleteSurvey } from '../../utils/utils';
import { successBar } from '../../utils/utils';
import { myLoader } from '../../utils/utils';

export default function BrowseList({ profiles }) {
  const { user } = useContext(UserContext);

  return profiles?.map((x, i) => (
    <div className='mt-3'>
      <div className='bg-secdark py-3 px-3 rounded-2' key={x.id}>
        <div className="row">
          <div className="col-md-6">
            <div className='d-flex align-items-center'>
              <Image className='rounded-1' src={x?.profilePicture} loader={myLoader} width="64px" height="64px" />
              <div>
              <p className='text-light fw-bold mt-0 mb-0 ms-3'>{ x?.profileName } (#{ x?.id }) - <span className='text-gray500 fw-normal'>👍 {x?.likes?.length} - 👎 {x?.dislikes?.length}</span></p>
              <p className='text-gray700 mt-0 mb-0 ms-3 fs-7'>{x?.polls?.length} Polls | {x?.surveys?.length} Surveys</p>

              </div>
            </div>
            {/* <p className='text-light mt-0 mb-0'>{ x.shortDescription }</p> */}
          </div>
          <div className="col-md-6 justify-content-md-end pt-4 pt-md-0 pe-4 d-flex align-items-center align-middle">
            <Link href={`/profile/${x?.id}`}>
              <button className='btn btn-primary me-3'>View Profile</button>
            </Link>
            {
              user?.role > 0 ?
              <Link href={`/profile/${x?.id}/edit`}>
                <button className="btn btn-primary">Manage User</button>
              </Link> : ''
            }
          </div>
        </div>
      </div>
    </div>
  ))
}
