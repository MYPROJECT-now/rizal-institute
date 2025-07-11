"use client";

import { useState, useEffect } from "react";
import { getRecentApplicants } from "@/src/actions/registrarAction";
import { RecentApplicantsType } from "@/src/type/REGISTRAR/applicant";

export const RecentApplicantsTable = () => {
  const [recentApplicants, setRecentApplicants] = useState<RecentApplicantsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentApplicants = async () => {
      const data = await getRecentApplicants();
      setRecentApplicants(data);
      setLoading(false);
    };
    fetchRecentApplicants();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="overflow-x-auto mb-10 shadow-lg rounded-lg border border-green-300 bg-green-50">
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-3">LRN</th>
            <th className="p-3">Full Name</th>
            <th className="p-3">Grade Level</th>
            <th className="p-3">Review Status</th>
            <th className="p-3">Date of Application</th>
          </tr>
        </thead>
        <tbody>
          {recentApplicants.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-4 text-black">
                No applicants found.
              </td>
            </tr>
          ) : (
            recentApplicants.map((applicant, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-green-100"
                } hover:bg-green-300 transition duration-200`}
              >
                <td className="p-3 font-medium text-gray-800">{applicant.lrn}</td>
                <td className="p-3">{applicant.lastName}, {applicant.firstName} {applicant.middleName}</td>
                <td className="p-3">{applicant.gradeLevel}</td>
                <td className="p-3 font-semibold text-yellow-700">
                  {applicant.applicationFormReviewStatus}
                </td>
                <td className="p-3 text-gray-600">{applicant.dateOfApplication?.toString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
