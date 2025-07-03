"use client";

import { getRecentPayments } from "@/src/actions/cashierAction";
import { RecentPaymentType } from "@/src/type/CASHIER/RECENT_PAYMENT/recentPayment";
import { useEffect, useState } from "react";


export const RecentPaymentsTable =  () => {
const [recentPayment, setRecentPayments] = useState<RecentPaymentType[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchRecentPayments = async () => {
    const data = await getRecentPayments();
    setRecentPayments(data);
    setLoading(false);
  };
  fetchRecentPayments();
}, []);

if (loading) {
  return <div>Loading...</div>;
}

  return (
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">LRN</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Grade Level</th>
            <th className="border p-2">Amount Paid</th>
            <th className="border p-2">Date Paid</th>
          </tr>
        </thead>
        <tbody>
          {recentPayment.length === 0 ? (
            <tr>  
              <td colSpan={4} className="border p-2 text-center">
                No recent payments found.
              </td>
            </tr>
          ) : (
          recentPayment.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="border p-2">{item.lrn}</td>
              <td className="border p-2">{item.studentLastName}, {item.studentFirstName} {item.studentMiddleName} {item.studentSuffix}</td>
              <td className="border p-2">Grade 7</td>
              <td className="border p-2">₱{item.amount.toLocaleString()}</td>
              <td className="border p-2">{item.dateOfPayment}</td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};
