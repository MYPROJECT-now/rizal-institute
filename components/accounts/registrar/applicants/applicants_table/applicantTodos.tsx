  "use client";
  import { FC, useState } from "react";
  import Student from "./applicantTodo";
  import { Tableapplicant_Type } from "@/src/type/REGISTRAR/applicant";
  import { Button } from "@/components/ui/button";
  import { toast } from "sonner";
import { Enrollees_info_Modal } from "../applicants_information_modal/applicants_modal";



  interface Props {
    applicants: Tableapplicant_Type [];
    
  }

  const Applicants: FC<Props> = ({ applicants }) => {
    const [applicantList, setApplicantList] = useState<Tableapplicant_Type []>(applicants);
    const [filterName, setFilterName] = useState("");
    const [filterLRN, setFilterLRN] = useState("");
    const [filterGrade, setFilterGrade] = useState("");
    const [loadingId, setLoadingId] = useState<number | null>(null);
    
    // const [studentsPerPage, setStudentsPerPage] = useState(5);
    // 🔢 Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    const handleAccept = async (id: number, lastName: string, firstName: string, middleName: string) => {
      setLoadingId(id);
      try {
        const response = await fetch('/api/accept/registrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId: id, name: lastName + " " + firstName + " " + middleName }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          setApplicantList((prevList) => 
            prevList.map((student) => 
              (student.id === id 
                ?{...student, 
                      applicationFormReviewStatus: data.applicationFormReviewStatus, 
                      dateApprovedByRegistrar:data.dateApprovedByRegistrar} 
                : student)));
        } else {
          toast.error(data.message || "Failed to send email.");
        }
      } catch (error) {
        toast.error("Something went wrong while accepting the applicant.");
        console.error(error);
      }
    finally {
      setLoadingId(null);
    }
    };

    const handleDecline = (id: number) => {
      setApplicantList((prevList) =>
        prevList.map((student) =>
          student.id === id
            ? { ...student, applicationFormReviewStatus: "Declined" }
            : student
        )
      );
    };


  const filteredStudents = applicantList.filter((student) => {
    const fullName = `${student.firstName} ${student.middleName ?? ""} ${student.lastName}`.toLowerCase();
    const matchesName = fullName.includes(filterName.toLowerCase());
    const matchesLRN = student.lrn.includes(filterLRN);
    const matchesGrade = filterGrade === "" || student.gradeLevel === filterGrade;

    return matchesName && matchesLRN && matchesGrade;
  });

    // 🧮 Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));


    return (
    <main className=" min-h-[600px] lg:min-h-0 text-xs sm:text-sm   w-full  px-8 py-6 sm:pt-6 text-center">

    <div className="flex  flex-col sm:flex-row  items-start sm:items-center gap-1 sm:gap-3 lg:gap-4 mb-4">
      <label className="text-green-900 font-bold text-xs  sm:text-lg">Filter By:</label>

      <input
        type="text"
        placeholder="Name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
      />

      <input
        type="text"
        placeholder="LRN"
        value={filterLRN}
        onChange={(e) => setFilterLRN(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
      />

      <select
        value={filterGrade}
        onChange={(e) => setFilterGrade(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
      >
        <option value="">All Grades</option>
        <option value="7">Grade 7</option>
        <option value="8">Grade 8</option>
        <option value="9">Grade 9</option>
        <option value="10">Grade 10</option>
        {/* Add other grades as needed */}
      </select>

      <Button
        onClick={() => {
          setFilterName("");
          setFilterLRN("");
          setFilterGrade("");
        }}
        variant="confirmButton"
    className=" rounded-lg text-xs sm:text-sm  xl:px-5 px-3 lg:py-5 py-4 sm:mt-0 mt-2   "
      >
        Clear Filter
      </Button>
  </div>

<div className=" overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
    <Enrollees_info_Modal />

  <table className="w-full text-xs sm:text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white ">
            <th className="px-4 py-2">LRN</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Grade Level</th>
            <th className="px-4 py-2">Status</th>
            {/* <th className="px-6 py-2">Date Approved</th> */}
            <th className="px-4 py-2">Full Info</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentStudents.length === 0 ? (
            <tr>
            <td colSpan={7} className="p-4 text-black">
              No recent applicants found.
            </td>
          </tr>
        ) : (
          currentStudents.map((student, idx) => (
            <Student 
              key={student.lrn} 
              applicant={student} 
              onAccept={handleAccept}
              onDecline={handleDecline} // 👈 NEW!
              className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
              loading={loadingId === student.admission_id}
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

  export default Applicants;
