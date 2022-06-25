import { useState, useEffect, useRef, useContext, useMemo } from 'react'
import { useRouter } from 'next/router';
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Other/Footer';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { errorBar, getProfile, successBar, editProfile } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../../store/actions/authActions';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const auth = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();
  const editData = useRef([]);
  const checksRef = useRef([]);

  const submitEdit = async(e) => {
    e.preventDefault();
    if(editData.current.pw.value?.length > 0 && editData.current.pw.value?.length < 6) 
      return errorBar("Password need to be between 6 and 21 characters.");

    if(editData.current.pw.value?.length > 0 && editData.current.pw.value != editData.current.pwConfirm.value) 
      return errorBar("Password and Password confirmation didn't match, please recheck.");

    let editDetails = {
      username: editData.current.username.value,
      profilePicture: editData.current.picture.value,
      profileName: editData.current.profileName.value,
      mail: editData.current.mail.value,
      password: editData.current.pw.value,
      about: editData.current.about.value,
      latestPolls: checksRef.current.polls.checked,
      latestSurveys: checksRef.current.surveys.checked
    }
    if(editData.current.pw.value?.length == 0 || editData.current.pw.value == "") delete editDetails.password;

    await editProfile(editDetails, id).then(() => {
      successBar("Profile have been edited successfully, redirecting..");
      setTimeout(() => router.push(`/profile/${id}`), 3000);
    });
  }

  useMemo(() => {
    dispatch(loadUser());
  }, [])

  useEffect(() => {
    if(!router.isReady) return;
    if(!auth?.id || (auth?.id != id && auth?.role != 2)) router.push("/");
  }, [auth, userProfile]);

  const editRole = async(role) => {
    await editProfile({ role }, id).then(async(res) => {
      successBar("User's Role have been changed to " + (role == 0 ? "Member" : role == 1 ? "Staff" : "Administrator"));
    });
  }

  useMemo(() => {
    if(!router.isReady) return;
    async function getUserProfile() {
      await getProfile(id).then((res) => {
        setUserProfile(res);
      });
    }
    
    getUserProfile();
  }, [router.isReady]);
  
  return (
    <div className='hideOverflow'>
      <Navigation active='profileEdit' />
      <Head>
        <title>Feedback App - Edit Profile (Admin)</title>
      </Head>
      <div className="">
        <div className='bg-maindark'>
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <div className="bg-bluedark shadow w-100 w-md-75 rounded-1">
                {/* TITLE & DESCRIPTION */}
                <div className='px-md-5 mb-3 pt-4'>
                  <p className='text-light fs-3 fw-bold mb-0'>Profile Customisation</p>
                  <p className='text-gray600'>Here you can change important details about your account.</p>
                  <div className='mb-5'>
                    <div className='form mb-3'>
                      <label htmlFor="usernameField" className="form-label text-light">Username</label>
                      <input type="text" minLength={5} autoComplete="off" m ref={((el) => (editData.current['username'] = el))} defaultValue={userProfile?.username} className="form-control border-secdark bg-bluedark h-25 text-light" id="usernameField" required />
                    </div>
                    <div className='form mb-3'>
                      <label htmlFor="pfpField" className="form-label text-light">Profile Picture URL</label>
                      <input type="text" minLength={5} autoComplete="off" m ref={((el) => (editData.current['picture'] = el))} defaultValue={userProfile?.profilePicture} className="form-control border-secdark bg-bluedark h-25 text-light" id="pfpField" required />
                    </div>
                    <div className='form mb-3'>
                      <label htmlFor="nameField" className="form-label text-light">Profile Name</label>
                      <input type="text" minLength={5} ref={((el) => (editData.current['profileName'] = el))} defaultValue={userProfile?.profileName} className="form-control border-secdark bg-bluedark h-25 text-light" id="nameField" required />
                    </div>
                    <div className='form mb-3'>
                      <label htmlFor="emailField" className="form-label text-light">Email</label>
                      <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" ref={((el) => (editData.current['mail'] = el))} defaultValue={userProfile?.mail} className="form-control border-secdark bg-bluedark h-25 text-light" id="emailField" required />
                    </div>
                    <div className='form mb-3'>
                      <label htmlFor="pwField" className="form-label text-light">Password</label>
                      <input type="password" ref={((el) => (editData.current['pw'] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="pwField" required />
                    </div>
                    <div className='form mb-3'>
                      <label htmlFor="pwConfirmField" className="form-label text-light">Confirm Password</label>
                      <input type="password" ref={((el) => (editData.current['pwConfirm'] = el))} className="form-control border-secdark bg-bluedark h-25 text-light" id="pwConfirmField" required />
                    </div>
                    <div>
                      <label htmlFor="aboutMe" className="form-label text-light">About me</label>
                      <textarea className="form-control border-secdark bg-secdark text-light" id="aboutMe" ref={((el) => (editData.current['about'] = el))} style={{ height: "9rem", resize: "none" }} defaultValue={userProfile?.about} />
                    </div>
                    <div className='mt-4'>
                      <div className="form-check">
                        <input className="form-check-input" ref={((el) => (checksRef.current["polls"] = el))} defaultChecked={true} type="checkbox" value="" id="showPoll" />
                        <label className="form-check-label text-light" htmlFor="showPoll">Are your latest 3 Polls posted on Profile?</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" ref={((el) => (checksRef.current["surveys"] = el))} defaultChecked={true} type="checkbox" value="" id="showSurvey" />
                        <label className="form-check-label text-light" htmlFor="showSurvey">Are your latest 3 Surveys posted on Profile?</label>
                      </div>
                    </div>
                    <div className="btn-group mt-3">
                      <button type="button" className="btn btn-secondary dropdown-toggle bg-secdark border-maindark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Change Role
                      </button>
                      <div className="dropdown-menu dropdown-menu-dark bg-maindark">
                        <button className="dropdown-item text-white" type="button" onClick={(async() => await editRole(0))}>Member</button>
                        <button className="dropdown-item text-white" type="button" onClick={(async() => await editRole(1))}>Staff</button>
                        <button className="dropdown-item text-white" type="button" onClick={(async() => await editRole(2))}>Administrator</button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center pb-3">
                    <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                  </div>
                  <div className='text-center mt-3'>
                    <button className='btn btn-success btn-lg me-2' onClick={(async(e) => {
                      await submitEdit(e);
                    })}>Save</button>
                    <button className='btn btn-danger btn-lg ms-2' onClick={(() => router.push("/profile"))}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}