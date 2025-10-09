// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import { Button } from "@/components/ui/button";
// import { getInfoForDashboard, StudentInfo } from "@/src/actions/studentAction";
// import { Loader2 } from "lucide-react";
// import Student_header from "@/app/header/header_student";
// import EnrollmentCert from "@/components/accounts/students/enrollment certificate/enrollment_cert";

// const CertificatePage = () => {
//   const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getInfoForDashboard();
//       setStudentInfo(res);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const fullName = useMemo(
//     () =>
//       [
//         studentInfo?.studentFirstName,
//         studentInfo?.studentMiddleName,
//         studentInfo?.studentLastName,
//         studentInfo?.studentSuffix,
//       ]
//         .filter(Boolean)
//         .join(" "),
//     [studentInfo]
//   );

//   // ✅ Memoize the PDF Document so it doesn’t re-render unnecessarily
//   const pdfDocument = useMemo(() => {
//     if (!studentInfo) return null;
//     return <EnrollmentCert studentInfo={studentInfo} />;
//   }, [studentInfo]);

//   return (
//     <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10 bg-page">
//       <Student_header />
//       <div className="w-full h-full bg-white self-center mt-2 rounded-lg">
//         <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
//           {loading ? (
//             <div>
//               <Loader2 className="animate-spin text-dGreen" />
//             </div>
//           ) : (
//             <>
//               {pdfDocument && (
//                 <PDFViewer className="w-[100%] h-full">{pdfDocument}</PDFViewer>
//               )}
//             </>
//           )}

//           <div className="flex justify-center">
//             {pdfDocument ? (
//               <PDFDownloadLink
//                 fileName={`Certificate_of_Enrollment_${fullName}`}
//                 document={pdfDocument}
//               >
//                 {({ loading }) => (
//                   <Button
//                     disabled={loading}
//                     className="disabled:opacity-50 disabled:cursor-not-allowed bg-dGreen hover:bg-lGreen mt-1 text-center"
//                   >
//                     {loading ? "Preparing PDF..." : "Download PDF"}
//                   </Button>
//                 )}
//               </PDFDownloadLink>
//             ) : (
//               <Button
//                 disabled
//                 className="disabled:opacity-50 disabled:cursor-not-allowed bg-dGreen  text-center"
//               >
//                 Download PDF
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificatePage;
