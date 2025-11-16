import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../providers/AuthContext";

export default function Mybills() {
  const { user } = use(AuthContext);
  const [userPayBillList, setuserPayBillList] = useState([]);
  const [deleteId, setdeleteId] = useState(null);
  console.log(deleteId);
  const xbtn = useRef();
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
          xbtn.current.close();
        }
      });
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
            If you really want to delete this item, press the <span className="text-red-500">Yes</span> button.
            Otherwise, press Close
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
                      <button>Update</button>
                    </td>
                    <td>
                      <button
                        className="text-red-400"
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
    </div>
  );
}
