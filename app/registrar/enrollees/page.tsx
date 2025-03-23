import Registrar_header  from "@/components/header/header_registrar";
import { EnrolleesTable }   from "@/components/registrarsTable/Enrollees_registrar";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
const RegistrarsEnrolleesTable = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
            <Registrar_header /> 
            <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg ">
                <EnrolleesTable />
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default RegistrarsEnrolleesTable;