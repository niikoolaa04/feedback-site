import { useState, useEffect, useContext, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navigation from '../../../components/Navigation/Navigation'
import Footer from '../../../components/Other/Footer'
import Loading from '../../../components/Other/Loading'
import { getPoll } from '../../../utils/utils'
import DescriptionBox from '../../../components/Other/DescriptionBox'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto';
import { useSelector } from 'react-redux'

export default function NewPoll() {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const { id } = router.query;

  const [poll, setPoll] = useState({});
  const [publicResults, setPublicResults] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [pollVotes, setPollVotes] = useState({
    labels: [],
    datasets: [
      {
        label: "Poll results",
        data: [0],
        backgroundColor: []
      }
    ]
  });

  useEffect(() => {
    if(!router.isReady) return;
    async function fetchPoll() {
      await getPoll(id).then(async(result) => {
        if(!result) {
          router.push("/");
          errorBar("Poll with such ID doesn't exist.");
          return;
        }
        setPublicResults(result?.publicResults || true);
        const pollOptions = result?.options?.map((v) => v);
        const votesList = result?.submitters.map((v) => v.vote);
        let chartArr = [];
        let bgColors = [];

        pollOptions.forEach((x, i) => {
          bgColors.push("#" + Math.floor(Math.random()*16777215).toString(16))
          chartArr.push(votesList.filter((j) => pollOptions[j] == x).length)
        })

        setPollVotes({
          labels: pollOptions,
          datasets: [
            {
              label: "Poll results",
              data: chartArr,
              backgroundColor: bgColors
            }
          ]
        });

        setPoll(result);
        if(result?.user == "-1" || !result?.user) {
          setUserProfile({
            id: -1,
            username: "N/A"
          });
        } else {
          await getProfile(result?.user).then((res) => {
            if(res?.user) setUserProfile(res);
          });
        }
      })
    }
    fetchPoll();
  }, [router.isReady]);

  useMemo(() => {
    if(poll?.publicResults == false && poll?.user !== auth.id) {
      return router.push("/polls");
    }
  }, [auth, router.isReady, poll]);

  return (
    <div className='hideOverflow'>
      <Navigation active='polls' />
      <Head>
        <title>Feedback - Poll Results</title>
      </Head>
      <div>
        <div className="bg-maindark">
          <div className="container py-6">
            {
              publicResults == false && (!auth?.id || !auth?.mail || !auth?.id) ? <Loading w={"128px"} h={"128px"} /> :
              <div className="row d-flex justify-content-center">
                <div className="bg-bluedark shadow w-100 w-md-75 rounded-1">
                  <div className='px-md-5 mb-3 pt-4'>
                    <p className='text-light fs-3 fw-bold mb-0'>{ poll?.title }</p>
                    <p className='text-gray600'>{ poll?.shortDescription }</p>
                    <DescriptionBox text={poll?.question} />
                  </div>
                  <div className="px-md-5 mb-4 pt-3">
                    <p className="text-light fs-3 fw-bold mb-0">Poll Results</p>
                    <p className='text-gray600'>Results of how Users voted for this Poll.</p>
                    <Pie
                      data={pollVotes}
                      options={{
                        aspectRatio: 2,
                        responsive: true,
                        plugins: {
                          title: {
                            display: true,
                            text: "Poll Results",
                            color: "#f0f0f0",
                            fullSize: true
                          },
                          legend: {
                            fullSize: true,
                            position: 'bottom',
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="px-md-5 mb-5 pt-3">
                    <p className="text-light fs-3 fw-bold mb-0">Poll Author</p>
                    <div className='mt-3'>
                      <div className="container g-0">
                        <div className="row">
                          <div className=''>
                            {
                              userProfile?.id == -1 || !userProfile?.mail ? 
                              <div>
                                <p className='text-light'>- This poll was created by Guest User</p>
                              </div> :
                              <>
                                <div className='d-flex flex-row'>
                                  <Image className='rounded-3 mw-100' src="https://www.komysafety.com/images/banner/no-image.png" loader={myLoader} width="128px" height="128px" />
                                    
                                    <div className='d-flex flex-column'>
                                      <p className='text-light fw-bold ps-3 mb-0'>{ userProfile?.username }</p>
                                      <p className='ps-3 text-gray500'>⭐⭐⭐⭐⭐ (5)</p>
                                      <div className="d-block ps-3">
                                        <Link href={"/profile/" + userProfile?.id}>
                                          <button className='btn btn-primary btn-sm'>Visit Profile</button>
                                        </Link>
                                      </div>
                                    </div>
                                </div>
                                <DescriptionBox text={userProfile?.about} />
                              </>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center pb-3">
                    <div className='bg-gray700' style={{ width: "30rem", height: "1px" }} />
                  </div>
                  <div className='px-5 py-3 pb-4 text-center'>
                    <button onClick={(() => router.push(`/polls/${id}`))} className="btn btn-danger btn-lg ms-2">Go Back</button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
