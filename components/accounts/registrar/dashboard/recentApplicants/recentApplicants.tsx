// remove "use client"; since this will be server-only
import { getRecentApplicants } from "@/src/actions/registrarAction";
import { RecentApplicantsType } from "@/src/type/REGISTRAR/applicant";

export const RecentApplicantsTable = async () => {
  const recentApplicants: RecentApplicantsType[] = await getRecentApplicants();

  return (
    <div className="overflow-x-auto min-w-[100px] mb-10 shadow-lg rounded-lg border border-green-300 bg-green-50">
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-3">LRN</th>
            <th className="p-3 min-w-[100px] sm:min-w-0">Full Name</th>
            <th className="p-3 min-w-[120px] sm:min-w-0" >Grade Level</th>
            <th className="p-3 min-w-[120px] sm:min-w-0">Review Status</th>
            <th className="p-3 min-w-[160px] sm:min-w-0">Date of Application</th>
          </tr>
        </thead>
        <tbody>
          {recentApplicants.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-4 text-black">
                No pending applicants found.
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
                <td className="p-3 ">{applicant.lrn}</td>
                <td className="p-3">
                  {applicant.lastName}, {applicant.firstName} {applicant.middleName}
                </td>
                <td className="px-[55px]">{applicant.gradeLevel}</td>
                <td className="p-3 font-semibold text-yellow-400">
                  {applicant.applicationFormReviewStatus}
                </td>
                <td className="p-3 ">
                  {applicant.dateOfApplication?.toString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
