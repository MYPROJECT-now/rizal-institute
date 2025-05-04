// "use client";

// import { useState, useEffect } from 'react';
// import { getRecentEnrollee } from "@/src/actions/serverActions";

// interface EnrolleeType {
//   lrn: string;
//   lastName: string;
//   firstName: string;
//   middleName: string;
//   gradeLevel: string | null;
//   applicationStatus: string | null;
//   dateOfApplication: string | null;
// }

// export const RecentEnrolleesTable = () => {
//   const [recentEnrollees, setRecentEnrollees] = useState<EnrolleeType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecentEnrollees = async () => {
//       const data = await getRecentEnrollee();
//       setRecentEnrollees(data);
//       setLoading(false);
//     };
//     fetchRecentEnrollees();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const pendingEnrollees = recentEnrollees.filter((enrollee) => enrollee.applicationStatus === 'Pending');

//   return (
//     <div className="overflow-x-auto mb-10">
//       <table className="min-w-full border-collapse border border-gray-300 text-center">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">LRN</th>
//             <th className="border p-2">Last Name</th>
//             <th className="border p-2">First Name</th>
//             <th className="border p-2">Middle Name</th>
//             <th className="border p-2">Grade Level</th>
//             <th className="border p-2">Application Status</th>
//             <th className="border p-2">Date of Application</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingEnrollees.length === 0 ? (
//             <tr>
//               <td colSpan={7} className="border p-2 text-center">
//                 No pending enrollees found.
//               </td>
//             </tr>
//           ) : (
//             pendingEnrollees.map((enrollee, index) => (
//               <tr key={index} className="border-t hover:bg-gray-100">
//                 <td className="border p-2">{enrollee.lrn}</td>
//                 <td className="border p-2">{enrollee.lastName}</td>
//                 <td className="border p-2">{enrollee.firstName}</td>
//                 <td className="border p-2">{enrollee.middleName}</td>
//                 <td className="border p-2">{enrollee.gradeLevel}</td>
//                 <td className="border p-5 ">{enrollee.applicationStatus}</td>
//                 <td className="border p-2">{enrollee.dateOfApplication?.toString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };


"use client";

import { useState, useEffect } from 'react';
import { getRecentEnrollee } from "@/src/actions/serverActions";

interface EnrolleeType {
  lrn: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gradeLevel: string | null;
  applicationStatus: string | null;
  dateOfApplication: string | null;
}

export const RecentEnrolleesTable = () => {
  const [recentEnrollees, setRecentEnrollees] = useState<EnrolleeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEnrollees = async () => {
      const data = await getRecentEnrollee();
      setRecentEnrollees(data);
      setLoading(false);
    };
    fetchRecentEnrollees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">LRN</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Middle Name</th>
            <th className="border p-2">Grade Level</th>
            <th className="border p-2">Application Status</th>
            <th className="border p-2">Date of Application</th>
          </tr>
        </thead>
        <tbody>
          {recentEnrollees.length === 0 ? (
            <tr>
              <td colSpan={7} className="border p-2 text-center">
                No recent enrollees found.
              </td>
            </tr>
          ) : (
            recentEnrollees.map((enrollee, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="border p-2">{enrollee.lrn}</td>
                <td className="border p-2">{enrollee.lastName}</td>
                <td className="border p-2">{enrollee.firstName}</td>
                <td className="border p-2">{enrollee.middleName}</td>
                <td className="border p-2">{enrollee.gradeLevel}</td>
                <td className="border p-2">{enrollee.applicationStatus}</td>
                <td className="border p-2">{enrollee.dateOfApplication?.toString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
