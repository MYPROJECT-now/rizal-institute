"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {  getAmountPaid, getRecentGrantees, getSecAndGrade, getSF1, getSF5 } from "@/src/actions/registrarAction";
import { useReportModal } from "@/src/store/REGISTRAR/reports";
import { exportSF1 } from "@/src/utils/sf1";
import { exportSF5 } from "@/src/utils/sf5";
// import { exportSF6 } from "@/src/utils/sf6";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

// type AdmittedProps = {
//     lrn: string ;
//     lastName: string;
//     firstName: string;
//     middleName: string |null;
//     suffix: string | null;
//     gradeLevelName: string | null;
// }

type AmountPaidProps = {
    lastName: string;
    firstName: string;
    middleName: string |null;
    suffix: string | null;
    totalDue: number;
    totalPaid: number;
}

type GranteeProps = {
  fullName: string;
  studentType: string;
};

export const Reports = () => {
    const { isOpen, close } = useReportModal();
    // const [admitted, SetAdmitted] = useState<AdmittedProps[]>([]);
    const [amountPaid, SetAmountPaid] = useState<AmountPaidProps[]>([]);
    const [grantees, setGrantees] = useState<GranteeProps[]>([]);

    // const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [showSchoolFormOptions, setShowSchoolFormOptions] = useState(false);

    const [schoolForm, setSchoolForm] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [section, setSection] = useState("");
    const [secAndGrade, setSecAndGrade] = useState<{ section_id: number; gradeLevel_id: number; section: string | null; gradeLevel: string | null }[]>([]);
    const [filteredSections, setFilteredSections] = useState< { section_id: number; section: string | null }[] >([]);

    useEffect(() => {
        const load = async () => {
            const res = await getSecAndGrade();
            setSecAndGrade(res || []);
        };
        load();
    }, []);


    
    useEffect(() => {
        const fetchAdmitted = async () => {
            const result = await getAmountPaid();
            SetAmountPaid(result ?? []);
            setLoading2(false);
        }
        fetchAdmitted();
    } , []);

    useEffect(() => {
        const fetchGrantees = async () => {
        const result = await getRecentGrantees();
        setGrantees(result ?? []);
        setLoading3(false);
        };
        fetchGrantees();
    }, []);


    const handleGradeLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setGradeLevel(e.target.value);

        const filtered = secAndGrade
            .filter(item => item.gradeLevel_id === selectedId)
            .map(item => ({
            section_id: item.section_id,
            section: item.section,
            }));

        setFilteredSections(filtered);
        setSection(""); // reset section
    };


    // const handleDownloadAdmitted = () => {
    // const data = admitted.map((admittedStudents: AdmittedProps) => ({
    //     LRN: admittedStudents.lrn,
    //     FullName:
    //     admittedStudents.lastName +
    //     ", " +
    //     admittedStudents.firstName +
    //     (admittedStudents.middleName ? " " + admittedStudents.middleName : "") +
    //     (admittedStudents.suffix ? " " + admittedStudents.suffix : ""),
    //     GradeLevel: admittedStudents.gradeLevelName,
    // }));

    // const ws = XLSX.utils.json_to_sheet(data);

    // // ✅ Auto column width (so columns fit content)
    // ws["!cols"] = Object.keys(data[0]).map((key) => ({ wch: key.length + 15 }));

    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Students");

    // XLSX.writeFile(wb, "students.xlsx");
    // };



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

  const handleDownloadGrantees = () => {
    const data = grantees.map((g) => ({
      FullName: g.fullName,
      Type: g.studentType,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = Object.keys(data[0]).map((key) => ({ wch: key.length + 15 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Grantees");

    XLSX.writeFile(wb, "Recent_Grantees.xlsx");
  };

  const handleDownload = async () => {
      if(schoolForm === "School_Form_1"){
        const sf1Data = await getSF1(Number(gradeLevel), Number(section));
        exportSF1(sf1Data);
      }else if(schoolForm === "School_Form_5"){
        const sf5Data = await getSF5(Number(gradeLevel), Number(section));
        exportSF5(sf5Data);
      }else if(schoolForm === "School_Form_6"){
        handleDownloadGrantees();
      }
  } 

//   const handleTry = async () => {
//               const sf5Data = await getSF5(Number(gradeLevel), Number(section));
//         exportSF5(sf5Data);
//   }

    const handleClose = () => {
        close();
        setShowSchoolFormOptions(false)
        setSchoolForm("");
        setGradeLevel("");
        setSection("");
    }
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[290px] sm:w-[450px] lg:w-[600px]  bg-white rounded-lg shadow-lg">
            <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-white bg-dGreen py-3 rounded-t-lg  flex items-center justify-center">
                    Reports and Summaries
                </DialogTitle>
                <>
                    {loading2 && loading3 ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="text-dGreen animate-spin" />
                        </div>
                    ) : (
                    
                    <div className="flex flex-col gap-10 px-5 py-3">
                        {!showSchoolFormOptions && (
                        <div className="grid grid-cols-2 gap-6 ">

                            <section className="shadow-md border-2 border-gray-100 rounded-lg p-3 flex flex-col gap-3">
                                <p className="text-sm text-dGreen font-bold border-l-4 border-dGreen pl-2 rounded-lg">
                                    School Forms
                                </p>
                                <p className="text-xs px-5">
                                    Download school forms
                                </p>
                                <button
                                    onClick={() => setShowSchoolFormOptions(true)}
                                    className="text-sm bg-transparent text-dGreen font-semibold self-end underline hover:text-green-600"
                                >
                                    Download
                                </button>
                            </section>

                            <section className="shadow-md border-2 border-gray-100 rounded-lg p-3 flex flex-col gap-3">
                                <p className="text-sm text-dGreen font-bold border-l-4 border-dGreen pl-2 rounded-lg ">Ammount Receivables</p>
                                <p className="text-xs   px-5">Download ammount receivables this month</p>
                                <button
                                    onClick={handleDownloadReceivables}
                                    className="text-sm bg-transparent text-dGreen font-semibold self-end underline  hover:text-green-600"
                                    disabled={amountPaid.length === 0}

                                >
                                    Download
                                </button>
                            </section>


                            <section className="shadow-md border-2 border-gray-100 rounded-lg p-3 flex flex-col gap-3">
                                <p className="text-sm text-dGreen font-bold border-l-4 border-dGreen pl-2 rounded-lg">
                                    New Grantees
                                </p>
                                <p className="text-xs px-5">
                                    Download list of new ESC grantees this year
                                </p>
                                <button
                                    onClick={handleDownloadGrantees}
                                    className="text-sm bg-transparent text-dGreen font-semibold self-end underline hover:text-green-600"
                                    disabled={grantees.length === 0}
                                >
                                    Download
                                </button>
                            </section>

                            <section className="shadow-md border-2 border-gray-100 rounded-lg p-3 flex flex-col gap-3">
                                <p className="text-sm text-dGreen font-bold border-l-4 border-dGreen pl-2 rounded-lg">
                                    sf6
                                </p>
                                <p className="text-xs px-5">
                                    sf6
                                </p>
                                <button
                                    // onClick={exportSF6}
                                    className="text-sm bg-transparent text-dGreen font-semibold self-end underline hover:text-green-600"
                                >
                                    Download
                                </button>
                            </section>

                        </div>
                        )}

                        {showSchoolFormOptions && (
                            <div className="w-full flex flex-col gap-5 items-center  shadow-md border-2 border-gray-100 rounded-lg p-3">
                                <div className="flex w-full items-start">
                                <button
                                    onClick={() => setShowSchoolFormOptions(false)}
                                    className="text-sm bg-transparent text-dGreen font-semibold self-end underline hover:text-green-600"
                                >
                                    Back
                                </button>
                                </div>
                                {/* School Form */}
                                <div className="flex flex-col w-full px-[100px]">
                                    <label className="text-green-900 font-bold text-sm ">School Form:</label>
                                    <select 
                                        value={schoolForm}
                                        onChange={(e) => setSchoolForm(e.target.value)}
                                        className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition">
                                        <option value="">School Form</option>
                                        <option value="School_Form_1">School Form 1</option>
                                        <option value="School_Form_5">School Form 5</option>
                                        <option value="School_Form_6">School Form 6</option>
                                    </select>
                                </div>

                                {/* Grade Level */}
                                <div className="flex flex-col gap-2 w-full px-[100px]">
                                    <label className="text-green-900 font-bold text-sm">Grade Level:</label>
                                    <select
                                    disabled={!schoolForm}
                                    value={gradeLevel}
                                    onChange={handleGradeLevelChange}
                                    className="border-2 border-gray-300 rounded px-3 py-1 w-full"
                                    >
                                        <option value="">Grade Level</option>
                                        {secAndGrade
                                        .reduce((acc, item) => {
                                            if (!acc.some(g => g.gradeLevel_id === item.gradeLevel_id)) {
                                                acc.push({
                                                gradeLevel_id: item.gradeLevel_id,
                                                gradeLevel: item.gradeLevel ?? "",
                                                });
                                            }
                                            return acc;
                                        }, [] as { gradeLevel_id: number; gradeLevel: string }[])
                                        .map(g => (
                                            <option key={g.gradeLevel_id} value={g.gradeLevel_id}>
                                            {g.gradeLevel}
                                            </option>
                                        ))
                                        }


                                    </select>

                                </div>

                                {/* Section */}
                                <div className="flex flex-col gap-2 w-full px-[100px]">
                                    <label className="text-green-900 font-bold text-sm">Section:</label>
                                    <select
                                    disabled={!gradeLevel}
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    className="border-2 border-gray-300 rounded px-3 py-1 w-full"
                                    >
                                    <option value="">Section</option>

                                    {filteredSections.map(s => (
                                        <option key={s.section_id} value={s.section_id}>
                                        {s.section}
                                        </option>
                                    ))}
                                    </select>

                                </div>

                                <Button
                                    variant={"confirmButton"}
                                    onClick={handleDownload}
                                    className="px-4 py-2 rounded-lg mb-5"
                                    disabled={!gradeLevel || !section || !schoolForm}
                                >
                                    Download
                                </Button>
                            </div>
                        )}

                    </div>
                    )}
                </>
            </DialogHeader>
        </DialogContent>
        </Dialog>
  )
}   