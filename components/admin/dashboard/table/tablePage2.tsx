"use client";

export const RecentLoginLogsTable = () => {
  const loginLogs = [
    {
      userName: "Juan Dela Cruz",
      role: "Student",
      loginTime: "2025-04-12 08:45 AM",
      action: "Logged In",
    },
    {
      userName: "Maria Santos",
      role: "Registrar",
      loginTime: "2025-04-12 07:20 AM",
      action: "Logged Out",
    },
    {
      userName: "Jose Rizal",
      role: "Cashier",
      loginTime: "2025-04-11 09:05 PM",
      action: "Session Timeout",
    },

    {
      userName: "Juan Dela Cruz",
      role: "Student",
      loginTime: "2025-04-12 08:45 AM",
      action: "Logged In",
    },
    {
      userName: "Maria Santos",
      role: "Registrar",
      loginTime: "2025-04-12 07:20 AM",
      action: "Logged Out",
    },
    {
      userName: "Jose Rizal",
      role: "Cashier",
      loginTime: "2025-04-11 09:05 PM",
      action: "Session Timeout",
    },

    {
      userName: "Juan Dela Cruz",
      role: "Student",
      loginTime: "2025-04-12 08:45 AM",
      action: "Logged In",
    },


  ];

  return (
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Login Time</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {loginLogs.map((log, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="border p-2">{log.userName}</td>
              <td className="border p-2">{log.role}</td>
              <td className="border p-2">{log.loginTime}</td>
              <td className="border p-2">{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
