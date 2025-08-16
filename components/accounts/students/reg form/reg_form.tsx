// import { Button } from "@/components/ui/button";
// import { getRecord } from "@/src/actions/studentAction";

// export const Registration_Form = async () => {
//   const record = await getRecord();

//   if (!record) return null;
//   return (
//   <div className="p-10 text-center">
//     <h2 className="text-2xl font-bold text-green-700 mb-2">RIZAL INSTITUTE</h2>
//     <p className="text-sm text-gray-500 mb-6">Official Registration Confirmation</p>

//     <div className="text-left space-y-2 text-gray-800">
//       <p><strong>Student Name:</strong> {record.studentLastName}, {record.studentFirstName} {record.studentMiddleName} {record.studentSuffix}</p>
//       <p><strong>Grade Level:</strong> {record.gradeLevelName}</p>
//       <p><strong>LRN:</strong> {record.lrn}</p>
//       <p><strong>School Year:</strong> {record.ay}</p>
//       <p><strong>Date Admitted:</strong> {record.da ? new Date(record.da).toDateString().slice(4) : 'N/A'}</p>
//     </div>

//     <div className="mt-[70px]">
//       <p>This is to certify that the above-named student is officially enrolled at</p>
//       <p className="font-semibold">Rizal Institute - Junior High School Department</p>
//     </div>

//     <div className="mt-10 justify-between px-10 text-sm text-gray-600 sm:grid grid-cols-1 grid-row-2 md:grid-cols-2">
//       <div className="text-center">
//         _______________________<br />
//         Student Signature
//       </div>
//       <div className="text-center">
//         _______________________<br />
//         Registrar
//       </div>
//     </div>

//     <Button
//       className="px-5 py-1 rounded-lg"
//       variant="confirmButton"
//     >
//       Print Registration Form
//     </Button>
//   </div>

//     );
// };


"use client";

import { Button } from "@/components/ui/button";
import { getRecord } from "@/src/actions/studentAction";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";

interface StudentRecord {
  studentLastName: string;
  studentFirstName: string;
  studentMiddleName?: string | null;
  studentSuffix?: string | null;
  gradeLevelName?: string | null;
  lrn: string;
  ay: string | null;
  da: string | null;
}


export const Registration_Form = () => {
  const [record, setRecord] = useState<StudentRecord | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getRecord();
      setRecord(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    if (!formRef.current) return;
    const options = {
      margin: 10,
      filename: "registration_form.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "letter", orientation: "landscape" },
    };
    html2pdf().set(options).from(formRef.current).save();
  };


  if (loading) {
    return (
      <div className=" h-[600px] w-full flex items-center justify-center ">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!record) return <p className="text-center text-red-500">No record found.</p>;

  return (
    <div className="p-10 text-center" ref={formRef}>
      
      <h2 className="text-2xl font-bold text-green-700 mb-2">RIZAL INSTITUTE</h2>
      <p className="text-sm text-gray-500 mb-6">Official Registration Confirmation</p>

      <div className="text-left space-y-2 text-gray-800">
        <p><strong>Student Name:</strong> {record.studentLastName}, {record.studentFirstName} {record.studentMiddleName} {record.studentSuffix}</p>
        <p><strong>Grade Level:</strong> {record.gradeLevelName}</p>
        <p><strong>LRN:</strong> {record.lrn}</p>
        <p><strong>School Year:</strong> {record.ay}</p>
        <p><strong>Date Admitted:</strong> {record.da ? new Date(record.da).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : 'N/A'}</p>
      </div>

      <div className="mt-[50px]">
        <p>This is to certify that the above-named student is officially enrolled at</p>
        <p className="font-semibold">Rizal Institute - Canlubang</p>
      </div>

      <div className="mt-10 justify-between px-10 text-sm text-gray-600 sm:grid grid-cols-1 grid-row-2 md:grid-cols-2">
        <div className="text-center">
          _______________________<br />
          Student Signature
        </div>
        <div className="text-center">
          _______________________<br />
          Registrar
        </div>
      </div>

      <div className="my-6 flex gap-4 justify-center">
        <Button
          onClick={handleDownloadPDF}
          className="px-5 py-1 rounded-lg"
          variant="confirmButton"
        >
          Download as PDF
        </Button>
      </div>
    </div>
  );
};
