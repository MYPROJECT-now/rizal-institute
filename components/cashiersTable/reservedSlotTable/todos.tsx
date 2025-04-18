"use client";
import { FC, useState } from "react";
import Student from "./todo";
import { acceptStudentsInititialPayment,  } from "@/src/actions/serverActions";
import { reservedSlotType } from "@/src/type/reservedSlotType";

interface Props {
  students: reservedSlotType[];
}

const Students: FC<Props> = ({ students }) => {
  const [studentList, setStudentList] = useState<reservedSlotType[]>(students);

  const handleAccept = async (id: number) => {
    await acceptStudentsInititialPayment(id, "Enrolled");



    // Update UI locally after status change
    setStudentList((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, acceptStudentsInititialPayment: "Reserved" } : student
      )
    );
  };


  return (
    <main className="mx-auto max-w-8xl w-full p-8 text-center">
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-green-600 text-white">
          <th className="px-4 py-2">LRN</th>
          <th className="px-4 py-2">Full Name</th>
          <th className="px-4 py-2">Grade Level</th>
          <th className="px-4 py-2">Payment Details</th>
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
