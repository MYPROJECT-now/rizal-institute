
"use client";
import { FC, useState } from "react";
import Student from "./reservedTodo";
import { TableReserved_Type } from "@/src/type/REGISTRAR/reserved";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  reserved: TableReserved_Type[];
}

const Reserved: FC<Props> = ({ reserved }) => {
  const [reservedList, setApplicantList] = useState<TableReserved_Type[]>(reserved);
  const [filterName, setFilterName] = useState("");
  const [filterLRN, setFilterLRN] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const filteredStudents = reservedList.filter((student) => {
    const fullName = `${student.firstName} ${student.middleName ?? ""} ${student.lastName}`.toLowerCase();
    const matchesName = fullName.includes(filterName.toLowerCase());
    const matchesLRN = student.lrn.includes(filterLRN);
    const matchesGrade = filterGrade === "" || student.gradeLevel === filterGrade;
  return matchesName && matchesLRN && matchesGrade;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));

  const handleAccept = async (id: number, lastName: string, firstName: string, middleName: string) => {
    setLoadingId(id);
    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicantId: id, name: `${lastName} ${firstName} ${middleName}` }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setApplicantList((prev) =>
          prev.map((student) =>
            student.id === id ? { ...student, admissionStatus: data.admissionStatus } : student
          )
        );
      } else {
        toast.error(data.message || "Failed to send email.");
      }
    } catch {
      toast.error("Something went wrong while accepting reservation payment.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
  <div className=" flex-1 lg:min-h-0 text-xs sm:text-sm  sm:px-8 px-3 sm:py-6 py-4 sm:pt-6 text-center">
    <section className="flex  flex-col sm:flex-row  items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-4">
      <label className="text-green-900 font-bold text-sm  sm:text-lg">Filter By:</label>
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
        </select>
        <Button
          onClick={() => {
            setFilterName("");
            setFilterLRN("");
            setFilterGrade("");
          }}
          variant="confirmButton"
          className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
        >
          Clear Filter
        </Button>
      </section>

      {/* Table */}
<div className=" overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
  <table className="w-full text-xs sm:text-sm text-center">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-2">LRN</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Grade Level</th>
              <th className="px-4 py-2">Confirmation Status</th>
              <th className="px-4 py-2">Admission Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-black">
                  No students found.
                </td>
              </tr>
            ) : (
              currentStudents.map((student, idx) => (
                <Student
                  key={student.lrn}
                  reserved={student}
                  onAdmit={handleAccept}
                  className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
                  loading={loadingId === student.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 gap-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant={"prevButton"}
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
          variant={"prevButton"}
        className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  "
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Reserved;
