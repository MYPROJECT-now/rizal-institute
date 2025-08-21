  "use client";
  import { FC, useState } from "react";
  import Student from "./ApplicantTodo";
  import { Tableapplicant_Type } from "@/src/type/CASHIER/APPLICANTS/applicansts";
  import { Button } from "@/components/ui/button";
import { toast } from "sonner";


  interface Props {
    applicants: Tableapplicant_Type[];
  }

  const Students: FC<Props> = ({ applicants }) => {
    const [studentList, setApplicantList] = useState<Tableapplicant_Type[]>(applicants);
    const [filterName, setFilterName] = useState("");
    const [filterLRN, setFilterLRN] = useState("");
    const [filterGrade, setFilterGrade] = useState("");
    const [loadingId, setLoadingId] = useState<number | null>(null);


    // 🔢 Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 6;



    const handleAccept = async (id: number, lastName: string, firstName: string, middleName: string) => {
    setLoadingId(id);
    try {
      const response = await fetch('/api/accept/cashier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: id, name: lastName + " " + firstName + " " + middleName }),
      });

      const data = await response.json();
      if (response.ok) {
                toast.success(data.message);
                setApplicantList((prevList) => 
                  prevList.map((student) => 
                    (student.id === id 
                      ?{...student, 
                            reservationPaymentStatus: data.reservationPaymentStatus, 
                            dateApprovedByCashier:data.dateApprovedByCashier} 
                      : student)));
              } else {
                toast.error(data.message || "Failed to send email.");
              }
            } catch (error) {
              toast.error("Something went wrong while accepting reservation payment.");
              console.error(error);
            }
          finally {
            setLoadingId(null);
          }
          };


      const handleDecline = (id: number) => {
        setApplicantList((prevList) =>
          prevList.map((student) =>
            student.id === id
              ? { ...student, applicationFormReviewStatus: "Declined" }
              : student
          )
        );
    };
    
  const filteredStudents = studentList.filter((student) => {
    const fullName = `${student.firstName} ${student.middleName ?? ""} ${student.lastName}`.toLowerCase();
    const matchesName = fullName.includes(filterName.toLowerCase());
    const matchesLRN = student.lrn.includes(filterLRN);
    const matchesGrade = filterGrade === "" || student.gradeLevel === filterGrade;

    return matchesName && matchesLRN && matchesGrade;
  });

    // 🧮 Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.max(1,Math.ceil(filteredStudents.length / studentsPerPage));


    return (
      <main className="mx-auto max-w-8xl w-full  p-8 text-center">

          <div className="flex flex-wrap items-center gap-4 mb-6">
    <label className="text-green-900 font-bold text-lg">Filter By:</label>

    <input
      type="text"
      placeholder="Name"
      value={filterName}
      onChange={(e) => setFilterName(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
    />

    <input
      type="text"
      placeholder="LRN"
      value={filterLRN}
      onChange={(e) => setFilterLRN(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
    />

    <select
      value={filterGrade}
      onChange={(e) => setFilterGrade(e.target.value)}
        className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
    >
      <option value="">All Grades</option>
      <option value="7">Grade 7</option>
      <option value="8">Grade 8</option>
      <option value="9">Grade 9</option>
      <option value="10">Grade 10</option>
      {/* Add other grades as needed */}
    </select>

    <Button
      onClick={() => {
        setFilterName("");
        setFilterLRN("");
        setFilterGrade("");
      }}
      variant="confirmButton"
      className="w-[100px] h-[40px] rounded-lg"  
    >
      Clear Filter
    </Button>
  </div>
      
    <div className="overflow-x-auto shadow-lg rounded-lg border border-green-300 bg-green-50">
    <table className="w-full text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="px-4 py-2">LRN</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Grade Level</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Full Details</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
            {currentStudents.length === 0 ? (
              <tr>
              <td colSpan={6} className="p-4 text-black">
                No recent applicants found.
              </td>
            </tr>
          ) : (
            currentStudents.map((applicants, idx) => (
            <Student 
              key={applicants.lrn} 
              applicants={applicants} 
              onAccept={handleAccept}
              onDecline={handleDecline}
              className={idx % 2 === 0 ? "bg-white" : "bg-green-100"}
              loading={loadingId === applicants.id}

            />
          ))
        )}
        </tbody>
      </table>
      </div>

      {/* Pagination Controls */}
        <div className="flex justify-center mt-4 gap-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant={"prevButton"}
            className="px-3 py-1"
          >
            Previous
          </Button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant={"prevButton"}
            className="px-3 py-1"
          >
            Next
          </Button>
        </div>

    </main>
    );
  };

  export default Students;
