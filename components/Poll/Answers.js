import { useState, useRef } from 'react'

export default function Answers({ answers, setAnswers, inputRef, removeItem }) {

  return answers.map((x, i) => (
    <div className='input-group mb-3 d-flex'>
      <input type="text" className="form-control border-start border-secdark bg-secdark text-light" ref={(el) => (inputRef.current[i] = el)} placeholder={"Option " + parseInt(i + 1)} key={i} />
      <span className="border-secdark input-group-text bg-secdark cursor" onClick={(() => removeItem(i))} data-bs-toggle="tooltip" data-bs-placement="top" title="Remove this Answer" id="remove-option">✖</span>
    </div>
  ))
}
