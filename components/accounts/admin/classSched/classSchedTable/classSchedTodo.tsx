"use client";
import { SchedType } from "@/src/type/ADMIN/admin";
import { FC, memo } from "react";

interface Props {
  sched: SchedType;
  className?: string;
}

const SchedTodoComponent: FC<Props> = ({ sched, className }) => {
  return (
    <div className={`p-1 hover:bg-green-200 rounded transition duration-200 text-start ${className ?? ""}`}>
      Teacher: {sched.clerk_username} <br />
      {sched.subjectName} {sched.startTime} - {sched.endTime}
    </div>
  );
};

// 🟢 Prevents unnecessary re-renders
const SchedTodo = memo(SchedTodoComponent);

export default SchedTodo;
