"use client";
import { FC, useEffect, useState } from "react";
import { MyStudentType } from "@/src/type/TEACHER/teacher";
import { Button } from "@/components/ui/button";
import StudentTodo from "./studentTodo";
import { updateFinalGrade } from "@/src/actions/teacherAction";
import { toast } from "sonner";

interface Props {
  studentTodos: MyStudentType[];
}

const StudentTodos: FC<Props> = ({ studentTodos }) => {
    const [myStudents, setMyStudents] = useState<MyStudentType[]>([]);
    const [filterName, setFilterName] = useState("");
    const [filterLRN, setFilterLRN] = useState("");


      // ✅ This makes sure studentTodos (prop) is copied into myStudents (state)
    useEffect(() => {
      setMyStudents(studentTodos);
    }, [studentTodos]);
        // 🔢 Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    const changeTodoText = (grade_id: number, finalGrade: number) => {
        setMyStudents((prev) =>
        prev.map((studentTodos) => (studentTodos.grade_id === grade_id ? { ...studentTodos, finalGrade, remarks: finalGrade >= 75 ? "PASSED" : "FAILED" } : studentTodos))
        );
        updateFinalGrade(grade_id, finalGrade);
        toast.success("Final Grade successfully updated.");
    };


    const filteredStudents = myStudents.filter((student) => {
        const fullName = `${student.studentFirstName} ${student.studentMiddleName ?? ""} ${student.studentLastName}`.toLowerCase();
        const matchesName = fullName.includes(filterName.toLowerCase());
        const matchesLRN = student.lrn.includes(filterLRN);

        return matchesName && matchesLRN;
    });

    // 🧮 Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));




    return (
    <main className="mx-auto max-w-8xl w-full  p-8  text-center">

    <div className="flex flex-wrap items-center gap-4 mb-6">
      <label className="text-green-900 font-bold text-lg">Filter By:</label>

      <input
        type="text"
        placeholder="Name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
      />

      <input
        type="text"
        placeholder="LRN"
        value={filterLRN}
        onChange={(e) => setFilterLRN(e.target.value)}
      className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
      />



      <Button
        onClick={() => {
          setFilterName("");
          setFilterLRN("");
        }}
        variant="confirmButton"
        className="w-[100px] h-[40px] rounded-lg"
      >
        Clear Filter
      </Button>
  </div>

  <div className="overflow-x-auto shadow-lg rounded-lg border border-green-300 bg-green-50">
  <table className="w-full text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white ">
            <th className="px-4 py-2">LRN</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Final Grade</th>  
            <th className="px-4 py-2">Remarks</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentStudents.length === 0 ? (
            <tr>
            <td colSpan={5} className="p-4 text-black">
              No students yet.
            </td>
          </tr>
        ) : (
          currentStudents.map((student, idx) => (
              <StudentTodo 
                key={student.lrn} 
                myStudent={student} 
                changeTodoText={changeTodoText}
                className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
              />
          ))
        )}
        </tbody>
      </table>
    </div>

      

      {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="prevButton"
            className="w-[100px] h-[40px] rounded-lg"
          >
            Previous
          </Button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="prevButton"
            className="w-[100px] h-[40px] rounded-lg"
          >
            Next
          </Button>
        </div>
    </main>
    );
  };

  export default StudentTodos;

