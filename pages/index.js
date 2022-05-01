import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navigation/Navigation'

export default function Home() {
  const myLoader = ({ src }) => {
    return src;
  }
  return (
    <div>
      <Navigation />
      <Head>
        <title>Feedback App </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HERO SECTION */}
      <div>
        <div className='bg-maindark'>
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-light">
                <div className='mx-5 my-6'>
                  <p className="title display-6 fw-bolder">Feedback.ROCKS</p>
                  <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic libero qui placeat saepe? Rerum magni enim blanditiis? Animi, non facere!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, nobis. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                  <button className='btn btn-primary fw-bold mt-3 px-3'>Let's  see more!</button>
                </div>
              </div>
              <div className="col-md-6 text-center align-middle my-2 my-md-6">
                  <Image className='align-middle' src="https://cdn-icons-png.flaticon.com/512/2867/2867937.png" loader={myLoader} width="256px" height="256px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FEATURES SECTION */}
      <div className='bg-secdark'>
        <div className='py-6'>
          <div className="container">
            {/* PROFILES FEATURE */}
            <div className="row text-light pb-4 pt-5">
              <div className="col-md-7">
                <p className="title fs-3 fw-bold">Company Profiles</p>
                <p className='text-gray500 text-wrap' style={{ width: "30rem" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                <button className="btn btn-primary mt-3">Setup your Profile</button>
              </div>
              <div className="col-md-5 pt-5 pt-md-0">
                <Image className='align-middle' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
              </div>
            </div>
            {/* POLLS FEATURE */}
            <div className="row text-light pb-4 pt-5 d-flex flex-row flex-row-reverse">
              <div className="col-md-5">
                <p className="title fs-3 fw-bold">Polls</p>
                <p className='text-gray500 text-wrap' style={{ width: "30rem" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                <button className="btn btn-primary mt-3 me-3">Create Poll</button>
                <button className="btn btn-primary mt-3">Browse Polls</button>
              </div>
              <div className="col-md-7 pt-5 pt-md-0">
                <Image className='' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
              </div>
            </div>
            {/* SURVEYS FEATURE */}
            <div className="row text-light pb-4 pt-5">
              <div className="col-md-7">
                <p className="title fs-3 fw-bold">Surveys</p>
                <p className='text-gray500 text-wrap' style={{ width: "30rem" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                <button className="btn btn-primary mt-3">Create Survey</button>
              </div>
              <div className="col-md-5 pt-5 pt-md-0">
                <Image className='align-middle' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
              </div>
            </div>
            {/* PROFILE REPUTATION FEATURE */}
            <div className="row text-light pb-4 pt-5 d-flex flex-row flex-row-reverse">
              <div className="col-md-5">
                <p className="title fs-3 fw-bold">Profile Reputation</p>
                <p className='text-gray500 text-wrap' style={{ width: "30rem" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                <button className="btn btn-primary mt-3">Most Reputated Profile</button>
              </div>
              <div className="col-md-7 pt-5 pt-md-0">
                <Image className='' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
