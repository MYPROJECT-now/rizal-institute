
import Students from "./StudentTodos";
import { getEnrolledStudents } from "@/src/actions/cashierAction";


export const StudentsPage = async () => {
    const students = await getEnrolledStudents();

    return <Students students={students} />

};