import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import { errorBar, successBar, getProfile, decodeToken } from '../../utils/utils'
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../store/actions/authActions';

export default function Register() {
  const registerData = useRef([]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const termsRef = useRef(null);

  async function getUser() {
    await decodeToken().then(async(res) => {
      await getProfile(res?.id).then(async(usr) => {
        if(usr) router.push("/") 
      })
    })
  }

  useEffect(() => {
    if(router.isReady == false) return;
    getUser();
  }, [router.isReady]);

  const submitDetails = async(e) => {
    e.preventDefault();
    if(termsRef.current.checked == false) return errorBar("You must accept our Terms of Service");
    let details = {
      username: registerData.current.username.value,
      mail: registerData.current.email.value,
      profileName: registerData.current.profileName.value,
      password: registerData.current.pw.value,
    };

    if(registerData.current.pw.value != registerData.current.confirmPw.value) {
      errorBar("Password and Password confirmation didn't match, please recheck.");
      return;
    }

    dispatch(signUp(details))
  }

  useEffect(() => {
    if(cookie.get("token") && registerData.current.email.value == "") router.push("/");
    const forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      });
  }, []);

  return (
    <div className='hideOverflow'>
      <Head>
        <title>Feedback - Register</title>
      </Head>
      <div className='bg-maindark'>
        <div>
          <div className="d-none d-md-inline position-absolute opacity-25 w-75 end-50">
            <svg viewBox="0 0 800 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
              <g transform="translate(320, -44)">
                <path className="blob" d="M412.5,331Q344,412,235.5,437.5Q127,463,85,356.5Q43,250,98.5,166.5Q154,83,241,99Q328,115,404.5,182.5Q481,250,412.5,331Z" fill="#24314d"></path>
              </g>
            </svg>
          </div>
          <form autoComplete='off' className="container py-5 needs-validation" noValidate onSubmit={(async(e) => await submitDetails(e))}>
            <div className="row d-flex justify-content-center position-relative">
              <div className='w-100 w-md-50'>
                <p className='text-light fw-bolder fs-1 pt-2 mb-1'>Sign Up</p>
                <div className='bg-gray700 mb-4' style={{ width: "10rem", height: "1px" }} />
                <div className='form-floating mb-3'>
                  <input type="text" minLength={5} autoComplete="off" m ref={((el) => (registerData.current['username'] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="usernameField" required />
                  <label htmlFor="usernameField" className="form-label text-light">Username</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="text" minLength={5} ref={((el) => (registerData.current['profileName'] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="nameField" required />
                  <label htmlFor="nameField" className="form-label text-light">Profile Name</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" ref={((el) => (registerData.current['email'] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="emailField" required />
                  <label htmlFor="emailField" className="form-label text-light">Email</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="password" minLength={6} maxLength={21} ref={((el) => (registerData.current['pw'] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="pwField" required />
                  <label htmlFor="pwField" className="form-label text-light">Password</label>
                </div>
                <div className='form-floating mb-3'>
                  <input type="password" minLength={6} maxLength={21} ref={((el) => (registerData.current['confirmPw'] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="confirmPwField" required />
                  <label htmlFor="confirmPwField" className="form-label text-light">Confirm Password</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input cursor" ref={termsRef} type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label text-gray500" for="flexCheckDefault">Accept Terms of Service</label>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='bg-gray700 rounded-1 w-75' style={{ height: "1px" }} />
                </div>
                <div className='mt-4'>
                  <div className='d-flex justify-content-center w-100 mb-1'>
                    <button type='submit' className="btn btn-primary w-50" onClick={(async(e) => await submitDetails(e))} onSubmit={(async(e) => await submitDetails(e))}>Sign Up</button>
                  </div>
                  <div className='text-center'>
                    <a className='text-light text-decoration-none'>Already have an account? Sign In</a>
                  </div>
                </div>
                {/* FORMS */}
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
