// "use client";
// import { FC, useState } from "react";
// import Student from "./ApplicantTodo";
// import { Tableapplicant_Type } from "@/src/type/CASHIER/APPLICANTS/applicansts";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// // import { Cashier_ReservationReview } from "../applicants_view/Enrollees_cashier";
// // import { Receipts_Info } from "../info/info";


// interface Props {
//   applicants: Tableapplicant_Type[];
//   activeReceipt?: { id: number; isActive: boolean } | null;

// }

//   const Students: FC<Props> = ({ applicants, activeReceipt }) => {
//     const [studentList, setApplicantList] = useState<Tableapplicant_Type[]>(applicants);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filterGrade, setFilterGrade] = useState("");
//     const [filterStatus, setFilterStatus] = useState("");

//     const [loadingId, setLoadingId] = useState<number | null>(null);


//     // 🔢 Pagination State
//     const [currentPage, setCurrentPage] = useState(1);
//     const studentsPerPage = 5;



//     const handleAccept = async (id: number, lastName: string, firstName: string, middleName: string) => {
//     setLoadingId(id);
//     try {
//       const response = await fetch('/api/accept/cashier', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ studentId: id, name: lastName + " " + firstName + " " + middleName }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//                 toast.success(data.message);
//                 setApplicantList((prevList) => 
//                   prevList.map((student) => 
//                     (student.id === id 
//                       ?{...student, 
//                             reservationPaymentStatus: data.reservationPaymentStatus, 
//                             dateApprovedByCashier:data.dateApprovedByCashier} 
//                       : student)));
//               } else {
//                 toast.error(data.message || "Failed to send email.");
//               }
//             } catch (error) {
//               toast.error("Something went wrong while accepting reservation payment.");
//               console.error(error);
//             }
//           finally {
//             setLoadingId(null);
//           }
//           };


//       const handleDecline = (id: number) => {
//         setApplicantList((prevList) =>
//           prevList.map((student) =>
//             student.id === id
//               ? { ...student, applicationFormReviewStatus: "Declined" }
//               : student
//           )
//           );
//       };
      
//   const filteredStudents = studentList.filter((student) => {
//     const fullName = `${student.firstName} ${student.middleName ?? ""} ${student.lastName}`.toLowerCase();
//     const matchesSearch =
//       fullName.includes(searchQuery.toLowerCase()) ||
//       student.lrn.includes(searchQuery);
//     const matchesGrade = filterGrade === "" || student.gradeLevel === filterGrade;
//     const matchesStatus =
//       filterStatus === "" ||
//       (
//         filterStatus === "Pending" &&
//         student.reservationPaymentStatus === "Pending"
//       ) ||
//       (
//         filterStatus === "Declined" &&
//         student.reservationPaymentStatus === "Declined"
//       ) ||
//       (
//         filterStatus === "Reserved" &&
//         student.applicationFormReviewStatus === "Reserved" &&
//         student.reservationPaymentStatus === "Reserved"
//       ) ||
//       (
//         filterStatus === "Ongoing" &&
//         (
//           (student.applicationFormReviewStatus === "Reserved" &&
//           student.reservationPaymentStatus === "Pending") ||
//           (student.applicationFormReviewStatus === "Pending" &&
//           student.reservationPaymentStatus === "Reserved")
//         )
//       );
//     return matchesSearch && matchesGrade && matchesStatus;
//   });

//     // 🧮 Pagination logic
//     const indexOfLastStudent = currentPage * studentsPerPage;
//     const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//     const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
//     const totalPages = Math.max(1,Math.ceil(filteredStudents.length / studentsPerPage));


//   return (
//   <div className=" flex-1 lg:min-h-0 text-xs sm:text-sm  sm:px-8 px-3 sm:py-6 py-4 sm:pt-6 text-center">
//   {/* <Cashier_ReservationReview />
//   <Receipts_Info /> */}

//     <section className="flex  flex-col sm:flex-row  items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-4">
//       <label className="text-green-900 font-bold text-sm  sm:text-lg">Filter By:</label>

//       <input
//         type="text"
//         placeholder="Search Name or LRN"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//       />

//       <select
//         value={filterGrade}
//         onChange={(e) => setFilterGrade(e.target.value)}
//           className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//       >
//         <option value="">All Grades</option>
//         <option value="7">Grade 7</option>
//         <option value="8">Grade 8</option>
//         <option value="9">Grade 9</option>
//         <option value="10">Grade 10</option>
//         {/* Add other grades as needed */}
//       </select>

//       <select
//         value={filterStatus}
//         onChange={(e) => setFilterStatus(e.target.value)}
//         className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[125px] xl:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//       >
//         <option value="">Status</option>
//         <option value="Pending">Pending</option>
//         <option value="Ongoing">Ongoing</option>
//         <option value="Declined">Declined</option>
//         <option value="Reserved">Reserved</option>
//       </select>

//       <Button
//         onClick={() => {
//           setSearchQuery("");
//           setFilterGrade("");
//           setFilterStatus("");
//         }}
//         variant="confirmButton"
//         className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
//       >
//         Clear Filter
//       </Button>
//     </section>
      

//     <section className=" overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">

//       <table className="w-full text-xs sm:text-sm text-center">
//         <thead>
//           <tr className="bg-green-600 text-white">
//             <th className="px-4 py-2">LRN</th>
//             <th className="px-4 py-2">Full Name</th>
//             <th className="px-4 py-2">Grade Level</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2 min-w-[100px] sm:min-w-0">Full Details</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//             {currentStudents.length === 0 ? (
//               <tr>
//               <td colSpan={6} className="p-4 text-black">
//                 No applicants found.
//               </td>
//             </tr>
//           ) : (
//             currentStudents.map((applicants, idx) => (
//             <Student 
//               key={applicants.lrn} 
//               applicants={applicants} 
//               onAccept={handleAccept}
//               onDecline={handleDecline}
//               className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
//               loading={loadingId === applicants.id}
//               activeReceipt={activeReceipt} // ✅ pass it here


//             />
//           ))
//         )}
//         </tbody>
//       </table>
//     </section>

//       {/* Pagination Controls */}
//         <div className="flex justify-center items-center mt-4 gap-4">
//           <Button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             variant={"prevButton"}
//           className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm  "
//           >
//             Previous
//           </Button>
//         <span className="font-semibold flex items-center">
//             Page {currentPage} of {totalPages}
//           </span>
//           <Button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             variant={"prevButton"}
//           className="sm:px-5 px-3 sm:py-5 py-2 rounded-lg text-xs sm:text-sm  "
//           >
//             Next
//           </Button>
//         </div>

//   </div>
//   );
// };

//   export default Students;
