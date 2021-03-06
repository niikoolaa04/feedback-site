import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { myLoader, successBar } from '../../utils/utils'
import { faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteUser } from '../../utils/utils'
import { useRouter } from 'next/router'
import Badge from './Badge'
import { useSelector } from 'react-redux';

export default function UsersList({ users, firstUser, lastUser, currPage, loading }) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const [pageUsers, setPageUsers] = useState(users.slice(firstUser, lastUser));

  useEffect(() => {
    if(!router.isReady) return;
    if(loading == false) setPageUsers(users.slice(firstUser, lastUser));
  }, [currPage, router.isReady, loading])

  const handleDelete = async(userId) => {
    await deleteUser(userId).then(async(res) => {
      successBar("User with ID " + userId + " have been deleted.");
    })
  }
  
  return pageUsers.map((x, i) => (
    <div className='py-2'>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="bg-secdark rounded-1 d-flex align-items-center">
            <div className="col-6 col-md-8 px-md-2">
              <div className="d-flex justify-content-start align-items-center py-2">
                <Image className='rounded-1' src={x.profilePicture} loader={myLoader} width="64px" height="64px" />
                <div className='m-0 lh-sm'>
                  <div className='d-flex align-items-center'>
                    <p className='text-white m-0 p-0 ps-2'>{x.profileName}</p>
                    <Badge type={x?.role == 0 ? "member" : x?.role == 1 ? "staff" : "admin"} />
                  </div>
                  <span className='text-gray600 m-0 fs-7 ps-2'>@{x.username}</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="d-flex justify-content-end">
                <span data-bs-toggle="tooltip" data-bs-placement="top" title="View Profile">
                  <FontAwesomeIcon icon={faEye} className="cursor text-white me-2" onClick={(() => router.push("/profile/" + x.id))} />
                </span>
                {
                  auth?.role > 0 ?
                  <div>
                    <span data-bs-toggle="tooltip" data-bs-placement="top" title="Edit User">
                      <FontAwesomeIcon icon={faPenToSquare} className="cursor text-white me-2" onClick={(() => router.push("/profile/" + x.id + "/edit"))} />
                    </span>
                  </div> : ''
                }
                {
                  auth?.role == 2 ?
                  <div>
                    <span data-bs-toggle="tooltip" data-bs-placement="top" title="Delete User">
                      <FontAwesomeIcon icon={faTrash} className="cursor text-white" onClick={(async() => await handleDelete(x.id))} />
                    </span>
                  </div> : ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}
