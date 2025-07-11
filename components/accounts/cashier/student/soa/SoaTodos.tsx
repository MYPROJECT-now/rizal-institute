"use client";
import { FC, useState, useEffect } from "react";
import { SOAsStudent } from "@/src/type/CASHIER/STUDENT/student";
import SoaTodo from "./SoaTodo";

interface Props {
  SOATodos: SOAsStudent[];
  
}   

// Add a type for the calculated row
interface SOAWithBalance extends SOAsStudent {
  currentBalance: number;
  effectiveDue: number;
}

const SoaTodos: FC<Props> = ({ SOATodos }) => {

    // State to manage the list of todo items
    const [SOATodoItems] = useState<SOAsStudent[]>(SOATodos);

    // Calculate balances
    const calculatedRows: SOAWithBalance[] = [];
    let prevEffectiveDue = 0;
    for (const soa of SOATodos) {
        const monthlyDue = soa.monthlyDue || 0;
        const amountPaid = soa.amountPaid || 0;
        const currentBalance = monthlyDue - amountPaid;
        const effectiveDue = prevEffectiveDue + currentBalance;
        calculatedRows.push({ ...soa, currentBalance, effectiveDue });
        prevEffectiveDue = effectiveDue;
    }

    // Function to calculate total amount due for current month
    const calculateTotalAmountDue = () => {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
        const currentMonthIndex = calculatedRows.findIndex(row => 
            (row.month ?? '').toLowerCase().includes(currentMonth)
        );
        
        if (currentMonthIndex === -1) return 0;
        
        const totalMonthlyDue = calculatedRows
            .slice(0, currentMonthIndex + 1)
            .reduce((sum, row) => sum + (row.monthlyDue || 0), 0);
        
        const totalAmountPaid = calculatedRows
            .slice(0, currentMonthIndex + 1)
            .reduce((sum, row) => sum + (row.amountPaid || 0), 0);
        
        return totalMonthlyDue - totalAmountPaid;
    };

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
                    <table className="w-full border-collapse border border-gray-300 text-[11px]">
                        <thead>
                            
                            <tr className="bg-gray-100">
                                <th className="border border-r border-gray-300 p-1">*Month</th>
                                <th className="border border-gray-300 p-1">Monthly Due</th>
                                <th className="border border-gray-300 p-1">Amount Paid</th>
                                <th className="border border-gray-300 p-1">Date of Payment</th>
                                <th className="border border-gray-300 p-1">SI #</th>
                                <th className="border border-gray-300 p-1">Remarks</th>
                                <th className="border border-gray-300 p-1">Unpaid Due</th>
                                <th className="border border-gray-300 p-1">Total Bal. to Date</th>
                            </tr>
                          
                            <tr >
                                <th className="bg-gray-100 border border-gray-300 p-1"colSpan={2}>Downpayment Upon Enrollment</th>
                                <th className="border border-gray-300 p-1">{SOATodos[0]?.amount || 0}</th>
                                <th className="border border-gray-300 p-1">{String(SOATodos[0]?.downPaymentDate || "")}</th>
                                <th className="border border-gray-300 p-1">{SOATodos[0]?.SINumberDP || ""}</th>
                                <th className="border border-gray-300 p-1">{SOATodos[0]?.remarksDP || ""}</th>
                                <th colSpan={2}/>
                            </tr>
                            <tr>
                                <th className="bg-gray-100 border border-gray-300 p-1 pl-2 text-start" colSpan={8}>Payment Schedule</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                        {calculatedRows.map((SOAtodo) => (
                            <SoaTodo
                                key={SOAtodo.month_id}
                                SOAtodo={SOAtodo}
                                currentBalance={SOAtodo.currentBalance}
                                effectiveDue={SOAtodo.effectiveDue}
                            />
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="mt-3">
                    <div className="bg-gray-50 p-2 rounded text-xs">
                        <p><strong>Remaining Balance:</strong> {calculatedRows[calculatedRows.length - 1].effectiveDue}</p>
                        <p><strong>Total Amount Due:</strong> ₱{calculateTotalAmountDue()}</p>
                    </div>
                </section>
            </div>

        </main>
    )
}

export default SoaTodos;