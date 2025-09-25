"use client";
import { FC, useState } from "react";
import Student from "./studentTodo";
import { all_studentTable_Type } from "@/src/type/REGISTRAR/student";
import { Button } from "@/components/ui/button";
import { doDropferStudent, doTransferStudent } from "@/src/actions/registrarAction";
import { toast } from "sonner";
import { toastConfirm } from "@/components/ui/toast.confirm";
import { Students_info_Modal } from "./student_modal";

interface Props {
  students: all_studentTable_Type [];
}

const Students: FC<Props> = ({ students }) => {
  const [studentList, setStudentList] = useState<all_studentTable_Type []>(students);
  const [filterName, setFilterName] = useState("");
  const [filterLRN, setFilterLRN] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);


  // 🔢 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

    
  const filteredStudents = studentList.filter((student) => {
    const fullName = `${student.studentFirstName} ${student.studentMiddleName ?? ""} ${student.studentLastName}`.toLowerCase();
    const matchesName = fullName.includes(filterName.toLowerCase());
    const matchesLRN = student.lrn.includes(filterLRN);
    const matchesGrade = filterGrade === "" || student.gradeLevel === filterGrade;

    return matchesName && matchesLRN && matchesGrade;
    // return matchesName && matchesLRN;
  });

  // 🧮 Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));


  const transferStudent = async ( lrn: string) => {
    toastConfirm("Transfer Student?", {
    description: "This action cannot be undone.",
    onConfirm: async () => {
      try {
        setLoadingId(lrn);

        // Call backend
        await doTransferStudent(lrn);

        // Update UI immediately
        setStudentList((prev) =>
        prev.map((student) => (student.lrn === lrn ? { ...student, status : "Transferred" } : student))
      );
        toast.success(`Student ${lrn} successfully transferred.`);

      } catch (error) {
        console.error(error);
        toast.error("Failed to transfer student.");
      } finally {
        setLoadingId(null);
      }

  },

  onCancel: () => {
      toast.info("Action canceled.");
    },
    });
  };

    const dropStudent = async ( lrn: string) => {
    toastConfirm("Drop Student?", {
    description: "This action cannot be undone.",
    onConfirm: async () => {
    try {
      setLoadingId(lrn);

      // Call backend
      await doDropferStudent( lrn);

      // Update UI immediately
      setStudentList((prev) =>
        prev.map((student) => (student.lrn === lrn ? { ...student, status: "Dropped" } : student))
      );

      toast.success(`Student ${lrn} successfully drop.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to drop student.");
    } finally {
      setLoadingId(null);
    }

  },

  onCancel: () => {
      toast.info("Action canceled.");
    },
    });
  };

  return (
  <div className=" flex-1 lg:min-h-0 text-xs sm:text-sm  sm:px-8 px-3 sm:py-6 py-4 sm:pt-6 text-center">
  <Students_info_Modal />

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
        {/* Add other grades as needed */}
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

    <section className="overflow-x-auto min-w-[100px]  shadow-lg rounded-lg border border-green-300 bg-green-50">
      <table className="w-full text-xs sm:text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="px-4 py-2">LRN</th>
            <th className="px-4  py-2 min-w-[100px] sm:min-w-0">Full Name</th>
            <th className="px-4  py-2 min-w-[100px] lg:min-w-0">Grade Level</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 min-w-[100px] sm:min-w-0">Full Details</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4">
                No students found.
              </td>
            </tr>
          ) :(
          
          currentStudents.map((student) => (
              <Student 
                key={student.lrn} 
                student={student} 
                transferStudent={transferStudent}
                dropStudent={dropStudent}
                loading={loadingId === student.lrn}
              />
          ))
        )}
          </tbody>
        </table>
    </section>

    {/* Pagination Controls */}
    <section className="flex justify-center mt-4 gap-4">
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
    </section>
  </div>
  );
};

export default Students;
