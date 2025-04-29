"use client";

export const RecentTransactionsTable = () => {
  const staticData = [
    {
      studentName: "Juan Dela Cruz",
      gradeLevel: "Grade 7",
      amountPaid: 5000,
      balanceDue: 2500,
      datePaid: "2025-04-10",
      paymentStatus: "Partial",
    },
    {
      studentName: "Maria Santos",
      gradeLevel: "Grade 8",
      amountPaid: 7500,
      balanceDue: 0,
      datePaid: "2025-04-08",
      paymentStatus: "Paid",
    },
    {
      studentName: "Jose Rizal",
      gradeLevel: "Grade 10",
      amountPaid: 3000,
      balanceDue: 3000,
      datePaid: "2025-04-05",
      paymentStatus: "Unpaid",
    },
  ];

  return (
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Grade Level</th>
            <th className="border p-2">Amount Paid</th>
            <th className="border p-2">Balance Due</th>
            <th className="border p-2">Date Paid</th>
            <th className="border p-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {staticData.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="border p-2">{item.studentName}</td>
              <td className="border p-2">{item.gradeLevel}</td>
              <td className="border p-2">₱{item.amountPaid.toLocaleString()}</td>
              <td className="border p-2">₱{item.balanceDue.toLocaleString()}</td>
              <td className="border p-2">{item.datePaid}</td>
              <td className="border p-2">{item.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
