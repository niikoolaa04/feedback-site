import Head from 'next/head'
import Image from 'next/image'
import ScrollOpacity from '../components/Animation/ScrollOpacity';
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Other/Footer';
import Link from 'next/link';
import { myLoader } from '../utils/utils';

export default function Home() {
  return (
    <div className='hideOverflow'>
      <Navigation />
      <Head>
        <title>Feedback - Ask Community</title>
        <meta name="theme-color" content="#FFFF00"></meta>
        <meta name="description" content="Create Surveys, Polls, leave Reputation to others and much more!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HERO SECTION */}
      <div>
        <div className='bg-maindark'>
          <div className="container">
            <div className="row">
              {/* FIRST BLOB ON PAGE */}
              <div className="position-absolute w-50 opacity-25 start-0">
                <svg viewBox="0 0 800 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
                  <g transform="translate(299, -75)">
                    <path className="blob" d="M412.5,331Q344,412,235.5,437.5Q127,463,85,356.5Q43,250,98.5,166.5Q154,83,241,99Q328,115,404.5,182.5Q481,250,412.5,331Z" fill="#24314d"></path>
                  </g>
                </svg>
              </div>
              <div className="col-md-6 text-light position-relative">
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
            <div className="row text-light pb-4 pt-5 position-relative" style={{ zIndex: 50 }}>
              <div className="col-md-7">
                <p className="title fs-3 fw-bold pb-0 mb-1">Company Profiles</p>
                <div className='d-block bg-light rounded-1 mb-0' style={{ margin: "0px", width: "10rem", height: "2px" }} />
                <p className='text-gray500 text-wrap mt-3 w-100 w-md-75'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                <button className="btn btn-primary mt-3">Setup your Profile</button>
              </div>
              <div className="col-md-5 pt-5 pt-md-0">
                <Image className='align-middle' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
              </div>
            </div>
            {/* POLLS FEATURE */}
            <ScrollOpacity duration="0.8" direction="left">
              <div className="row text-light pb-4 pt-5 d-flex flex-row flex-row-reverse position-relative" style={{ zIndex: 50 }}>
                <div className="col-md-5">
                  <p className="title fs-3 fw-bold pb-0 mb-1">Polls</p>
                  <div className='d-block bg-light rounded-1 mb-0' style={{ margin: "0px", width: "10rem", height: "2px" }} />
                  <p className='text-gray500 text-wrap mt-3 w-100'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                  <Link href={"/polls/new"}>
                    <button className="btn btn-primary mt-3 me-3">Create Poll</button>
                  </Link>
                  <Link href={"/polls"}>
                    <button className="btn btn-primary mt-3">Browse Polls</button>
                  </Link>
                </div>
                <div className="col-md-7 pt-5 pt-md-0">
                  <Image className='' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
                </div>
              </div>
            </ScrollOpacity>
            {/* LEFT SIDE BLOB - TOP */}
            <div className="position-absolute w-50 opacity-25 start-0 top-100">
              <svg viewBox="0 0 800 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
                <g transform="translate(144.11597442626953, -19.426651000976562)">
                  <path className="blob" d="M412.5,331Q344,412,235.5,437.5Q127,463,85,356.5Q43,250,98.5,166.5Q154,83,241,99Q328,115,404.5,182.5Q481,250,412.5,331Z" fill="#415066"></path>
                </g>
              </svg>
            </div>
            {/* SURVEYS FEATURE */}
            <ScrollOpacity duration="0.8" direction="right">
              <div className="row text-light pb-4 pt-5 position-relative">
                <div className="col-md-7">
                  <p className="title fs-3 fw-bold pb-0 mb-1">Surveys</p>
                  <div className='d-block bg-light rounded-1 mb-0' style={{ margin: "0px", width: "10rem", height: "2px" }} />
                  <p className='text-gray500 text-wrap mt-3 w-100 w-md-75'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                  <Link href={"/surveys/new"}>
                    <button className="btn btn-primary mt-3 me-3">Create Survey</button>
                  </Link>
                  <Link href={"/surveys"}>
                    <button className="btn btn-primary mt-3">Browse Surveys</button>
                  </Link>
                </div>
                <div className="col-md-5 pt-5 pt-md-0">
                  <Image className='align-middle' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
                </div>
              </div>
            </ScrollOpacity>
            {/* RIGHT SIDE BLOB - BOTTOM */}
            <div className="position-absolute w-50 opacity-25 start-50" style={{ zIndex: 2 }}>
              <svg viewBox="0 0 800 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
                <g transform="translate(144.11597442626953, -19.426651000976562)">
                  <path className="blob" d="M412.5,331Q344,412,235.5,437.5Q127,463,85,356.5Q43,250,98.5,166.5Q154,83,241,99Q328,115,404.5,182.5Q481,250,412.5,331Z" fill="#415066"></path>
                </g>
              </svg>
            </div>
            {/* PROFILE REPUTATION FEATURE */}
            <ScrollOpacity duration="0.8" direction="left">
              <div className="row text-light pb-4 pt-5 d-flex flex-row flex-row-reverse position-relative" style={{ zIndex: 150 }}>
                <div className="col-md-5">
                  <p className="title fs-3 fw-bold pb-0 mb-1">Profile Reputation</p>
                  <div className='d-block bg-light rounded-1 mb-0' style={{ margin: "0px", width: "10rem", height: "2px" }} />
                  <p className='text-gray500 text-wrap mt-3 w-100'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ex sapiente delectus quos facilis aperiam inventore laudantium dolor necessitatibus, sit cum rem, nihil in voluptates?</p>
                  <button className="btn btn-primary mt-3">Most Reputated Profile</button>
                </div>
                <div className="col-md-7 pt-5 pt-md-0">
                  <Image className='' src="https://www.hopkinsmedicine.org/sebin/n/u/noimageavailable.png" loader={myLoader} width="512px" height="256px" />
                </div>
              </div>
            </ScrollOpacity>
          </div>
        </div>
      </div>
      {/* SUBSCRIBE TO NEWSLETTER */}
      <div className='bg-maindark'>
        <div className="py-6">
          <div className="container d-flex justify-content-center align-middle">
            <div className="row w-100 w-md-75">
              <div>
                <p className='fs-1 text-light fw-bolder pb-0 mb-0'>Subscribe to our Newsletters!</p>
                <p className='text-wrap text-gray500 w-100 w-md-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus corrupti facere recusandae sint voluptatem dolores quaerat. Hic totam debitis ut?</p>
                <div className='d-block bg-light rounded-1 mb-0' style={{ margin: "0px", width: "16rem", height: "2px" }} />
              </div>
              <form className="form-inline mt-5">
                <div className="input-group pb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">@</span>
                  </div>
                  <input type="text" className="form-control rounded-end me-2" placeholder="Your Email Address" aria-label="Player" aria-describedby="basic-addon1" />
                  <button className="btn btn-outline-primary rounded-1" type="submit">Subscribe</button>
                </div>
                <a href='/unsubscribe' className='text-gray600'>How to Unsubscribe?</a>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* F&Q - ACCORDION */}
      <div className="bg-secdark">
        {/* FAQ BLOB IN CORNER */}
        <div className="position-absolute opacity-25 w-50">
          <svg viewBox="0 0 800 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
            <g transform="translate(-281, -214)">
              <path className="blob" d="M412.5,331Q344,412,235.5,437.5Q127,463,85,356.5Q43,250,98.5,166.5Q154,83,241,99Q328,115,404.5,182.5Q481,250,412.5,331Z" fill="#415066"></path>
            </g>
          </svg>
        </div>
        <div className="py-6 position-relative">
          <div className="container">
            <div className="row">
              <div className='pb-5 text-center text-md-start'>
                <p className='text-light fw-bolder fs-3 pb-0 mb-1'>Frequently Asked Questions</p>
                <p className='text-gray500 text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae perspiciatis, numquam tempora quibusdam dolorem ratione harum accusantium ullam eveniet voluptatibus dolores accusamus ad dignissimos nulla!</p>
                <div className='d-flex d-md-block justify-content-center justify-content-md-start'>
                  <div className='bg-light rounded-1' style={{ width: "16rem", height: "2px" }} />
                </div>
              </div>
              <div>
                <div className="accordion rounded-2 bg-bluedark" id="accordionExample">
                  <div className="accordion-item bg-bluedark text-light">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button bg-bluedark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        First Question
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eveniet eaque mollitia numquam cum reiciendis! Maxime nobis esse, eligendi pariatur quis quibusdam eveniet officia amet cumque atque itaque aliquam ad illum perferendis. Perspiciatis, pariatur voluptate ipsum laboriosam facilis quis consequuntur ab blanditiis aliquid, sapiente vel id accusantium reiciendis at distinctio, veritatis laudantium! Unde, numquam repellendus?1
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item bg-bluedark text-light">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed bg-bluedark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Second Question
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eveniet eaque mollitia numquam cum reiciendis! Maxime nobis esse, eligendi pariatur quis quibusdam eveniet officia amet cumque atque itaque aliquam ad illum perferendis. Perspiciatis, pariatur voluptate ipsum laboriosam facilis quis consequuntur ab blanditiis aliquid, sapiente vel id accusantium reiciendis at distinctio, veritatis laudantium! Unde, numquam repellendus?1
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item bg-bluedark text-light">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed bg-bluedark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Third Question
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eveniet eaque mollitia numquam cum reiciendis! Maxime nobis esse, eligendi pariatur quis quibusdam eveniet officia amet cumque atque itaque aliquam ad illum perferendis. Perspiciatis, pariatur voluptate ipsum laboriosam facilis quis consequuntur ab blanditiis aliquid, sapiente vel id accusantium reiciendis at distinctio, veritatis laudantium! Unde, numquam repellendus?1
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item bg-bluedark text-light">
                    <h2 className="accordion-header" id="headingFour">
                      <button className="accordion-button collapsed bg-bluedark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Fourth Question
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eveniet eaque mollitia numquam cum reiciendis! Maxime nobis esse, eligendi pariatur quis quibusdam eveniet officia amet cumque atque itaque aliquam ad illum perferendis. Perspiciatis, pariatur voluptate ipsum laboriosam facilis quis consequuntur ab blanditiis aliquid, sapiente vel id accusantium reiciendis at distinctio, veritatis laudantium! Unde, numquam repellendus?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* READY SECTION */}
      <div className='bg-maindark'>
        <div className="py-5">
          <div className="container">
            <div className="row">
              <div className='text-center text-md-start'>
                <p className='text-light fw-bolder display-5 mb-2 pb-0'>Ready?</p>
                <div className='d-flex d-md-block justify-content-center justify-content-md-start'>
                  <div className='bg-light rounded-1' style={{ width: "10rem", height: "2px" }} />
                </div>
                <p className='text-gray600 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, amet itaque neque deleniti culpa sapiente,<br/> possimus veniam necessitatibus nam in ipsa dolores ipsum porro libero.</p>
                <Link href={"/polls/new"}>
                  <button className='btn btn-primary fw-bold btn-lg me-3 mt-4'>Create First Poll!</button>
                </Link>
                <Link href={"/surveys/new"}>
                  <button className='btn btn-primary fw-bold btn-lg mt-4'>Create First Survey!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER COMPONENT */}
      <Footer />
    </div>
  )
}
