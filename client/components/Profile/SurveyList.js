import Link from 'next/link';

export default function SurveyList({ surveys }) {
  return surveys?.map((s, i) => (
    <div className='mt-2' key={s.id + "-" + i}>
      <Link href={`/surveys/${s?.id}`}>
        <div className='bg-secdark p-2 pb-0 rounded-1 w-100 cursor zoomIn'>
          <div className="row">
            <div className="col-md-8">
            <p className='text-light fw-bold mb-1 mt-0 fs-5'>{s?.title} - <span className='text-gray500 fw-normal'>{ s?.date ? `created on ${s?.date.split("T")[0]}` : 'No Creation Date'}</span></p>
              <div className='d-flex pt-0'>
                <p className='text-light'>{s?.shortDescription}</p>
              </div>
            </div>
            <div className="col-md-4 text-light d-flex align-items-center gap-3 justify-content-md-center">
              <div className='d-flex flex-column text-center'>
                <p className='p-0 m-0'>Answers</p>
                <span className='p-0 m-0'>{s?.submitters?.length}</span>
              </div>
              <div className='d-flex flex-column text-center'>
                <p className='p-0 m-0'>Questions</p>
                <span className='p-0 m-0'>{s?.questions?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ))
}
