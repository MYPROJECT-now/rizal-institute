import { getAllReservedSlot_cashier } from "@/src/actions/cashierAction";
import Applicants from "./ReservedTodos";


export const ReservedSlotPage = async () => {
    const applicant = await getAllReservedSlot_cashier();

    return <Applicants applicants={applicant} />

};