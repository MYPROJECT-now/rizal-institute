"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMyStudents } from "@/src/actions/teacherAction";
import StudentTodos from "./studentTodos";
import { MyStudentType } from "@/src/type/TEACHER/teacher";

export const MyStudents = () => {
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<MyStudentType[]>([]);

  useEffect(() => {
    const filterID = searchParams.get("filterID");
    if (!filterID) return;

    const [gradeLevel_id, subject_id] = filterID.split("-").map(Number);
    if (!gradeLevel_id || !subject_id) return;

    const fetchStudents = async () => {
      const data = await getMyStudents(gradeLevel_id, subject_id);
      setStudents(data);
    };

    fetchStudents();
  }, [searchParams]); // this is safe — useSearchParams is reactive

  return <StudentTodos studentTodos={students} />;
};
