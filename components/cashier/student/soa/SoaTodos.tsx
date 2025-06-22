"use client";
import { FC, useState, useEffect } from "react";
import { SOAsStudent } from "@/src/type/CASHIER/STUDENT/student";
import SoaTodo from "./SoaTodo";

interface Props {
  SOATodos: SOAsStudent[];
  
}   

const SoaTodos: FC<Props> = ({ SOATodos }) => {

    // State to manage the list of todo items
    const [SOATodoItems] = useState<SOAsStudent[]>(SOATodos);

    // Debug logging
    useEffect(() => {
        console.log("SoaTodos received data:", SOATodos);
        console.log("SOATodoItems:", SOATodoItems);
    }, [SOATodos, SOATodoItems]);

    // Handle empty data
    if (!SOATodos || SOATodos.length === 0) {
        return (
            <main className="p-3">
                <div className="text-center text-gray-500">
                    <p>No SOA data available for this student.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="p-3">
            <div>
                <section className="mb-3 text-sm">
                    <p><strong>Student Name:</strong> {SOATodos[0]?.studentLastName ?? ""}, {SOATodos[0]?.studentFirstName ?? ""} {SOATodos[0]?.studentMiddleName ?? ""} {SOATodos[0]?.studentSuffix ?? ""}</p>
                    <p><strong>LRN:</strong> {SOATodos[0]?.lrn}</p>
                    <p><strong>School Year:</strong> 2025 - 2026</p>
                </section>
                

                <section className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-xs">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-1">Downpayment</th>
                                <th > Upon Enrollment</th>
                                <th className="border border-gray-300 p-1">{SOATodos[0]?.amount || 0}</th>
                                <th className="border border-gray-300 p-1">-</th>
                                <th className="border border-gray-300 p-1">{SOATodos[0]?.SINumberDP || ""}</th>
                                <th className="border border-gray-300 p-1">{SOATodos[0]?.remarksDP || ""}</th>
                      
                            </tr>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-1">Month</th>
                                <th className="border border-gray-300 p-1">Monthly Due</th>
                                <th className="border border-gray-300 p-1">Amount Paid</th>
                                <th className="border border-gray-300 p-1">Date of Payment</th>
                                <th className="border border-gray-300 p-1">SI #</th>
                                <th className="border border-gray-300 p-1">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                        {SOATodoItems.map((SOAtodo) => (
                            <SoaTodo
                                key={SOAtodo.month_id}
                                SOAtodo={SOAtodo}
                            />
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="mt-3">
                    <div className="bg-gray-50 p-2 rounded text-xs">
                        <p><strong>Remaining Balance:</strong> remaining balance</p>
                        <p><strong>Total Amount Due:</strong> total amount due</p>
                    </div>
                </section>
            </div>

        </main>
    )
}

export default SoaTodos;