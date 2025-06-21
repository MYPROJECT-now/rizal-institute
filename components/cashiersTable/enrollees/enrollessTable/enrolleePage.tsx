import { getAllEnrollees_cashier } from "@/src/actions/cashierAction";
import Students from "./todos";


export const EnrolleePAge = async () => {
    const students = await getAllEnrollees_cashier();

    return <Students students={students} />

};