"use client";

import { Button } from "../../ui/button";
import { Reg_Grades } from "./modal/grades";
import { useShowGradesModal } from "@/src/store/REGISTRAR/grades";

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

    const { open } = useShowGradesModal();

    return (
<<<<<<< HEAD:components/registrarsTable/grades/grades_registrar.tsx
        <div className="w-full max-h-full flex flex-wrap sm:text-sm md:text-base lg:text-lg">
            <div className="flex flex-wrap items-center ml-10 gap-5">
                <p className="font-bold text-dGreen font-merriweather">
=======
        <div className="flex flex-col">
            <div className="flex flex-row items-center my-5 ml-10 gap-5">
                <p className="font-bold text-xl text-dGreen font-merriweather">
>>>>>>> 69fa2d4498f24bef8e4bb818cf37c25028ffe2c1:components/registrar/grades/grades_registrar.tsx
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
            </div>

<<<<<<< HEAD:components/registrarsTable/grades/grades_registrar.tsx
            <div className="h-[350px] lg:h-[300px] w-full overflow-y-auto mt-5">
                <table className="min-w-full border-collapse border border-green-600 text-center table-fixed overflow-auto">
                    <thead className="sticky top-0 z-10">
=======
            <div className="mx-10">
                <table className="w-full border-collapse border border-green-600 text-center">
                    <thead>
>>>>>>> 69fa2d4498f24bef8e4bb818cf37c25028ffe2c1:components/registrar/grades/grades_registrar.tsx
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
