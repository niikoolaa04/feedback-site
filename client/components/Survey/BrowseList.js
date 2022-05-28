import Link from 'next/link'

export default function BrowseList({ surveys }) {
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
                <button className='btn btn-success'>Results</button>
              </Link> : ''
            }
          </div>
        </div>
      </div>
    </div>
  ))
}
