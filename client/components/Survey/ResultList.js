import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getSurvey } from "../../utils/utils";

export default function ResultsList({ results, loading, currPage, setLoading, pageResults, setPageResults, firstSurvey, lastSurvey }) {
  // const [pageResults, setPageResults] = useState(results?.slice(firstSurvey, lastSurvey));

  const router = useRouter();
  const { id, resultId } = router.query;

  useEffect(() => {
    console.log(pageResults)
  }, [pageResults])

  return pageResults?.map((q, i) => (
    <div className='' key={q.id + "" + Math.random() * 718959163190}>
      <div className='text-light py-2 w-100'>
        <div className="row">
          <div className='d-flex'>
            <span className={ 'w-100 py-2 px-3 rounded-1 bg-secdark'} key={q.id + "-123"}>
              <span className='text-gray500 pe-2'>{q.id+1}.</span>{q.question}
              <input type="text" className="form-control bg-maindark mt-2 mb-1 border-start border-secdark bg-secdark text-light" 
                defaultValue={q.answer}
                disabled={true} />
            </span>
          </div>
        </div>
      </div>
    </div>
  ))
}