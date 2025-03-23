import Registrar_header  from "@/components/header/header_registrar";
import { StudentsTable   } from "@/components/registrarsTable/Students_registrar";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
const RegistrarsStudentsTable = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
            <Registrar_header /> 
            <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg ">
                <StudentsTable />
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default RegistrarsStudentsTable;