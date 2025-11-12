import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import CatagoryMenu from "./CatagoryMenu";

export default function Catagory({allBills}) {
    const [catagoryName, setcatagoryName] = useState([]);
        useEffect(() => {
         fetch("http://localhost:3000/catagorys").then(res =>res.json()).then(data=>setcatagoryName(data))
        }, []);
  return (
    <div>
      <div className="">
      <CatagoryMenu allBills={allBills} catagoryName={catagoryName} />
      </div>
    </div>
  );
}
