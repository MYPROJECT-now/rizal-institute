
import { getAllEnrollees_registrar } from "@/src/actions/registrarAction";
import Applicants from "./applicantTodos";


export const ApplicantsPage = async () => {
    const applicants = await getAllEnrollees_registrar();

    return <Applicants applicants={applicants} />

};