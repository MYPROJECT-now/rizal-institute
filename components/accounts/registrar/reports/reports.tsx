"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getAdmittedStudents, getAmountPaid } from "@/src/actions/registrarAction";
import { useReportModal } from "@/src/store/REGISTRAR/reports";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type AdmittedProps = {
    lrn: string ;
    lastName: string;
    firstName: string;
    middleName: string |null;
    suffix: string | null;
    gradeLevelName: string | null;
}

type AmountPaidProps = {
    lastName: string;
    firstName: string;
    middleName: string |null;
    suffix: string | null;
    totalDue: number;
    totalPaid: number;
}
export const Reports = () => {
    const { isOpen, close } = useReportModal();
    const [admitted, SetAdmitted] = useState<AdmittedProps[]>([]);
    const [amountPaid, SetAmountPaid] = useState<AmountPaidProps[]>([]);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        const fetchAdmitted = async () => {
            const result = await getAdmittedStudents();
            SetAdmitted(result ?? []);
            setLoading1(false);
        }
        fetchAdmitted();
    } , []);
    
    
    useEffect(() => {
        const fetchAdmitted = async () => {
            const result = await getAmountPaid();
            SetAmountPaid(result ?? []);
            setLoading2(false);
        }
        fetchAdmitted();
    } , []);


    const handleDownloadAdmitted = () => {
    const data = admitted.map((admittedStudents: AdmittedProps) => ({
        LRN: admittedStudents.lrn,
        FullName:
        admittedStudents.lastName +
        ", " +
        admittedStudents.firstName +
        (admittedStudents.middleName ? " " + admittedStudents.middleName : "") +
        (admittedStudents.suffix ? " " + admittedStudents.suffix : ""),
        GradeLevel: admittedStudents.gradeLevelName,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // ✅ Auto column width (so columns fit content)
    ws["!cols"] = Object.keys(data[0]).map((key) => ({ wch: key.length + 15 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    XLSX.writeFile(wb, "students.xlsx");
    };



    const handleDownloadReceivables = () => {
        const data = amountPaid.map((receivables: AmountPaidProps) => ({
            FullName:
            receivables.lastName +
            ", " +
            receivables.firstName +
            (receivables.middleName ? " " + receivables.middleName : "") +
            (receivables.suffix ? " " + receivables.suffix : ""),
            TotalDue: Number(receivables.totalDue),
            TotalPaid: Number(receivables.totalPaid),
            Receivables: Number(receivables.totalDue) - Number(receivables.totalPaid),
        }));

        // ✅ Compute totals
        const totalDue = data.reduce((sum, r) => sum + r.TotalDue, 0);
        const totalPaid = data.reduce((sum, r) => sum + r.TotalPaid, 0);
        const totalReceivables = data.reduce((sum, r) => sum + r.Receivables, 0);

        // ✅ Append total row
        data.push({
            FullName: "TOTAL",
            TotalDue: totalDue,
            TotalPaid: totalPaid,
            Receivables: totalReceivables,
        });

        // data.push({
        //     FullName: "2023-2024",
        //     TotalDue: totalDue ? String(totalDue) : "",
        //     TotalPaid: null,
        //     Receivables: null,
        // });

        // Convert JSON -> worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // ✅ Auto column width
        ws["!cols"] = Object.keys(data[0]).map((key) => ({ wch: key.length + 15 }));

        // Create workbook and add worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Receivables");

        // Trigger download
        XLSX.writeFile(wb, "Receivables.xlsx");
        };


    return (
        <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="w-[290px] sm:w-[450px] lg:w-[600px]  bg-white rounded-lg shadow-lg">
            <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-white bg-dGreen py-3 rounded-t-lg  flex items-center justify-center">
                    Generate Report
                </DialogTitle>
                <div className="flex flex-col px-auto mx-auto gap-5 py-10 w-[240px]">
                    {loading1 && loading2 ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="text-dGreen animate-spin" />
                        </div>
                    ) : (
                    <>
                    <Button
                        onClick={handleDownloadAdmitted}
                        variant="confirmButton"
                        className="py-2 rounded-lg"
                          disabled={admitted.length === 0}

                    >
                        Download Admitted Students
                    </Button>

                    <Button
                        onClick={handleDownloadReceivables}
                        variant="confirmButton"
                        className="py-2 rounded-lg"
                          disabled={amountPaid.length === 0}

                    >
                        Download Receivables
                    </Button>
                    </>
                    )}
                </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>
  )
}   