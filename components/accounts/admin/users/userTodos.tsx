"use client";
import {  UserType } from "@/src/type/ADMIN/admin";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/src/actions/adminAction";
import UserTodo from "./userTodo";
import { CreateAccount } from "../account_modal/account";
import { useAccountModal } from "@/src/store/ADMIN/account";

interface Props {
  userTodos: UserType[];
}

const UserTodos: FC<Props> = ({ userTodos }) => {
    const [userItems, setUserItems] = useState<UserType[]>(userTodos);
    const [filterUsername, setFilterUsername] = useState("");
    const [filterUsertype, setFilterUsertype] = useState("");
    const { open } = useAccountModal();
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
    <main className=" min-h-[600px] lg:min-h-0 text-xs sm:text-sm   w-full  sm:px-8 px-4 py-6 sm:pt-6 text-center">

    <div className="flex  flex-col sm:flex-row  items-start sm:items-center gap-1 sm:gap-3 lg:gap-4 mb-4">
      <label className="text-green-900 font-bold text-xs  sm:text-lg">Filter By:</label>

        <input
            type="text"
            placeholder="Username"
            value={filterUsername}
            onChange={(e) => setFilterUsername(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        />

        <select 
            value={filterUsertype} 
            onChange={(e) => setFilterUsertype(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
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
            className=" rounded-lg text-xs sm:text-sm  xl:px-5 px-3 lg:py-5 py-4 sm:mt-0 mt-2   "
        >
            Clear Filter
        </Button>
        < CreateAccount/>
        <Button
          className=" rounded-lg text-xs sm:text-sm  xl:px-5 px-3 lg:py-5 py-4 sm:mt-0 mt-2 "
          variant={"confirmButton"}
          onClick={open}
        >
          Create User
        </Button>
    </div>

<div className=" overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
  <table className="w-full text-xs sm:text-sm text-center">
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
        <div className="flex justify-center items-center mt-4 gap-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="prevButton"
          className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm  "
          >
            Previous
          </Button>
        <span className="font-semibold flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="prevButton"
          className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm  "
          >
            Next
          </Button>
        </div>

    </main>
  );
};

export default UserTodos;
