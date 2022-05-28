import React from 'react'

export default function Loading({ w, h }) {
  return (
    <div className='text-center'>
      <div className='spinner-border text-light' style={{ width: w, height: h }}></div>
    </div>
  )
}
