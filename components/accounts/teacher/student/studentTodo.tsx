"use client";
import {  FC, useState } from "react";
import { MyStudentType } from "@/src/type/TEACHER/teacher";
import { Button } from "@/components/ui/button";

interface Props {
  myStudent: MyStudentType;
  changeTodoText: (grade_id: number, finalGrade: number) => void;
  className?: string;

}

const StudentTodo: FC<Props> = ({
    myStudent,
    changeTodoText,
    className,

}) => {
  // State for handling editing mode
  const [editing, setEditing] = useState(false);
  const [finalGrade,] = useState(myStudent.finalGrade);




  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    changeTodoText(myStudent.grade_id ?? 0, finalGrade ?? 0);
    setEditing(false);
  };



  // Rendering the Todo component
  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
        <td className="px-4 py-2">{myStudent.lrn}</td>
        <td className="px-4 py-2">{myStudent.studentLastName + ", " + myStudent.studentFirstName + " " + myStudent.studentMiddleName + " " + myStudent.studentSuffix }</td>
        <td className="px-4 py-2">{myStudent?.finalGrade || "-"}</td>
        <td className="px-4 py-2">{myStudent?.remarks || "-"}</td>
        <td className="px-4 py-2">
            {editing ? (
            <Button
                variant="acceptButton"
                onClick={handleSave}
                className="px-2 w-[80px] rounded-xl"
            >
                Save
            </Button>
            ) : (
            <Button
                variant="confirmButton"
                onClick={handleEdit}
                className="px-2 w-[80px] rounded-xl"
            >
                Edit
            </Button>
            )}
        </td>
    </tr>
  );
};

export default StudentTodo;
