

import { getAuditTrails } from "@/src/actions/adminAction";
import { AuditTrailsType } from "@/src/type/ADMIN/admin";


export const RecentAuditTrailsTable = async () => {


  const auditTrails: AuditTrailsType[] = await getAuditTrails();

  return (
    <div className="overflow-x-auto min-w-[100px] mb-10 shadow-lg rounded-lg border border-green-300 bg-green-50">
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-3">Username</th>
            <th className="p-3">Role</th>
            <th className="p-3 px-[60px]">Action Taken</th>
            <th className="p-3">Action Taken to</th>
            <th className="p-3">Date of Action</th>
          </tr>
        </thead>
        <tbody>
          {auditTrails.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-black">
                No action taken.
              </td>
            </tr>
          ) : (
            auditTrails.map((audit, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-green-100"
                } hover:bg-green-300 transition duration-200`}
              >
                <td className="p-3 font-medium text-gray-800">{audit.username}</td>
                <td className="p-3 font-medium text-gray-800">{audit.usertype}</td>
                <td className="p-3  font-medium text-gray-800">{audit.actionTaken}</td>
                <td className="p-3 font-medium text-gray-800">{audit.actionTakenFor}</td>
                <td className="p-3  font-medium text-gray-800">{audit.dateOfAction?.toString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
