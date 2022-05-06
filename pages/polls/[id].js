import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Other/Footer'
import ChoicesList from '../../components/Poll/ChoicesList'

export default function PollDetails() {
  const router = useRouter()
  const [selected, setSelected] = useState(-1);
  const [choices, setChoices] = useState([{
    id: 1,
    text: 'Test Choice number 1'
  }, {
    id: 2,
    text: 'Test Choice number 2'
  },{
    id: 3,
    text: 'Test Choice number 3'
  },{
    id: 4,
    text: 'Test Choice number 4'
  }]);

  const myLoader = ({ src }) => {
    return src;
  }
  
  const { id } = router.query
  return (
    <div className='hideOverflow'>
      <Navigation active='polls' />
      <Head>
        <title>Feedback App - Poll #{id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <div className='bg-maindark'>
          <div className="container py-6">
            <div className="row d-flex justify-content-center">
              <div className="bg-bluedark shadow w-75 rounded-1">
                {/* TITLE & DESCRIPTION */}
                <div className='px-md-5 mb-3 pt-4'>
                  <p className='text-light fs-3 fw-bold mb-0'>Poll Title (#518)</p>
                  <p className='text-gray600'>This is what poll is about & some other details.</p>
                  <textarea disabled className="form-control border-secdark bg-secdark mt-3 text-light" placeholder="Question for your Poll" id="pollQuestion" style={{ height: "9rem", resize: "none" }} value={"This is poll description."} />
                </div>
                <div className="px-md-5 mb-4 pt-3">
                  <p className="text-light fs-3 fw-bold mb-0">Poll Choices</p>
                  <p className='text-gray600'>These are options for which you can vote.</p>
                  <ChoicesList selected={selected} setSelected={setSelected} choices={choices} />
                </div>
                <div className="px-md-5 mb-5 pt-3">
                  <p className="text-light fs-3 fw-bold mb-0">Poll Author</p>
                  <div className='mt-3'>

                    <div className="container g-0">
                      <div className="row">
                        <div className=''>
                          <div className='d-flex flex-row'>
                            <Image className='rounded-3 mw-100' src="https://www.komysafety.com/images/banner/no-image.png" loader={  myLoader} width="128px" height="128px" />
                            <div className='d-flex flex-column'>
                              <p className='text-light fw-bold ps-3 mb-0'>User Username</p>
                              <p className='ps-3 text-gray500'>⭐⭐⭐⭐⭐ (5)</p>
                              <div className="d-block ps-3">
                                <button className='btn btn-primary btn-sm'>Visit Profile</button>
                              </div>
                            </div>
                          </div>
                          <textarea disabled className="form-control border-secdark bg-secdark mt-3 text-light" placeholder="Question for your Poll" id="pollQuestion" style={{ height: "5rem", resize: "none" }} value={"This is Profile description."} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pb-3">
                  <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                </div>
                <div className='px-md-5 py-3 pb-4 text-center'>
                  <button className="btn btn-primary btn-lg me-2">Finish</button>
                  {/* IF EVERYONE CAN SEE THEM */}
                  <button className="btn btn-success btn-lg ms-2">Results</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />``
    </div>
  )
}
