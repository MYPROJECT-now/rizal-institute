import Teacher_header from "@/components/sidebar/header/header_teacher";
import { GradeTable } from "@/components/accounts/teacher/grades/grades_registrar";
const RegistrarsStudentsTable = () => {
    return (
        <div className="w-full max-h-full rounded-xl flex flex-col px-10 bg-page">
            <Teacher_header /> 
            <div className="w-full bg-white self-center rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    GRADE MANAGEMENT
                </div>
                <GradeTable />
            </div>
        </div>
    );
};

export default RegistrarsStudentsTable;