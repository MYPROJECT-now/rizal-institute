import Registrar_header  from "@/components/header/header_registrar";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
import { ApplicantsPage } from "@/components/registrar/applicants/applicants_table/applicants_page";
const RegistrarsEnrolleesTable = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full h-auto lg:h-[680px] mt-3 lg:mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Registrar_header /> 
            <div className="w-full h-auto lg:h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    APPLICANT MANAGEMENT
                </div>
                <ApplicantsPage />
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default RegistrarsEnrolleesTable;