"use client";
import { FC, useState } from "react";
import Student from "./reservedTodo";
import { TableReserved_Type } from "@/src/type/REGISTRAR/reserved";

interface Props {
  reserved: TableReserved_Type [];
}

const Reserved: FC<Props> = ({ reserved }) => {
  const [reservedList] = useState<TableReserved_Type []>(reserved);
  const [filterName, setFilterName] = useState("");
  const [filterLRN, setFilterLRN] = useState("");
  const [filterGrade, setFilterGrade] = useState("");


  // 🔢 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;


  
const filteredStudents = reservedList.filter((student) => {
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
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const handleAccept = async (id: number) => {
    // await acceptStudentsApplication(id, "Enrolled");

    // Call the API to send the email if the status is Ongoing
    const response = await fetch('/api/admission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId: id }),
    });

    const data = await response.json();
    console.log(data.message);

  };


  return (
    <main className="mx-auto max-w-8xl w-full  p-8  text-center">

      <div className="flex flex-wrap items-center gap-4 mb-6">
  <label className="text-green-900 font-bold text-lg">Filter By:</label>

  <input
    type="text"
    placeholder="Name"
    value={filterName}
    onChange={(e) => setFilterName(e.target.value)}
    className="border rounded px-3 py-1"
  />

  <input
    type="text"
    placeholder="LRN"
    value={filterLRN}
    onChange={(e) => setFilterLRN(e.target.value)}
    className="border rounded px-3 py-1"
  />

  <select
    value={filterGrade}
    onChange={(e) => setFilterGrade(e.target.value)}
    className="border rounded px-3 py-1"
  >
    <option value="">All Grades</option>
    <option value="Grade 7">Grade 7</option>
    <option value="Grade 8">Grade 8</option>
    <option value="Grade 9">Grade 9</option>
    <option value="Grade 10">Grade 10</option>
    {/* Add other grades as needed */}
  </select>

  <button
    onClick={() => {
      setFilterName("");
      setFilterLRN("");
      setFilterGrade("");
    }}
    className="bg-green-700 text-white font-bold px-4 py-1 rounded hover:bg-green-800"
  >
    Clear Filter
  </button>
</div>

    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-green-600 text-white">
          <th className="px-4 py-2">LRN</th>
          <th className="px-4 py-2">Full Name</th>
          <th className="px-4 py-2">Grade Level</th>
          <th className="px-4 py-2">confirmationStatus</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
         {currentStudents.map((student) => (
          <Student 
            key={student.lrn} 
            reserved={student} 
            onAdmit={handleAccept}
          />
        ))}
      </tbody>
    </table>

    {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
  </main>
  );
};

export default Reserved;
