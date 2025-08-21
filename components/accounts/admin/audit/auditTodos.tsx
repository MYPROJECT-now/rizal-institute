"use client";
import { AuditTrailsType } from "@/src/type/ADMIN/admin";
import { FC, useState } from "react";
import AuditTodo from "./auditTodo";
import { Button } from "@/components/ui/button";

interface Props {
  auditTodos: AuditTrailsType[];
}

const AuditTodos: FC<Props> = ({ auditTodos }) => {
    const [auditItems] = useState<AuditTrailsType[]>(auditTodos);
    const [filterUsername, setFilterUsername] = useState("");
    const [filterUsertype, setFilterUsertype] = useState("");

    // 🔢 Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const auditsPerPage = 6;

    const currentAction = auditItems.filter((audit) => {
        const usernameMatch = audit.username.toLowerCase().includes(filterUsername.toLowerCase());
        const usertypeMatch = filterUsertype === "" || audit.usertype === filterUsertype;
        return usernameMatch && usertypeMatch;
    });

    // pagination
    const indexOfLastAudit = currentPage * auditsPerPage;
    const indexOfFirstAudit = indexOfLastAudit - auditsPerPage;
    const currentAudits = currentAction.slice(indexOfFirstAudit, indexOfLastAudit);
    const totalPages = Math.max(1, Math.ceil(currentAction.length / auditsPerPage));


    
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
                <th className="px-4 py-2">Action Taken</th>
                <th className="px-4 py-2">Action For</th>
                <th className="px-4 py-2">Date Of Action</th>
            </tr>
            </thead>
            <tbody>
            {currentAudits.length === 0 ? (
                <tr>
                <td colSpan={5} className="p-4 text-black">
                No action found.
                </td>
            </tr>
            ) : (
            currentAudits.map((auditTodo, idx) => (
                <AuditTodo 
                key={auditTodo.auditTrail_id} 
                auditTodo={auditTodo} 
                className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
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

export default AuditTodos;
