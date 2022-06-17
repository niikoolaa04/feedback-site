import React from 'react'

export default function Badge({ type }) {
  if(type == "admin") return (
    <div className='ms-2'>
      <p className='d-none d-md-block bg-danger px-2 py-1 m-0 rounded-1 text-white fs-9' style={{ transform: "scale(0.9)"}}>Admin</p>
      <p className='d-block d-md-none bg-danger px-2 py-1 m-0 rounded-1 text-white fs-9 me-2' style={{ transform: "scale(0.9)"}}>A</p>
    </div>
  )

  if(type == "staff") return (
    <div className='ms-2'>
      <p className='d-none d-md-block bg-warning px-2 py-1 m-0 rounded-1 text-white fs-9' style={{ transform: "scale(0.9)"}}>Staff</p>
      <p className='d-block d-md-none bg-warning px-2 py-1 m-0 rounded-1 text-white fs-9 me-2' style={{ transform: "scale(0.9)"}}>S</p>
    </div>
  )

  return (
    <div className='ms-2'>
      <p className='d-none d-md-block bg-primary px-2 py-1 m-0 rounded-1 text-white fs-9' style={{ transform: "scale(0.9)"}}>Member</p>
      <p className='d-block d-md-none bg-primary px-2 py-1 m-0 rounded-1 text-white fs-9 me-2' style={{ transform: "scale(0.9)"}}>M</p>
    </div>
  )
}
