import Link from 'next/link'

export default function BrowseList({ polls }) {
  return polls?.map((x, i) => (
    <div className='mt-3'>
      <div className='bg-secdark py-3 px-3 rounded-2' key={x.id}>
        <div className="row">
          <div className="col-md-6">
            <p className='text-light fw-bold mt-0 mb-1'>{ x.title } (#{ x?.id }) - <span className='text-gray500 fw-normal'>{ x?.submitters?.length } voters</span>
            </p>
            <p className='text-light mt-0 mb-0'>{ x.shortDescription }</p>
          </div>
          <div className="col-md-6 justify-content-md-end pt-4 pt-md-0 pe-4 d-flex align-items-center align-middle">
            <Link href={`/polls/${x?.id}`}>
              <button className='btn btn-primary me-3'>View Poll</button>
            </Link>
            {
              x?.publicResults == true ?
              <Link href={`/polls/${x?.id}/results`}>
                <button className='btn btn-success'>Results</button>
              </Link> : ''
            }
          </div>
        </div>
      </div>
    </div>
  ))
}
