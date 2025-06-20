"use client";

export const AdminAuditTrailsTable = () => {
  const auditTrails = [
    {
      role: "Registrar",
      timestamp: "2025-04-12 08:45 AM",
      action: "Accepted student application",
    },
    {
      role: "Registrar",
      timestamp: "2025-04-12 09:20 AM",
      action: "Denied student application",
    },
    {
      role: "Cashier",
      timestamp: "2025-04-12 10:15 AM",
      action: "Accepted reservation fee",
    },
    {
      role: "Cashier",
      timestamp: "2025-04-12 11:30 AM",
      action: "Denied reservation fee",
    },
    {
      role: "Cashier",
      timestamp: "2025-04-12 12:00 PM",
      action: "Accepted tuition fee",
    },
    {
      role: "Teacher",
      timestamp: "2025-04-12 01:00 PM",
      action: "Uploaded grade",
    },
    {
      role: "Registrar",
      timestamp: "2025-04-12 01:45 PM",
      action: "Accepted student application",
    },
    {
      role: "Registrar",
      timestamp: "2025-04-12 01:45 PM",
      action: "Accepted student application",
    },
  ];

  return ( 
    //fixed table, scrollable content
    <div className=" max-h-[350px] overflow-y-auto"> 
      <table className="min-w-full table-fixed border-collapse border border-gray-500 text-center overflow-auto">
        <thead className="sticky top-0 z-10">
          <tr className="bg-green-600">
            <th className="border p-2">Role</th>
            <th className="border p-2">Action Taken</th>
            <th className="border p-2">Date of Action</th>
          </tr>
        </thead>
        <tbody>
          {auditTrails.map((trail, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2 font-semibold">{trail.role}</td>
              <td className="border p-2">{trail.action}</td>
              <td className="border p-2 text-sm text-gray-600">{trail.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
