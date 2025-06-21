import Teacher_header from "@/components/header/header_teacher";
import { GradeTable } from "@/components/teacher/grades/grades_registrar";
import TeacherClientComponent from "@/components/validation/teacher_validate";
const RegistrarsStudentsTable = () => {
    return (
        <TeacherClientComponent>
        <div className="w-full max-h-full rounded-xl flex flex-col px-10 bg-page">
            <Teacher_header /> 
            <div className="w-full bg-white self-center rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    GRADE MANAGEMENT
                </div>
                <GradeTable />
            </div>
        </div>
        </TeacherClientComponent>
    );
};

export default RegistrarsStudentsTable;