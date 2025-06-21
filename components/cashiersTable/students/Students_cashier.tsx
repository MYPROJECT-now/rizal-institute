"use client";

import { Button } from "@/components/ui/button";
import { useSoaModal } from "@/src/store/cashier/soa";
import { SOA } from "./modal/soa";

export const StudentsTableCashier = () => {
    const students = [
        {
            lrn: "123546547958",
            fullName: "Tamad, Juan A.",
            gradeLevel: "Grade 7",
            totalFees: 10000,
            amountPaid: 6000,
            balance: 4000,
            status: "Partial",
        },
        {
            lrn: "987654321012",
            fullName: "Masipag, Maria B.",
            gradeLevel: "Grade 8",
            totalFees: 12000,
            amountPaid: 12000,
            balance: 0,
            status: "Paid",
        },
        {
            lrn: "192837465091",
            fullName: "Magaling, Jose C.",
            gradeLevel: "Grade 9",
            totalFees: 11000,
            amountPaid: 5000,
            balance: 6000,
            status: "Partial",
        },{
            lrn: "192837465091",
            fullName: "Magaling, Jose C.",
            gradeLevel: "Grade 9",
            totalFees: 11000,
            amountPaid: 5000,
            balance: 6000,
            status: "Partial",
        },
        {
            lrn: "192837465091",
            fullName: "Magaling, Jose C.",
            gradeLevel: "Grade 9",
            totalFees: 11000,
            amountPaid: 5000,
            balance: 6000,
            status: "Partial",
        },
        {
            lrn: "192837465091",
            fullName: "Magaling, Jose C.",
            gradeLevel: "Grade 9",
            totalFees: 11000,
            amountPaid: 5000,
            balance: 6000,
            status: "Partial",
        },
    ];

    const { open } = useSoaModal();

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
                <Button
                    variant="mButton"
                    className="text-white px-2 py-2 rounded-lg "
                >
                    CLEAR FILTER   
                </Button>
                
                
            </div>
          {/* HINDI PA TO TAPOS, TABLE AYUSIN MO YAH!// OKS NA YA
            {/* Table Section */}
            
                <div className="min-w-full h-[320px] overflow-y-auto">
                <table className="min-w-full border-collapse border border-green-600 text-center overflow-auto table-fixed ">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-green-600 text-white">
                            <th className="border border-green-600 p-2">LRN</th>
                            <th className="border border-green-600 p-2">Full Name</th>
                            <th className="border border-green-600 p-2">Grade Level</th>
                            <th className="border border-green-600 p-2">Balance</th>
                            <th className="border border-green-600 p-2">SOA</th>
                            <th className="border border-green-600 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="border border-green-600">
                                <td className="border border-green-600 p-2">{student.lrn}</td>
                                <td className="border border-green-600 p-2">{student.fullName}</td>
                                <td className="border border-green-600 p-2">{student.gradeLevel}</td>
                                <td className="border border-green-600 p-2">₱{student.balance.toLocaleString()}</td>
                                <td className="border border-green-600 p-2">
                                    <SOA />
                                    <button 
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                        onClick={open}
                                        >
                                            View
                                        </button>
                                </td>
                                <td className="border border-green-600 p-2">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2">Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            
        </div>
    );
};
