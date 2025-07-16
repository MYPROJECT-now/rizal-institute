
import {  getStudentsGrade } from "@/src/actions/registrarAction";
import Grades from "./gradeTodos";


export const GradesPage = async () => {
    const grade = await getStudentsGrade();

    return <Grades grade={grade} />

};