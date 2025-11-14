import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
    <Header/>


    <div className="h-screen w-full flex items-center justify-center text-white">
      <div className="text-center px-6">
        <h1 className="text-9xl font-extrabold text-[#FF5A0A]">404</h1>

        <p className="text-xl mt-4 text-[#100e0e]">
          Oops! The page you're looking for doesn't exist.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 primary-color transition-all text-[#100e0e] rounded-xl shadow-lg text-lg font-semibold"
          >
            Go Back Home
          </Link>
        </div>

        <div className="mt-10">
          <div className="animate-bounce text-5xl">🔍</div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
