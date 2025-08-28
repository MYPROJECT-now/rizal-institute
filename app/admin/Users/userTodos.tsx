"use client";
import {  UserType } from "@/src/type/ADMIN/admin";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/src/actions/adminAction";
import UserTodo from "./userTodo";

interface Props {
  userTodos: UserType[];
}

const UserTodos: FC<Props> = ({ userTodos }) => {
    const [userItems, setUserItems] = useState<UserType[]>(userTodos);
    const [filterUsername, setFilterUsername] = useState("");
    const [filterUsertype, setFilterUsertype] = useState("");

    // 🔢 Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const userPerPage = 5;

    const currentUser = userItems.filter((user) => {
        const usernameMatch = user.clerk_username.toLowerCase().includes(filterUsername.toLowerCase());
        const usertypeMatch = filterUsertype === "" || user.userType === filterUsertype;
        return usernameMatch && usertypeMatch;
    });

    // pagination
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUsers = currentUser.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.max(1, Math.ceil(currentUser.length / userPerPage));

    const deleteUserItem = ( clerkId: string, clerk_username: string) => {
      setUserItems((prev) => prev.filter((user) => user.clerkId !== clerkId));
      deleteUser( clerkId, clerk_username);
    };

  return (
    <main className="mx-auto max-w-8xl w-full  p-8  text-center">


    <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="text-green-900 font-bold text-lg">Filter By:</label>

        <input
            type="text"
            placeholder="Username"
            value={filterUsername}
            onChange={(e) => setFilterUsername(e.target.value)}
            className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        />

        <select 
            value={filterUsertype} 
            onChange={(e) => setFilterUsertype(e.target.value)}
            className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        >
            <option value="">All Usertypes</option>
            <option value="admin">Admin</option>
            <option value="registrar">Registrar</option>
            <option value="teacher">Teacher</option>
            <option value="cashier">Cashier</option>
        </select>

        <Button
            onClick={() => {
                setFilterUsername("");
                setFilterUsertype("");
            }}
            variant="confirmButton"
            className="w-[100px] h-[40px] rounded-lg"
        >
            Clear Filter
        </Button>
    </div>
    <div className="overflow-x-auto shadow-lg rounded-lg border border-green-300 bg-green-50">
        <table className="w-full text-sm text-center">
            <thead>
            <tr className="bg-green-600 text-white ">
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">User Type</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
            </tr>
            </thead>
            <tbody>
            {currentUsers.length === 0 ? (
                <tr>
                <td colSpan={7} className="p-4 text-black">
                No action found.
                </td>
            </tr>
            ) : (
            currentUsers.map((userTodo, idx) => (
                <UserTodo 
                key={userTodo.clerkId} 
                userTodo={userTodo} 
                className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
                deleteUserItem={deleteUserItem}
                />
            ))
            )}
            </tbody>
        </table>
    </div>

    {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="prevButton"
            className="w-[100px] h-[40px] rounded-lg"
          >
            Previous
          </Button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="prevButton"
            className="w-[100px] h-[40px] rounded-lg"
          >
            Next
          </Button>
        </div>

    </main>
  );
};

export default UserTodos;