import { get_student_to_assess } from "@/src/actions/cashierAction";
import Applicants from "./ReservedTodos";


export const ReservedSlotPage = async () => {
    const applicant = await get_student_to_assess();

    return <Applicants applicants={applicant} />

};