import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSquarePollVertical,faNewspaper
  , faMagnifyingGlassChart, faUserPlus, faArrowRightToBracket, faCoffee } from '@fortawesome/free-solid-svg-icons';

export default function Navigation({ active = "home" }) {
  const isActive = (page) => {
    if(active == page) return " active";
    else return "";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-maindark">
        <div className='container'>
          <Link href="/">
            <a className="navbar-brand">
              <img className='align-middle' src="https://cdn-icons-png.flaticon.com/32/2665/2665038.png" alt="" />
              <span className='align-middle px-3'>Feedback&trade;</span>
            </a>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mt-2 mt-md-0">
              <li className="nav-item px-2">
                <Link href={"/"}>
                  <a className={"nav-link" + isActive("home")}>
                    <FontAwesomeIcon icon={faHouse} size="sm" className='pe-2 align-base' />Home
                  </a>
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link href={"/polls/new"}>
                  <a className={"nav-link" + isActive("polls")}>
                    <FontAwesomeIcon icon={faSquarePollVertical} size="1x" className='pe-2 align-base' />Create Poll
                  </a>
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link href={"/survey/new"}>
                  <a className={"nav-link" + isActive("survey")}>
                    <FontAwesomeIcon icon={faNewspaper} size="1x" className='pe-2 align-base' />Create Survey
                  </a>
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link href={"/polls/browse"}>
                  <a className={"nav-link" + isActive("polls_browse")}>
                    <FontAwesomeIcon icon={faMagnifyingGlassChart} size="1x" className='pe-2 align-base' />Browse Polls
                  </a>
                </Link>
              </li>
            </ul>
            {/* MODAL FOR LOGIN / REGISTER, PERHAPS */}
            <ul className="navbar-nav ms-auto mb-3 mb-md-0">
              <li className="nav-item px-2 rounded-3 bg-primary my-3 my-md-0 me-md-2">
                <Link href={"/auth/login"}>
                  <a className="nav-link active">
                    <i className="fa-solid fa-arrow-right-to-bracket fa-md pe-2" />Login
                    <FontAwesomeIcon icon={faArrowRightToBracket} size="1x" className='pe-2 align-base' />Login
                  </a>
                </Link>
              </li>
              <li className="nav-item px-2 bg-primary rounded-3 my-md-0 ms-md-2">
                <Link href={"/auth/register"}>
                  <a className='nav-link active'>
                    <FontAwesomeIcon icon={faUserPlus} size="1x" className='pe-2 align-base' />Register
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
