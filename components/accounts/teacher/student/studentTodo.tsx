"use client";
import {  FC, useState } from "react";
import { MyStudentType } from "@/src/type/TEACHER/teacher";
import { Button } from "@/components/ui/button";
import { updateFinalGrade } from "@/src/actions/teacherAction";

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
  const [finalGrade, setFinalGrade] = useState(myStudent.finalGrade);




  const handleEdit = async() => {
    setEditing(true);
    await updateFinalGrade(myStudent.grade_id ?? 0, myStudent.finalGrade ?? 0);
  };

  const handleSave = async () => {
    changeTodoText(myStudent.grade_id ?? 0, finalGrade ?? 0);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };


  // Rendering the Todo component
  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
        <td className="px-4 py-2">{myStudent.lrn}</td>
        <td className="px-4 py-2">{myStudent.studentLastName + ", " + myStudent.studentFirstName + " " + (myStudent.studentMiddleName || " ") + " " + (myStudent.studentSuffix || " ")}</td>
        <td className="px-4 py-2">
          {/* {myStudent?.finalGrade || "-"} */}
          <input 
            type="text" 
            className={editing ? "focus:ring-2 focus:ring-dGreen focus:border-dGreen outline-none transition w-10 rounded-md p-1 text-center" : " w-10 bg-transparent outline-none"} 
            value={finalGrade ?? "-"} 
            onChange={(e) => setFinalGrade(Number(e.target.value))}             
            readOnly={!editing}
            />
        </td>
        <td className="px-4 py-2">{myStudent?.remarks || "-"}</td>
        <td className="px-4 py-2 flex flex-row gap-2 justify-center">
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
            {editing && (
            <Button
                variant="rejectButton"
                onClick={handleCancel}
                className="px-2 w-[80px] rounded-xl"
            >
                Cancel
            </Button>
            )}
        </td>
    </tr>
  );
};

export default StudentTodo;
