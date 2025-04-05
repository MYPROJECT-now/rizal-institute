"use client";
import { FC, useState } from "react";
import { studentType } from "@/src/type/AllEnrolleeType";
import Student from "./todo";

interface Props {
  students: studentType[];
}

const Students: FC<Props> = ({ students }) => {
  const [studentList] = useState<studentType[]>(students);



  return (
    <main className="mx-auto max-w-5xl w-full min-h-screen p-8">
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
          />
        ))}
      </tbody>
    </table>
  </main>
  );
};

export default Students;
