export default function ChoicesCreate({ answers, inputRef, removeItem }) {
  return answers.map((x, i) => (
    <div className='input-group mb-3 d-flex'>
      <input type="text" className="form-control border-start border-secdark bg-secdark text-light" ref={(el) => (inputRef.current[i] = el)} defaultValue={x.text} placeholder={"Option " + parseInt(i + 1)} key={i + "-" + x.id} />
      <span className="border-secdark input-group-text bg-secdark cursor text-light" onClick={(async() => await removeItem(i))} data-bs-toggle="tooltip" data-bs-placement="top" title="Remove this Answer" id="remove-option">✖</span>
    </div>
  ))
}
