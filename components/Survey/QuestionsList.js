import { useEffect, useState } from "react";
const fruits = new Map();

export default function QuestionsList({ questions, setQuestions, currPage, firstSurvey, lastSurvey, answerRef }) {
  /* When using Real Database make this different - setQuestions */
  const [pageQuestions, setPageQuestions] = useState([]);

  useEffect(() => {
    setPageQuestions(questions.slice(firstSurvey, lastSurvey));
  }, [currPage]);

  return pageQuestions.map((q, i) => (
    <div className=''>
      <div className='text-light py-2 w-100' key={q.id}>
        <div className="row">
          { q.id }
          <div className='d-flex cursor hoverEffect' key={q.id + "-25151"}>
            <span className={ 'w-100 py-2 px-3 rounded-1 bg-secdark'} key={q.id + "-123"}>
              <span className='text-gray500 pe-2'>{q.id}.</span>{q.text}
              {/*  defaultValue={q.text} */}
              <input type="text" className="form-control bg-maindark mt-2 mb-1 border-start border-secdark bg-secdark text-light" 
                onChange={(evnt)=> handleChange(q.id, evnt)}
                placeholder={"Answer " + parseInt(q.id)} key={i + "-" + q.id} />
            </span>
          </div>
        </div>
      </div>
    </div>
  ))
}