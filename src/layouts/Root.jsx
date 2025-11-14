import React, { Suspense } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

export default function Root() {
  return (<>
    <Header/>
    <Suspense fallback={<Loading/>}>
      <Outlet/>
    </Suspense>
    <Footer/>
  </>
  )
}
