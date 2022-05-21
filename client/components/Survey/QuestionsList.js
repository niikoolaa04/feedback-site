import { useEffect, useState } from "react";

export default function QuestionsList({ questions, handleChange, inputFields, setQuestions, currPage,
   firstSurvey, lastSurvey }) {
  /* When using Real Database make this different - setQuestions */
  const [pageQuestions, setPageQuestions] = useState([]);

  useEffect(() => {
    setPageQuestions(questions.slice(firstSurvey, lastSurvey));
  }, [currPage]);

  return pageQuestions.map((q, i) => (
    <div className='' key={q.id}>
      <div className='text-light py-2 w-100'>
        <div className="row">
          <div className='d-flex cursor hoverEffect'>
            <span className={ 'w-100 py-2 px-3 rounded-1 bg-secdark'} key={q.id + "-123"}>
              <span className='text-gray500 pe-2'>{q.id}.</span>{q.text}
              {/*  defaultValue={q.text} */}
              <input type="text" className="form-control bg-maindark mt-2 mb-1 border-start border-secdark bg-secdark text-light" 
                onChange={(event)=> handleChange(q.id, event)}
                defaultValue={inputFields[parseInt(q.id - 1)]}
                placeholder={"Answer " + parseInt(q.id)} key={i + "-" + q.id} />
            </span>
          </div>
        </div>
      </div>
    </div>
  ))
}