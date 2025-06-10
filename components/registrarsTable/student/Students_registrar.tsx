"use client";

import { useRegStudentsModal } from "@/src/store/registrar/students";
import { Button } from "../../ui/button";
import { Reg_Students } from "../enrollees/modal/students";
import { Reg_AddStudent } from "./modal/addStudent";
import { useRegAddStudentModal } from "@/src/store/registrar/add_student";

export const StudentsTable = () => {
    const students = [
        {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
        // Duplicate entries for demonstration
        {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
        {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
         {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
         {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
         {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
      ];

      const { open } = useRegStudentsModal();
      const { open: openAddStudent } = useRegAddStudentModal();

    return (
        <div className="w-full max-h-full flex flex-wrap sm:text-sm md:text-base lg:text-lg">
            <div className="flex flex-row items-center ml-10 gap-5">
                <p className="font-bold text-dGreen font-merriweather">
                    Filter By:
                </p>
                <div className="grid sm:grid-cols-1 grid-row-3 md:grid-col-2 grid-row-2 lg:grid-cols-1 grid-row-3 gap-5 p-5">
                <input 
                    type="text"
                    placeholder="Name"
                    className="border border-gray-600 p-2 rounded w-full " 
                />
                <input 
                    type="text"
                    placeholder="LRN"
                    className="border border-gray-600 p-2 rounded w-full  " 
                />
                
                <select name="Grade Level"  className="border border-gray-600 p-2 rounded">
                    <option value=""> Grade 7</option>
                    <option value=""> Grade 8</option>
                    <option value=""> Grade 9</option>
                    <option value=""> Grade 10</option>
                </select>
                </div>
                
                <div className="flex flex-wrap gap-3">
                <Button
                    variant="mButton"
                    className=" text-white px-2 py-2 rounded-lg "
                >
                    Clear Filter
                </Button>
                
                <Reg_AddStudent />
                <Button
                    onClick={() => openAddStudent()}
                    variant="mButton"
                    className=" text-white px-2 py-2 rounded-lg "
                >
                    Add Student
                </Button>
                </div>
                
            </div>

            <div className="min-w-full overflow-y-auto ">
                <Reg_Students />
                <div className="h-[350px] overflow-y-auto">
                <table className="min-w-full border-collapse border border-green-600 text-center table-fixed overflow-auto">
                    <thead className="sticky top-0 z-10">
                    <tr className="bg-green-600 text-white">
                        <th className="border border-green-600 p-2">LRN</th>
                        <th className="border border-green-600 p-2">Full Name</th>
                        <th className="border border-green-600 p-2">Grade Level</th>
                        <th className="border border-green-600 p-2">Full Details</th>
                        <th className="border border-green-600 p-2">Actions</th>
                        <th className="border border-green-600 p-2">Advancement</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student, index) => (
                        <tr key={index} className="border border-green-600">
                        <td className="border border-green-600 p-2">{student.lrn}</td>
                        <td className="border border-green-600 p-2">{student.fullName}</td>
                        <td className="border border-green-600 p-2">{student.gradeLevel}</td>
                        <td className="border border-green-600 p-2">
                            <button 
                                className="bg-green-500 text-white px-4 py-1 rounded"
                                onClick={open}
                            >
                                View
                            </button>
                        </td>
                        <td className="border border-green-600 p-3">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded mt-2 ml-2">Delete</button>
                        </td>
                        <td className="border border-green-600 p-2">{student.advancement}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};