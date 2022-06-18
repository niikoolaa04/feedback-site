import Link from 'next/link'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { deleteSurvey } from '../../utils/utils';
import { successBar } from '../../utils/utils';

export default function BrowseList({ surveys }) {
  const { user } = useContext(UserContext);

  const handleDelete = async(id) => {
    await deleteSurvey(id).then(async() => {
      successBar("Survey with ID " + id + " have been deleted.");
    });
  }

  return surveys?.map((x, i) => (
    <div className='mt-3'>
      <div className='bg-secdark py-3 px-3 rounded-2' key={x.id}>
        <div className="row">
          <div className="col-md-6">
            <p className='text-light fw-bold mt-0 mb-1'>{ x.title } (#{ x?.id }) - <span className='text-gray500 fw-normal'>{ x?.submitters?.length } replies</span>
            </p>
            <p className='text-light mt-0 mb-0'>{ x.shortDescription }</p>
          </div>
          <div className="col-md-6 justify-content-md-end pt-4 pt-md-0 pe-4 d-flex align-items-center align-middle">
            <Link href={`/surveys/${x?.id}`}>
              <button className='btn btn-primary me-3'>View Survey</button>
            </Link>
            {
              x?.publicResults == true ?
              <Link href={`/surveys/${x?.id}/results/0`}>
                <button className='btn btn-success me-3'>Results</button>
              </Link> : ''
            }
            {
              user?.role > 0 ?
              <button className="btn btn-danger" onClick={(async() => await handleDelete(x?.id))}>Delete</button> : ''
            }
          </div>
        </div>
      </div>
    </div>
  ))
}
