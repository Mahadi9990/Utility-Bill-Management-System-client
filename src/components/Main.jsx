import React, { useEffect, useRef } from "react";
import SwiperList from "./SwiperList";
import { useLoaderData } from "react-router-dom";
import RecentBill from "./RecentBill";
import Catagory from "./Catagory";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Main() {
  const allBills = useLoaderData();

  const swiperRef = useRef(null);
  const catRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ============ SWIPER TIMELINE =============
      const swiperTl = gsap.timeline({
        scrollTrigger: {
          trigger: swiperRef.current,
          start: "top 100%",
          toggleActions: "restart none none restart",
        },
      });

      swiperTl.from(swiperRef.current, {
        y: -200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });


      // ============ CATEGORY TIMELINE ============
      const catTl = gsap.timeline({
        scrollTrigger: {
          trigger: catRef.current,
          start: "top 95%",
          toggleActions: "restart none none restart",
        },
      });

      catTl.from(catRef.current, {
        y: 200,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={swiperRef}>
        <SwiperList allBills={allBills} />
      </div>

      <div className="max-w-[1000px] mx-auto">
        <div >
          <RecentBill />
        </div>

        <h1 className="text-center text-4xl font-bold mt-8">Category</h1>

        <div ref={catRef}>
          <Catagory allBills={allBills} />
        </div>
      </div>
    </div>
  );
}
