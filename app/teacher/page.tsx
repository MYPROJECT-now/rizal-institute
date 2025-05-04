import Teacher_header from "@/components/header/header_teacher";
import { GradeTable } from "@/components/registrarsTable/grades/grades_registrar";
import TeacherClientComponent from "@/components/validation/teacher_validate";
const RegistrarsStudentsTable = () => {
    return (
        <TeacherClientComponent>
        <div className="w-full h-[750px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Teacher_header /> 
            <div className="w-full h-[620px] bg-white self-center  mt-10 rounded-lg ">
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