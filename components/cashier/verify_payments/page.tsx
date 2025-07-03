"use client";

import { useEffect, useState } from "react";
import {  acceptPayment, declinePayment, getPendingPayments } from "@/src/actions/cashierAction";
import { Button } from "@/components/ui/button";

interface PendingPayment {
  monthlyPayment_id: number;
  month_id: number | null;
  student_id: number;
  amount: number;
  status: string;
  dateOfPayment: string | null;
  SInumber: string | null;
}

const PaymentApprovalPage = () => {
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    setLoading(true);
    // Fetch pending payments using the server action
    const data = await getPendingPayments();
    setPendingPayments(data || []);
    setLoading(false);
  };

  const handleApprove = async (payment: PendingPayment) => {
    setActionLoading(payment.monthlyPayment_id);
    await acceptPayment(payment.monthlyPayment_id, payment?.month_id || 0, payment.amount);
    await fetchPendingPayments();
    setActionLoading(null);
  };

  const handleDecline = async (payment: PendingPayment) => {
    setActionLoading(payment.monthlyPayment_id);
    await declinePayment(payment.monthlyPayment_id);
    await fetchPendingPayments();
    setActionLoading(null);
  };

  return (
    <div className="p-8">
      {loading ? (
        <div>Loading...</div>
      ) : pendingPayments.length === 0 ? (
        <div>No pending payments.</div>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-1 border">Student ID</th>
              <th className="px-2 py-1 border">Month ID</th>
              <th className="px-2 py-1 border">Amount</th>
              <th className="px-2 py-1 border">Status</th>
              <th className="px-2 py-1 border">Date</th>
              <th className="px-2 py-1 border">SI Number</th>
              <th className="px-2 py-1 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment) => (
              <tr key={payment.monthlyPayment_id}>
                <td className="px-2 py-1 border">{payment.student_id}</td>
                <td className="px-2 py-1 border">{payment.month_id}</td>
                <td className="px-2 py-1 border">₱{payment.amount.toLocaleString()}</td>
                <td className="px-2 py-1 border">{payment.status}</td>
                <td className="px-2 py-1 border">{payment.dateOfPayment || "-"}</td>
                <td className="px-2 py-1 border">{payment.SInumber || "-"}</td>
                <td className="px-2 py-1 border space-x-2">
                  <Button
                    onClick={() => handleApprove(payment)}
                    disabled={actionLoading === payment.monthlyPayment_id}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    {actionLoading === payment.monthlyPayment_id ? "Approving..." : "Approve"}
                  </Button>
                  <Button
                    onClick={() => handleDecline(payment)}
                    disabled={actionLoading === payment.monthlyPayment_id}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    {actionLoading === payment.monthlyPayment_id ? "Declining..." : "Decline"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentApprovalPage;
