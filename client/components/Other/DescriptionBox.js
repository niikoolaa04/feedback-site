import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function DescriptionBox({ text, height }) {
  return (
    <div className='border-secdark bg-secdark mt-4 text-light rounded-1' style={{ height}}>
      <p className='py-1 px-2'>
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </p>
    </div>
  )
}
