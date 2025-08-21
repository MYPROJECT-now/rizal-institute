
import { getEnrolledStudent } from "@/src/actions/registrarAction";
import Students from "./studentTodos";


export const CurrentStudentPage = async () => {
    const students = await getEnrolledStudent();

    return <Students students={students} />

};