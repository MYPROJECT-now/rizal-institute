"use client";

import { useShowGradesModal } from "@/src/store/REGISTRAR/grades";
import { Button } from "../../../ui/button";
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
        {
            lrn: "123546547958",
            fullName: "Tamad, Juan A.",
            gradeLevel: "Grade 7",
            status: "Passed",
        },
        
    ];

    const { open } = useShowGradesModal();

    return (
         <div className="w-full max-h-full flex flex-wrap sm:text-sm md:text-base lg:text-lg"> 
            {/*Filter Section */}
                <div className="flex flex-wrap items-center ml-10 gap-5">
          
                <p className="font-bold text-dGreen font-merriweather">
                    Filter By:
                </p>
                <div className="grid sm:grid-cols-1 grid-row-3 md:grid-col-2 grid-row-2 lg:grid-cols-1 grid-row-3 gap-5 p-5">
                <input
                    type="text"
                    placeholder="Name"
                    className="border border-gray-600 p-2 rounded w-full sm:w-40 md:w-40 lg:w-40 xl:w-50 2xl:w-60"
                />
                <input
                    type="text"
                    placeholder="LRN"
                    className="border border-gray-600 p-2 rounded w-full sm:w-40 md:w-40 lg:w-40 xl:w-50 2xl:w-60"
                />
                <select className="border border-gray-600 p-2 rounded w-auto sm:w-40 md:w-40 lg:w-40 xl:w-50 2xl:w-60">
                    <option value="">Grade 7</option>
                    <option value="">Grade 8</option>
                    <option value="">Grade 9</option>
                    <option value="">Grade 10</option>
                </select>
                </div>
                <div className="flex flex-wrap gap-3 mb-5">
                <Button
                    variant="mButton"
                    className="text-white px-2 py-2 rounded-lg"
                >
                    CLEAR FILTER   
                </Button>

                <Button
                    variant="mButton"
                    className="text-white px-2 py-2 rounded-lg"
                >
                    ADD GRADE
                </Button>
                </div>
            </div>

            <div className="min-w-full overflow-x-auto sm:text-sm md:text-base lg:text-lg">
                <div className="h-[330px] overflow-y-auto">
                <table className="min-w-full border-collapse border border-green-600 text-center table-fixed overflow-auto">
                    <thead className="sticky top-0 z-10">
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
        </div>
    );
};
