import React, { use, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../providers/AuthContext";

export default function Bills() {
  const {user} =use(AuthContext)
  const bills = useLoaderData();
  const modleRef = useRef(null);
  const handelClick = () => {
    modleRef.current.showModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
     const formData = {
    title: form.title.value,
    category: form.category.value,
    email: form.email.value,
    location: form.location.value,
    description: form.description.value,
    image: form.image.value,
    date: form.date.value,
    amount: parseFloat(form.amount.value), // convert to number
  };
    try {
      const res = await fetch("http://localhost:3000/billsPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit bill");
      toast.success("Bill submitted successfully!");
       modleRef.current.close()
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-center items-center gap-6">
        <div className="">
          <h1>Add Bills</h1>
        </div>
        <button onClick={() => handelClick()} className="btn btn-primary">
          Open Model
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center">All Bill Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill, index) => (
          <Link key={index} to={`/bills/${bill._id}`}>
            <div className="border rounded-xl shadow-md hover:shadow-lg transition bg-white overflow-hidden">
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        ref={modleRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full border rounded-lg p-2"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                className="w-full border rounded-lg p-2"
                required
              />

              <input
                readOnly
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Email"
                className="w-full border rounded-lg p-2"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full border rounded-lg p-2"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                className="w-full border rounded-lg p-2"
                rows="3"
                required
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="w-full border rounded-lg p-2"
                required
              />

              <input
                type="date"
                name="date"
                className="w-full border rounded-lg p-2"
                required
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount (BDT)"
                className="w-full border rounded-lg p-2"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Submit Bill
              </button>
              <button onClick={() => modleRef.current.close()} className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
       <ToastContainer />
    </div>
  );
}
