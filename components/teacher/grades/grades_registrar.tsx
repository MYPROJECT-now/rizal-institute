"use client";

import { useRegGradesModal } from "@/src/store/registrar/grades";
import { Button } from "../../ui/button";
import { Reg_Grades } from "./modal/grades";

export const GradeTable = () => {
    const students = [
        {
            lrn: "123546547958",
            fullName: "Tamad, Juan A.",
            gradeLevel: "Grade 7",
            status: "Fail",
        },
        {
            lrn: "123546547958",
            fullName: "Tamad, Juan A.",
            gradeLevel: "Grade 7",
            status: "Passed",
        },
        {
            lrn: "123546547958",
            fullName: "Tamad, Juan A.",
            gradeLevel: "Grade 7",
            status: "Passed",
        },
    ];

    const { open } = useRegGradesModal();

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
                <select name="Grade Level" className="border border-gray-600 p-2 rounded w-[200px]">
                    <option value="">Grade 7</option>
                    <option value="">Grade 8</option>
                    <option value="">Grade 9</option>
                    <option value="">Grade 10</option>
                </select>
                <Button
                    variant="mButton"
                    className="text-white px-7 py-4 rounded-lg"
                >
                    Clear Filter
                </Button>

                <Button
                    variant="mButton"
                    className="text-white px-7 py-4 rounded-lg"
                >
                    ADD GRADE
                </Button>
            </div>

            <div className="mx-10">
                <table className="w-full border-collapse border border-green-600 text-center">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="border border-green-600 p-2">LRN</th>
                            <th className="border border-green-600 p-2">Name</th>
                            <th className="border border-green-600 p-2">Grade</th>
                            <th className="border border-green-600 p-2">View Grades</th>
                            <th className="border border-green-600 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="border border-green-600">
                                <td className="border border-green-600 p-2">{student.lrn}</td>
                                <td className="border border-green-600 p-2">{student.fullName}</td>
                                <td className="border border-green-600 p-2">{student.gradeLevel}</td>
                                <td className="border border-green-600 p-2">
                                    <Reg_Grades />
                                    <button 
                                    className="bg-green-500 text-white px-4 py-1 rounded"
                                    onClick={open}
                                    >
                                        View
                                    </button>
                                </td>
                                <td className="border border-green-600 p-2">{student.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
