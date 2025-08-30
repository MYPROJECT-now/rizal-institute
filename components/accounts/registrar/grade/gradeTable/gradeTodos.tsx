  "use client";
  import { FC, useState } from "react";
  import { Grade_Type, } from "@/src/type/REGISTRAR/applicant";
  import { Button } from "@/components/ui/button";
import Grade from "./gradeTodo";



  interface Props {
    grade: Grade_Type[];
    
  }

  const Applicants: FC<Props> = ({ grade }) => {
    const [applicantList,] = useState<Grade_Type []>(grade);
    const [filterName, setFilterName] = useState("");
    const [filterLRN, setFilterLRN] = useState("");



    // 🔢 Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;



  const filteredStudents = applicantList.filter((student) => {
    const fullName = `${student.studentFirstName} ${student.studentMiddleName ?? ""} ${student.studentLastName}`.toLowerCase();
    const matchesName = fullName.includes(filterName.toLowerCase());
    const matchesLRN = student.lrn.includes(filterLRN);

    return matchesName && matchesLRN ;
  });

    // 🧮 Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));


    return (
    <main className="text-xs sm:text-sm   w-full  px-8 py-6 sm:pt-6 text-center">

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



      <Button
        onClick={() => {
          setFilterName("");
          setFilterLRN("");
        }}
        variant="confirmButton"
    className=" rounded-lg text-xs sm:text-sm  xl:px-5 px-3 lg:py-5 py-4 sm:mt-0 mt-2   "
      >
        Clear Filter
      </Button>
  </div>

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
              No recent applicants found.
            </td>
          </tr>
        ) : (
          currentStudents.map((student, idx) => (
            <Grade 
              key={student.lrn} 
              grade={student} 
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
