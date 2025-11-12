import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function RecentBill() {
    const [bills, setbills] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/sixBills").then((res)=>res.json()).then(item=>setbills(item))
    }, []);
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          All Bill Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bills.map((bill, index) => (
            <Link key={index} to={`/bills/${bill._id}`}>
            <div
              className="border rounded-xl shadow-md hover:shadow-lg transition bg-white overflow-hidden"
            >
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{bill.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  📍 {bill.location} | 📅 {bill.date}
                </p>
                <p className="text-gray-700 text-sm mb-2">{bill.description}</p>
                <p className="text-sm font-medium text-blue-600">
                  Category: {bill.category}
                </p>
                <p className="text-sm text-green-700 font-bold mt-2">
                  Amount: {bill.amount} BDT
                </p>
                <p className="text-xs text-gray-400 mt-1">{bill.email}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
