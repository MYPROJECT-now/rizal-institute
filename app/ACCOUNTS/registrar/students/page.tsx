import Registrar_header  from "@/components/header/header_registrar";
import { CurrentStudentPage } from "@/components/registrar/enrolled_Students/student_page";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
const RegistrarsStudentsTable = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full max-h-full  flex flex-col px-10 bg-page sm:text-sm md:text-base lg:text-lg ">
            <Registrar_header /> 
            <div className="w-auto h-full bg-white rounded-lg mt-3">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    STUDENT MANAGEMENT
                </div>
                <CurrentStudentPage />
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default RegistrarsStudentsTable;