import { getAllEnrollees_cashier } from "@/src/actions/cashierAction";
import Students from "./ApplicantTodos";


export const ApplicantsPage = async () => {
    const applicants = await getAllEnrollees_cashier();

    return <Students applicants={applicants} />

};