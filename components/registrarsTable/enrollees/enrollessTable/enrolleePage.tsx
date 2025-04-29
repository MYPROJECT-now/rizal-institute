import { getAllEnrollees_registrar } from "@/src/actions/serverActions";
import Students from "./todos";


export const EnrolleePAge = async () => {
    const students = await getAllEnrollees_registrar();

    return <Students students={students} />

};