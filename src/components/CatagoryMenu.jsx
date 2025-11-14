import React, { useState } from "react";
import { Link, NavLink } from "react-router";

export default function CatagoryMenu({ catagoryName, allBills }) {
  const [bills, setbills] = useState(allBills);
  const handleClick = (menuName) => {
    if (menuName === "All") {
      fetch(`http://localhost:3000/bills`)
        .then((res) => res.json())
        .then((data) => setbills(data));
    } else {
      fetch(`http://localhost:3000/catagorys/${menuName}`)
        .then((res) => res.json())
        .then((data) => setbills(data));
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 mx-auto">
        {catagoryName.map((item) => (
          <div key={item._id}>
            <button
              onClick={() => handleClick(item.category)}
              className="btn primary-color"
            >
              {item.category}
            </button>
          </div>
        ))}
      </div>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
          {bills.map((bill, index) => (
            <div
              key={index}
              className="border bg-red- rounded-xl shadow-md hover:shadow-lg transition bg-white overflow-hidden"
            >
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex justify-evenly items-center">
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{bill.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    📍 {bill.location} | 📅 {bill.date}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    {bill.description}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    Category: {bill.category}
                  </p>
                  <p className="text-sm text-green-700 font-bold mt-2">
                    Amount: {bill.amount} BDT
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{bill.email}</p>
                </div>
                <div className="">
                  <Link to={`/bills/${bill._id}`}>
                    <button className="btn primary-color text-[12px]">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
