"use client";
import { SchedType } from "@/src/type/ADMIN/admin";
import { FC, memo } from "react";

interface Props {
  sched: SchedType;
  className?: string;
}

const SchedTodoComponent: FC<Props> = ({ sched, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-3 rounded-lg border shadow-sm bg-white hover:bg-green-50 transition-all ${className ?? ""}`}
    >
      {/* Teacher name */}
      <div className="font-semibold text-sm text-gray-800">
        {sched.clerk_username}
      </div>

      {/* Subject and time */}
      <div className="text-xs text-gray-600 mt-0.5">
        {sched.subjectName} — {sched.startTime}–{sched.endTime}
      </div>

      {/* Room name */}
      <div className="text-xs text-gray-500 mt-0.5">
        {sched.roomName}
      </div>
    </div>
  );
};

// 🟢 Prevents unnecessary re-renders
const SchedTodo = memo(SchedTodoComponent);

export default SchedTodo;
