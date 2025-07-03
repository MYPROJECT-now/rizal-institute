import Registrar_header  from "@/components/header/header_registrar";
import { GradeTable } from "@/components/registrarsTable/grades/grades_registrar";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
const RegistrarsStudentsTable = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full max-h-full flex flex-col px-10 bg-page sm:text-sm md:text-base lg:text-lg ">
            <Registrar_header /> 
            <div className="w-full h-auto bg-white self-center mt-3 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-lg lg:text-3xl text-white items-center flex pl-5">
                    GRADE MANAGEMENT
                </div>
                <GradeTable />
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default RegistrarsStudentsTable;