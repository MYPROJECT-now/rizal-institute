"use client";
import { Button } from "@/components/ui/button";

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
    {
      id: 4,
      role: "Student",
      username: "student_user",
      email: "student@example.com",
    },
    {
      id: 5,
      role: "Student",
      username: "student_user",
      email: "student@example.com",
    },
    {
      id: 6,
      role: "Student",
      username: "student_user",
      email: "student@example.com",
    },
    {
      id: 7,
      role: "Student",
      username: "student_user",
      email: "student@example.com",
    },
    {
      id: 8,
      role: "Student",
      username: "student_user",
      email: "student@example.com",
    },
    {
      id: 9,
      role: "Student",
      username: "student_user",
      email: "student@example.com",
    },
    {
      id: 10,
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
    <div className="w-full max-h-full flex flex-col sm:text-sm md:text-base lg:text-lg">
        <div className="flex flex-row items-center gap-5">
            <p className="font-bold  text-dGreen font-merriweather ml-5">
                Filter By:
            </p>
            <div className="grid sm:grid-cols-1 grid-row-3 md:grid-col-2 grid-row-2 lg:grid-cols-1 grid-row-3 gap-5 p-5">
            <input 
                type="text"
                placeholder="Username"
                className="border border-gray-600 p-2 rounded w-full sm:w-40 md:w-40 lg:w-40 xl:w-50 2xl:w-60" 
            />     
            <input 
                type="text"
                placeholder="Role"
                className="border border-gray-600 p-2 rounded w-full sm:w-40 md:w-40 lg:w-40 xl:w-50 2xl:w-60" 
            />    
            </div>
            <Button
                variant="mButton"
                className="text-white px-2 py-2 rounded-lg"
            >
                CLEAR FILTER
            </Button>
           </div>


    <div className="h-[350px] overflow-y-auto sm:text-sm md:text-base lg:text-lg mt-10">
      <table className="min-w-full border-collapse border border-gray-600 text-center overflow-auto table-fixed ">
        <thead className="sticky top-0 z-10">
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
    </div>
  );
};
