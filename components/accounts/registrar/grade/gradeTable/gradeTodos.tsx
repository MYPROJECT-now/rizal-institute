"use client";
import { FC, useState } from "react";
import { Grade_Type, } from "@/src/type/REGISTRAR/applicant";
import { Button } from "@/components/ui/button";
import Grade from "./gradeTodo";
import { Enrollees_info_Modal } from "../grades_modal/grades_modal";



interface Props {
  grade: Grade_Type[];
  statuses: { student_id: number; status: string; }[]; // adjust type to your query result

}

const Applicants: FC<Props> = ({ grade, statuses}) => {
  const [applicantList,] = useState<Grade_Type []>(grade);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");



  // 🔢 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;



  const filteredStudents = applicantList.filter((student) => {
    const fullName = `${student.studentFirstName} ${student.studentMiddleName ?? ""} ${student.studentLastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      student.lrn.includes(searchQuery);
    const studentStatus = statuses.find((s) => s.student_id === student.id)?.status ?? "";
    const matcheStatus = filterStatus === "" || studentStatus  === filterStatus;

  return matchesSearch && matcheStatus;
  });

  // 🧮 Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));


  return (
  <div className=" flex-1 lg:min-h-0 text-xs sm:text-sm  sm:px-8 px-3 sm:py-6 py-4 sm:pt-6 text-center">
    <Enrollees_info_Modal />

    <section className="flex  flex-col sm:flex-row  items-start sm:items-center gap-1 sm:gap-3 lg:gap-4 mb-4">
      <label className="text-green-900 font-bold text-sm  sm:text-lg">Filter By:</label>

      <input
        type="text"
        placeholder="Search Name or LRN"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
      >
        <option value="">Status</option>
        <option value="Passed">Passed</option>
        <option value="Summer">Summer</option>
        <option value="Retained">Retained</option>
      </select>

      <Button
        onClick={() => {
          setSearchQuery("");
          setFilterStatus("");
        }}
        variant="confirmButton"
        className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
      >
        Clear Filter
      </Button>
    </section>

<div className=" overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
  <table className="w-full text-xs sm:text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white ">
            <th className="px-4 py-2">LRN</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Grades</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
        {currentStudents.length === 0 ? (
            <tr>
            <td colSpan={4} className="p-4 text-black">
              No students found.
            </td>
          </tr>
        ) : (
          currentStudents.map((student, idx) => (
            <Grade 
              key={student.lrn} 
              grade={student} 
              status={statuses.find(s => s.student_id === student.id)?.status ?? "N/A"}
              className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
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
        className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  "
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
        className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  "
          >
            Next
          </Button>
        </div>
    </div>
    );
  };

  export default Applicants;
