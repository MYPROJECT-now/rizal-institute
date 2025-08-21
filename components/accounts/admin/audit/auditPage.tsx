import { getAllAuditTrails } from "@/src/actions/adminAction";
import AuditTodos from "./auditTodos";


export const AuditPage = async () =>{
  const data = await getAllAuditTrails();
  return <AuditTodos auditTodos={data} />
}
