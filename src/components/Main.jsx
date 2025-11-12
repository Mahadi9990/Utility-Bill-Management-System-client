import React from 'react'
import SwiperList from './SwiperList'
import { useLoaderData } from 'react-router-dom'
import RecentBill from './RecentBill'
import Catagory from './Catagory'

export default function Main() {
  const allBills =useLoaderData()
  return (
    <div>
        <SwiperList allBills={allBills}/>
        <RecentBill/>
        <Catagory allBills={allBills}/>
    </div>
  )
}
