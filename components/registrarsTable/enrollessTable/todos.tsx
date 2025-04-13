"use client";
import { FC, useState } from "react";
import { studentType_registrar } from "@/src/type/AllEnrolleeType_registrar";
import Student from "./todo";
import { acceptStudentsApplication } from "@/src/actions/serverActions";

interface Props {
  students: studentType_registrar [];
}

const Students: FC<Props> = ({ students }) => {
  const [studentList, setStudentList] = useState<studentType_registrar []>(students);

  // const handleAccept = async (id: number) => {
  //   await acceptStudentsApplication(id, "Reserved");

  //   // Update UI locally after status change
  //   setStudentList((prev) =>
  //     prev.map((student) =>
  //       student.id === id ? { ...student, applicationStatus: "Ongoing" } : student
  //     )
  //   );
  // };

  const handleAccept = async (id: number) => {
    await acceptStudentsApplication(id);

    // Call the API to send the email if the status is Ongoing
    const response = await fetch('/api/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId: id }),
    });

    const data = await response.json();
    console.log(data.message);


    setStudentList((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              applicationStatus: student.reservationPaymentStatus === "Ongoing" ? "Reserved" : "Ongoing",
              reservationPaymentStatus: student.reservationPaymentStatus === "Ongoing" ? "Reserved" : student.reservationPaymentStatus,
            }
          : student
      )
    );
  };
  

  return (
    <main className="mx-auto max-w-8xl w-full  p-8  text-center">
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-green-600 text-white">
          <th className="px-4 py-2">LRN</th>
          <th className="px-4 py-2">Full Name</th>
          <th className="px-4 py-2">Grade Level</th>
          <th className="px-4 py-2">Full Details</th>
          <th className="px-4 py-2">Actions</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {studentList.map((student) => (
          <Student 
            key={student.lrn} 
            student={student} 
            onAccept={handleAccept}
          />
        ))}
      </tbody>
    </table>
  </main>
  );
};

export default Students;
