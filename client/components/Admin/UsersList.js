import React from 'react'
import Image from 'next/image'
import config from '../../config.json'
import { myLoader, successBar } from '../../utils/utils'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteUser } from '../../utils/utils'

export default function UsersList() {
  const users = [{
    id: 1,
    name: 'Test',
    username: "username",
    profilePicture: config.defaultImage
  }, {
    id: 2,
    name: 'Test',
    username: "username",
    profilePicture: config.defaultImage
  }, {
    id: 3,
    name: 'Test',
    username: "username",
    profilePicture: config.defaultImage
  }, {
    id: 4,
    name: 'Test',
    username: "username",
    profilePicture: config.defaultImage
  }];

  const clickRemoveUser = async(userId) => {
    await deleteUser(userId).then(async(res) => {
      successBar("User with ID " + userId + " have been deleted.");
    })
  }
  
  return users.map((x, i) => (
    <div className='py-2'>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="bg-secdark w-75 rounded-1 d-flex align-items-center">
            <div className="col-6 col-md-8">
              <div className="d-flex justify-content-start align-items-center py-2">
                <Image className='rounded-1' src={x.profilePicture} loader={myLoader} width="32px" height="32px" />
                <div className='m-0 lh-sm'>
                  <p className='text-white m-0 p-0 ps-2'>{x.name}</p>
                  <span className='text-gray700 m-0 fs-7 ps-2'>@{x.username}</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="d-flex justify-content-end">
                <FontAwesomeIcon icon={faPenToSquare} className="cursor text-white pe-2" />
                <FontAwesomeIcon icon={faTrash} className="cursor text-white" onClick={(async() => await clickRemoveUser(x.id))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}
