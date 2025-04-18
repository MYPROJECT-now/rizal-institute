"use client";

export const UsersTable = () => {
  const users = [
    {
      id: 1,
      role: "Registrar",
      username: "reg_user",
      email: "reg@example.com",
    },
    {
      id: 2,
      role: "Cashier",
      username: "cash_user",
      email: "cash@example.com",
    },
    {
      id: 3,
      role: "Student",
      username: "student_user",
      email: "student@example.com",
    },
  ];

  const handleDelete = (id: number) => {
    // Handle delete action here (e.g. API call)
    console.log("Delete user with ID:", id);
  };

  return (
    <div className="overflow-x-auto mb-10 mx-10 mt-10">
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Role</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-100">
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
