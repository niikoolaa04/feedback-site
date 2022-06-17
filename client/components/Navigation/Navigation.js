import { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSquarePollVertical,faNewspaper, faAngleDown
  , faMagnifyingGlassChart, faUserPlus, faScroll
  , faArrowRightToBracket, faAddressCard, faSliders, faArrowRightFromBracket, faBarsProgress, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts/UserContext';
import cookie from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import { successBar } from '../../utils/utils'

export default function Navigation({ active = "home" }) {
  const { user, setUser } = useContext(UserContext);

  const isActive = (page) => {
    if(active == page) return " active";
    else return "";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secdark">
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
                <Link href={"/surveys/new"}>
                  <a className={"nav-link" + isActive("survey")}>
                    <FontAwesomeIcon icon={faNewspaper} size="1x" className='pe-2 align-base' />Create Survey
                  </a>
                </Link>
              </li>
              <div className='dropBrowse'>
                <li className="nav-item dropHoverEffect dropdown list-unstyled cursor">
                  <div className="nav-item px-2">
                      <a className={"nav-link" + isActive("browse")}>
                        <FontAwesomeIcon icon={faMagnifyingGlassChart} size="1x" className='pe-2 align-base' />Browse
                      </a>
                  </div>
                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end bg-maindark">
                    <li>
                      <Link href="/polls">
                        <a className="dropdown-item text-light">
                          <FontAwesomeIcon icon={faBarsProgress} size="1x" className='pe-3 align-base' />Polls
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/surveys">
                        <a className="dropdown-item text-light">
                          <FontAwesomeIcon icon={faScroll} size="1x" className='pe-3 align-base' />Surveys
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </div>
            </ul>
            {
              user.mail != null ?
              <div>
                <li className="nav-item dropHoverEffect dropdown list-unstyled w-25 w-lg-100 cursor">
                  <div className='d-flex align-items-center mt-3 mt-md-0' data-bs-toggle="dropdown">
                    <img className='rounded-circle' style={{ width: "42px", height: "42px" }} src={ user?.picture } alt="" />
                    <div className='flex-col ms-3 lh-sm'>
                      <p className='text-light mb-0 mt-0'>{ user.profileName }</p>
                      <p className='text-gray500 mb-0 mt-0 fs-7'>@{ user.username }</p>
                    </div>
                    <FontAwesomeIcon icon={faAngleDown} size="1x" className='align-base ps-3 text-gray500' />
                  </div>
                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end bg-maindark">
                    <li>
                      <Link href={`/profile/${user.id}`}>
                        <a className="dropdown-item text-light">
                          <FontAwesomeIcon icon={faAddressCard} size="1x" className='pe-3 align-base' />Profile
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile/edit">
                        <a className="dropdown-item text-light">
                          <FontAwesomeIcon icon={faSliders} size="1x" className='pe-3 align-base' />Edit Profile
                        </a>
                      </Link>
                    </li>
                    {
                      user?.role == 1 || user?.role == 2 ?
                      <li>
                        <Link href="/admin">
                          <a className="dropdown-item text-light">
                            <FontAwesomeIcon icon={faLock} size="1x" className='pe-3 align-base' />Admin Panel
                          </a>
                        </Link>
                      </li> :
                      ''
                    }
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item text-light" onClick={(() => {
                        cookie.remove("token");
                        setUser({
                          id: null,
                          username: null,
                          profileName: null,
                          mail: null,
                          picture: null,
                          role: 0,
                        });
                        successBar("Logged out successfully")
                      })}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="1x" className='pe-3 align-base' />Log Out
                      </a>
                    </li>
                  </ul>
                </li>
              </div>
              :
                <ul className="navbar-nav ms-auto mb-3 mb-md-0">
                  <li className="nav-item px-2 rounded-3 bg-primary my-3 my-md-0 me-md-2">
                    <Link href={"/login"}>
                      <a className="nav-link active">
                        <FontAwesomeIcon icon={faArrowRightToBracket} size="1x" className='pe-2 align-base' />Login
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item px-2 bg-primary rounded-3 my-md-0 me-md-2">
                    <Link href={"/register"}>
                      <a className='nav-link active'>
                        <FontAwesomeIcon icon={faUserPlus} size="1x" className='pe-2 align-base' />Register
                      </a>
                    </Link>
                  </li>
              </ul>
            }
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  )
}
