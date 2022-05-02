import React from 'react'
import { useRouter } from 'next/router'

export default function PollDetails() {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>Poll Details - {id}</div>
  )
}
