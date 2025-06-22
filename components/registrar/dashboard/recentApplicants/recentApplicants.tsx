"use client";

import { useState, useEffect } from 'react';
import { getRecentApplicants } from '@/src/actions/registrarAction';
import { RecentApplicantsType } from '@/src/type/REGISTRAR/applicant';



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
            <th className="border p-2">Application Form Review Status</th>
            <th className="border p-2">Date of Application</th>
          </tr>
        </thead>
        <tbody>
          {recentApplicants.length === 0 ? (
            <tr>
              <td colSpan={7} className="border p-2 text-center">
                No recent enrollees found.
              </td>
            </tr>
          ) : (
            recentApplicants.map((applicant, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="border p-2">{applicant.lrn}</td>
                <td className="border p-2">{applicant.lastName}</td>
                <td className="border p-2">{applicant.firstName}</td>
                <td className="border p-2">{applicant.middleName}</td>
                <td className="border p-2">{applicant.gradeLevel}</td>
                <td className="border p-2">{applicant.applicationFormReviewStatus}</td>
                <td className="border p-2">{applicant.dateOfApplication?.toString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
