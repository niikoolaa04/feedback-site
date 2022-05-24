export default function ChoicesList({ choices, selected, setSelected }) {
  return choices?.map((c, i) => (
    <div className=''>
      <div className='text-light py-2 w-100' key={c.id}>
        <div className="row">
          <div className='d-flex cursor hoverEffect'>
            <span className={ 'w-100 py-2 px-3 rounded-start'+ (selected == c.id ? ' bg-primary' : ' bg-secdark')} onClick={(() => setSelected(c.id))}>
              <span className='text-gray500 pe-2'>{i+1}.</span>{c.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  ))
}