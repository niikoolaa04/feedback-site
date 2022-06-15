import { useEffect, useRef, useContext } from 'react'
import Head from 'next/head'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import { getProfile, decodeToken, successBar, errorBar } from '../../utils/utils';

export default function Login() {
  const userData = useRef([]);
  const router = useRouter();
  const { setUser } = useContext(UserContext);

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

  const handleLogin = async(e) => {
    e.preventDefault();
    if(userData.current.mail.value == "") return errorBar("You need to provide Email of your Account.");
    if(userData.current.pw.value == "") return errorBar("You didn't to provide Password of your Account.");

    let details = {
      mail: userData.current.mail.value,
      password: userData.current.pw.value,
    }

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        'credentials': 'include',
        'Content-Type': 'application/json'
      }
    }).then(async(res) => {
      const result = await res.json();
      if(process.browser) {
        if(result.code == 401) {
          errorBar("You have provided invalid password, please recheck it.");
          return;
        } else if(result.code == 200) {
          cookie.set("token", result.token, {
            expires: 1,
          });
          setUser({
            id: result.user.id,
            username: result.user.username,
            profileName: result.user.profileName,
            mail: result.user.mail,
            picture: result.user.picture
          });
          successBar("Login successful, redirecting in 3 seconds.", 3000);
          setTimeout(() => router.push("/"), 3000); 
        } else if(result.code == 404 && result.type == "user") {
          errorBar("User with provided credentials couldn't be found.");
        }
      }
    })
  }

  return (
    <div className='hideOverflow'>
      <Head>
        <title>Feedback App - Login</title>
      </Head>
      <div className='vh-100 bg-maindark'>
        <div>
          <div className="d-none d-md-inline position-absolute opacity-25 w-50 end-50">
            <svg viewBox="0 0 800 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
              <g transform="translate(320, -44)">
                <path class="blob" d="M412.5,331Q344,412,235.5,437.5Q127,463,85,356.5Q43,250,98.5,166.5Q154,83,241,99Q328,115,404.5,182.5Q481,250,412.5,331Z" fill="#24314d"></path>
              </g>
            </svg>
          </div>
          <form className="container py-5 needs-validation" noValidate onSubmit={(async(e) => await handleLogin(e))}>
            <div className="row d-flex justify-content-center position-relative">
              <div className='w-100 w-md-50'>
                <p className='text-light fw-bolder fs-1 pt-2 mb-1'>Sign In</p>
                <div className='bg-gray700 mb-4' style={{ width: "10rem", height: "1px" }} />
                <div className='form-floating mb-3'>
                  <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" ref={((el) => (userData.current["mail"] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="pollTitle" />
                  <label htmlFor="pollTitle" className="form-label text-light">Email Address</label>
                </div>
                <div className='form-floating'>
                  <input type="password" minLength={6} maxLength={21} ref={((el) => (userData.current["pw"] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="pollTitle" />
                  <label htmlFor="pollTitle" className="form-label text-light">Password</label>
                  <p className='text-gray600 pt-1' style={{ fontSize: "13px" }}>Forgot password? Click to reset it.</p>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                  <div className='bg-gray700 rounded-1 w-75' style={{ height: "1px" }} />
                </div>
                {/* BUTTONS */}
                <div className='mt-4'>
                  <div className='d-flex justify-content-center w-100 mb-1'>
                    <button type='submit' className="btn btn-primary w-50">Sign In</button>
                  </div>
                  {/* ADD LINK */}
                  <div className='text-center'>
                    <a className='text-light text-decoration-none'>Don't have account? Sign Up</a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
