"use client";

import { Button } from "@/components/ui/button";

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
        },
    ];

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
            </div>

            <div className="mx-10">
                <table className="w-full border-collapse border border-green-600 text-center">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="border border-green-600 p-2">LRN</th>
                            <th className="border border-green-600 p-2">Full Name</th>
                            <th className="border border-green-600 p-2">Grade Level</th>
                            <th className="border border-green-600 p-2">Total Fees</th>
                            <th className="border border-green-600 p-2">Amount Paid</th>
                            <th className="border border-green-600 p-2">Balance</th>
                            <th className="border border-green-600 p-2">Status</th>
                            <th className="border border-green-600 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="border border-green-600">
                                <td className="border border-green-600 p-2">{student.lrn}</td>
                                <td className="border border-green-600 p-2">{student.fullName}</td>
                                <td className="border border-green-600 p-2">{student.gradeLevel}</td>
                                <td className="border border-green-600 p-2">₱{student.totalFees.toLocaleString()}</td>
                                <td className="border border-green-600 p-2">₱{student.amountPaid.toLocaleString()}</td>
                                <td className="border border-green-600 p-2">₱{student.balance.toLocaleString()}</td>
                                <td className="border border-green-600 p-2">{student.status}</td>
                                <td className="border border-green-600 p-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
