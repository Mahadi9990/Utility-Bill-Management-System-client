import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Mybills() {
  const { user } = use(AuthContext);
  const [userPayBillList, setuserPayBillList] = useState([]);
  const [deleteId, setdeleteId] = useState(null);
  const [updateId, setupdateId] = useState(null);
  const [userId, setuserId] = useState({});
  const xbtn = useRef();
  const upbtn = useRef();
  useEffect(() => {
    fetch(`http://localhost:3000/userBillsRecords?email=${user.email}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setuserPayBillList(data));
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const amounts = e.target.amounts.value;
    const updatePaybillData = { title, amounts };
    fetch(`http://localhost:3000/UpdataReports/${updateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePaybillData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.modifiedCount);
        if (data.modifiedCount > 0) {
          const updatedList = userPayBillList.map((bill) =>
            bill._id === updateId ? { ...bill, title, amounts } : bill
          );

          setuserPayBillList(updatedList);
        }
        upbtn.current.close();
      });
  };
  const totalAmount = userPayBillList.reduce(
    (sum, bill) => sum + (bill.amounts || 0),
    0
  );

  const handleDelete = (id) => {
    console.log("delete");
    fetch(`http://localhost:3000/billsRecodes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.deletedCount);
        if (data.deletedCount) {
          const remainUser = userPayBillList.filter((item) => item._id !== id);
          setuserPayBillList(remainUser);
        }
        xbtn.current.close();
      });
  };

 const downloadPDF = () => {
  const doc = new jsPDF("p", "pt", "a4");

  doc.setFontSize(18);
  doc.text("Utility Bill Records", 40, 40);

  const tableColumn = ["#", "Email", "Title", "Category", "Amount"];
  const tableRows = [];

  userPayBillList.forEach((item, index) => {
    tableRows.push([
      index + 1,
      item.payUserEmail,
      item.title,
      item.category,
      item.amounts + " BDT",
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 70,
    theme: "grid",
    styles: { fontSize: 10 },
  });

  doc.save("Utility_Bill_Records.pdf");
};


  return (
    <div>
      <dialog
        ref={xbtn}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            If you really want to delete this item, press the{" "}
            <span className="text-red-500">Yes</span> button. Otherwise, press
            Close
          </h3>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => xbtn.current.close()} className="btn">
                Cencel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="btn text-red-600"
              >
                Yes
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="">
        <dialog
          ref={upbtn}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Pay your bill!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={userId.title}
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
                    readOnly
                    name="payUserEmail"
                    defaultValue={user.email}
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
                    readOnly
                    defaultValue={userId.payUserId}
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
                    defaultValue={userId.amounts}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                  update Payment
                </button>
              </form>
            </div>
            <button onClick={() => upbtn.current.close()} className="btn">
              Close
            </button>
          </div>
        </dialog>
      </div>
      {userPayBillList.length == 0 ? (
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
                  <th>Amount</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {userPayBillList.map((item, index) => (
                <tbody key={index}>
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <p>{item?.payUserEmail}</p>
                    </td>
                    <td>{item?.title}</td>
                    <td>{item?.category}</td>
                    <td>{item?.amounts}</td>
                    <td>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          console.log(item._id);
                          setupdateId(item._id);
                          setuserId({
                            payUserId: item.payUserId,
                            amounts: item.amounts,
                            title: item.title,
                          });
                          upbtn.current.showModal();
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="text-red-400 cursor-pointer"
                        onClick={() => {
                          setdeleteId(item._id);
                          xbtn.current.showModal();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total Bill pay :{userPayBillList.length}</th>
                  <th>{totalAmount}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
      <button onClick={downloadPDF} className="btn bg-blue-600 text-white my-4">
        Download PDF
      </button>
    </div>
  );
}
