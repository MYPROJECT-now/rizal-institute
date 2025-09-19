"use client";

import { useState, useEffect } from "react";
import StudentTodos from "./studentTodos";
import { MyStudentType } from "@/src/type/TEACHER/teacher";

export const MyStudentsClient = ({ students }: { students: MyStudentType[] }) => {
  const [myStudents, setMyStudents] = useState<MyStudentType[]>(students);

  // if students prop changes, sync it
  useEffect(() => {
    setMyStudents(students);
  }, [students]);

  return <StudentTodos studentTodos={myStudents} />;
};
