import React from "react";
import SwiperList from "./SwiperList";
import { useLoaderData } from "react-router-dom";
import RecentBill from "./RecentBill";
import Catagory from "./Catagory";
import Extra_1 from "./Extra_1";
import About from "./About";
;

export default function Main() {
  const allBills = useLoaderData();



  return (
    <div>
      <div >
        <SwiperList allBills={allBills} />
      </div>

      <div className="max-w-[1000px] mx-auto">
        <div >
          <RecentBill />
        </div>

        <h1 className="text-center text-4xl font-bold mt-8">Category</h1>

        <div>
          <Catagory allBills={allBills} />
        </div>
        <Extra_1/>
        <About/>
      </div>
    </div>
  );
}
