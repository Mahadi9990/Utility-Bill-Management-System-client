import React from 'react'
import SwiperList from './SwiperList'
import { useLoaderData } from 'react-router-dom'
import RecentBill from './RecentBill'

export default function Main() {
  const allSkills =useLoaderData()
  return (
    <div>
        <SwiperList allSkills={allSkills}/>
        <RecentBill/>
    </div>
  )
}
