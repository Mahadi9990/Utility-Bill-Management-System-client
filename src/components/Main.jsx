import React from "react";
import SwiperList from "./SwiperList";
import { useLoaderData } from "react-router-dom";
import RecentBill from "./RecentBill";
import Catagory from "./Catagory";
import Loading from "./Loading";

export default function Main() {
  const allBills = useLoaderData();
  return (
    <div>
      <SwiperList className="" allBills={allBills} />
    <div className='max-w-[1000px] mx-auto'>
      <RecentBill />
      <h1 className="text-center text-4xl font-bold">Catagory</h1>
      <Catagory  allBills={allBills} />
      </div>
    </div>
  );
}
