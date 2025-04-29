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
      ];

      const { open } = useRegStudentsModal();
      const { open: openAddStudent } = useRegAddStudentModal();

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center my-5 ml-10 gap-5">
                <p className="font-bold text-xl text-dGreen font-merriweather">
                    Filter By:
                </p>
                <input 
                    type="text"
                    placeholder="Name"
                    className="border border-gray-600 p-2 rounded" 
                />
                <input 
                    type="text"
                    placeholder="LRN"
                    className="border border-gray-600 p-2 rounded" 
                />
                <select name="Grade Level"  className="border border-gray-600 p-2 rounded w-[200px]">
                    <option value=""> Grade 7</option>
                    <option value=""> Grade 8</option>
                    <option value=""> Grade 9</option>
                    <option value=""> Grade 10</option>
                </select>
                <Button
                    variant="mButton"
                    className=" text-white px-7 py-4 rounded-lg"
                >
                    Clear Filter
                </Button>
                <Reg_AddStudent />
                <Button
                    onClick={() => openAddStudent()}
                    variant="mButton"
                    className=" text-white px-7 py-4 rounded-lg"
                >
                    Add Student
                </Button>
            </div>

            <div className="mx-10">
                <Reg_Students />
                <table className="w-full border-collapse border border-green-600 text-center">
                    <thead>
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
                        <td className="border border-green-600 p-2">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                        </td>
                        <td className="border border-green-600 p-2">{student.advancement}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};