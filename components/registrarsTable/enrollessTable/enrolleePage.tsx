import { getAllEnrollees } from "@/src/actions/serverActions";
import Students from "./todos";


export const EnrolleePAge = async () => {
    const students = await getAllEnrollees();

    return <Students students={students} />

};