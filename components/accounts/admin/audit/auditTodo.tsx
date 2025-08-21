"use client";
import {  FC,  } from "react";
import { AuditTrailsType } from "@/src/type/ADMIN/admin";

interface Props {
  auditTodo: AuditTrailsType;
  className?: string;

}

const AuditTodo: FC<Props> = ({ auditTodo, className}) => {

  return (
    <tr className={`border-b hover:bg-green-200 transition duration-200 ${className || ""}`}>
        <td className="px-4 py-2">{auditTodo.username}</td>
        <td className="px-4 py-2">{auditTodo.usertype}</td>
        <td className="px-4 py-2">{auditTodo.actionTaken}</td>
        <td className="px-4 py-2">{auditTodo.actionTakenFor}</td>
        <td className="px-4 py-2">{auditTodo.dateOfAction}</td>
    </tr>

  );
};

export default AuditTodo;
