import React from 'react'

export default function Pagination({ prevPage, currPage, setCurrPage, nextPage }) {
  return (
    <div className='mb-5 mt-4'>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          { currPage > 1 ? <li className="page-item mr-2" onClick={(() => setCurrPage(1))}><a className="page-link text-gray500 bg-maindark border-secdark" href="#">Beggining</a></li> : '' }
          <li className="page-item" onClick={(() => prevPage())}><a className="page-link text-gray500 bg-maindark border-secdark" href="#">Previous</a></li>
          {
            currPage == 1 ?
            <>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link text-gray500 bg-maindark border-secdark" href="#" onClick={(() => setCurrPage(2))}>2</a></li>
              <li className="page-item"><a className="page-link text-gray500 bg-maindark border-secdark" href="#" onClick={(() => setCurrPage(3))}>3</a></li>
            </> : 
            <>
              <li className="page-item"><a className="page-link text-gray500 bg-maindark border-secdark" href="#" onClick={(() => setCurrPage(currPage - 1))}>{ currPage - 1 }</a></li>
              <li className="page-item active"><a className="page-link" href="#">{ currPage }</a></li>
              <li className="page-item"><a className="page-link text-gray500 bg-maindark border-secdark" href="#" onClick={(() => setCurrPage(currPage + 1))}>{ currPage + 1 }</a></li>
            </>
          }
          <li className="page-item" onClick={(() => nextPage())}><a className="page-link text-gray500 bg-maindark border-secdark" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  )
}
