import { getAllEnrollees_cashier } from "@/src/actions/serverActions";
import Students from "./todos";


export const EnrolleePAge = async () => {
    const students = await getAllEnrollees_cashier();

    return <Students students={students} />

};