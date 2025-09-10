import {  getFullPayments } from "@/src/actions/cashierAction";
import Students from "./fullTodos";


export const FullPaymentPage = async () => {
    const applicants = await getFullPayments();

    return <Students applicants={applicants} />

};