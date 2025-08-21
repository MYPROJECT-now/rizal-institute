"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAssignClass } from "@/src/actions/teacherAction";
import { MyStudents } from "@/components/accounts/teacher/student/student";
import Teacher_header from "@/components/sidebar/header/header_teacher";

const StudentPage = () => {
  const [title, setTitle] = useState("...");
  const filterID = useSearchParams().get("filterID");

  useEffect(() => {
    if (!filterID) return setTitle("No class selected");

    const [gradeLevel_id, subject_id] = filterID.split("-").map(Number);
    if ([gradeLevel_id, subject_id].some(isNaN)) return setTitle("Invalid class");

    getAssignClass().then((classes) => {
      const match = classes?.find(c => c.gradeLevel_id === gradeLevel_id && c.subject_id === subject_id);
      setTitle(match ? `Grade ${match.gradeLevelName} - ${match.subjectName}` : "Class not found");
    });
  }, [filterID]);

  return (
    <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10 bg-page">
      <Teacher_header />
      <div className="w-full h-[540px] bg-white self-center mt-10 rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
          {title}
        </div>
        <MyStudents />
      </div>
    </div>
  );
};

export default StudentPage;
