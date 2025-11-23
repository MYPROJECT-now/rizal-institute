import { get_reserved_students, getReceiptsCondition } from "@/src/actions/cashierAction";
import Students from "./ApplicantTodos";


export const ApplicantsPage = async () => {
  const applicants = await get_reserved_students();
  const activeReceipt = await getReceiptsCondition();

  return <Students applicants={applicants} activeReceipt={activeReceipt} />;
};
