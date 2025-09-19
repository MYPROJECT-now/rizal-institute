
import { getSchedule } from "@/src/actions/adminAction";
import SchedTodos from "./classSchedTodos";

export const ClassSched = async () => {
  const data = await getSchedule();
  return <SchedTodos scheds={data} />;
}
