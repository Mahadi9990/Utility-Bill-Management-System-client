import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthContext";

export default function BillDetails() {
  const { user } = use(AuthContext);
  const data = useLoaderData(); // loaded from your loader
  const [allUserPaybillsRecord, setallUserPaybillsRecord] = useState([]);
  const currentDate = new Date();
  const billDate = new Date(data.date);
  const currentMonth = currentDate.getMonth();
  const modleRef = useRef();
  const billMonth = billDate.getMonth();
  useEffect(() => {
    fetch(`http://localhost:3000/billsRecodes/${data._id}`)
      .then((res) => res.json())
      .then((data) => setallUserPaybillsRecord(data));
  }, [data._id]);
  const handelClick = () => {
    modleRef.current.showModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: data.title,
      payUserEmail: user.email,
      category: data.category,
      payUserId: data._id,
      amounts: parseFloat(data.amount), // convert to number
    };
    try {
      fetch("http://localhost:3000/billsRecords", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      modleRef.current.close();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="">
        <dialog
          ref={modleRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Pay your bill!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={data.title}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    User Email
                  </label>
                  <input
                    type="email"
                    name="payUserEmail"
                    defaultValue={user.email}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={data.category}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    name="payUserId"
                    defaultValue={data._id}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Amount (BDT)
                  </label>
                  <input
                    type="number"
                    name="amounts"
                    defaultValue={data.amount}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                  Submit Payment
                </button>
              </form>
            </div>
                <button
                  onClick={() => modleRef.current.close()}
                  className="btn"
                >
                  Close
                </button>
          </div>
        </dialog>
      </div>
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
              <button
                disabled
                onClick={() => {
                  handelClick();
                }}
                className="mt-6 w-full bg-blue-300 text-[#e5d1d1] py-2 rounded-lg hover:bg-blue-300 transition"
              >
                Pay now
              </button>
              <button
                onClick={() => {
                  handelClick();
                }}
                className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Pay with fine
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handelClick();
              }}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Pay now
            </button>
          )}
          <ToastContainer />
        </div>
      </div>
      {allUserPaybillsRecord.length == 0 ? (
        <h1 className="my-6 text-center font-2xl font-bold">
          no Payment records founds
        </h1>
      ) : (
        <div className=" my-6">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Inext No</th>
                  <th>User Email</th>
                  <th>Title</th>
                  <th>Catagory</th>
                </tr>
              </thead>
              {allUserPaybillsRecord.map((item, index) => (
                <tbody key={index}>
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <p>{item?.payUserEmail}</p>
                    </td>
                    <td>{item?.title}</td>
                    <td>{item?.category}</td>
                  </tr>
                </tbody>
              ))}
              {/* foot */}
            </table>
          </div>
        </div>
      )}
    </>
  );
}
