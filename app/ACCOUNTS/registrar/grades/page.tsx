import Registrar_header  from "@/components/sidebar/header/header_registrar";
import { GradesPage } from "@/components/accounts/registrar/grade/gradeTable/grade";
const RegistrarsStudentsTable = () => {
    return (
        <div className=" w-full h-full rounded-xl flex flex-col py-4 sm:px-10 px-4  bg-page">
            <Registrar_header /> 
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    GRADE MANAGEMENT
                </div>
                <GradesPage />
            </div>
        </div>
    );
};

export default RegistrarsStudentsTable;