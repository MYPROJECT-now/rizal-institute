
import {  getStudentsGrade, getStudentsStatus } from "@/src/actions/registrarAction";
import Grades from "./gradeTodos";


export const GradesPage = async () => {
    const grade = await getStudentsGrade();
    const statuses = await getStudentsStatus();

    return <Grades grade={grade} statuses={statuses} />;

};