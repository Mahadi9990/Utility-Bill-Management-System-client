import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";

export default function Mybills() {
  const { user } = use(AuthContext);
  const [userPayBillList, setuserPayBillList] = useState([]);
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
  return (
    <div>
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
                  </tr>
                </tbody>
              ))}
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total Bills</th>
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
