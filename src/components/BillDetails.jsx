import React from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BillDetails() {
  const data = useLoaderData(); // loaded from your loader
  const currentDate = new Date();
  const billDate = new Date(data.date);
  const currentMonth = currentDate.getMonth();
const billMonth = billDate.getMonth();

  return (
    <div className="max-w-5xl mx-auto p-6 md:flex gap-8 bg-white rounded-2xl shadow-lg mt-10">
      <div className="md:w-1/2">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />
      </div>

      <div className="md:w-1/2 mt-6 md:mt-0 space-y-3">
        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
        <p className="text-gray-500">{data.category}</p>
        <p className="text-gray-700 leading-relaxed">{data.description}</p>

        <div className="flex justify-between items-center mt-4 text-gray-700">
          <span className="font-medium">Date: {data.date}</span>
          <span className="font-medium">Amount: {data.amount} BDT</span>
        </div>

        <p className="text-sm text-gray-500">Email: {data.email}</p>
        <p className="text-sm text-gray-500">Location: {data.location}</p>

        {/* ...other bill info... */}

        {billMonth < currentMonth ? (
            <>
          <button disabled
            onClick={() => toast("Enrolled successfully!")}
            className="mt-6 w-full bg-blue-300 text-[#e5d1d1] py-2 rounded-lg hover:bg-blue-300 transition"
          >
            Pay now
          </button>
          <button
            onClick={() => toast("Pay with fines")}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Pay with fine
          </button>
          </>
        ) : (
          <button
            onClick={() => toast("Enrolled successfully!")}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Pay now
          </button>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
