import Registrar_header  from "@/components/sidebar/header/header_registrar";
import { Reserved_Page } from "@/components/accounts/registrar/reserved/reserved_page";
const RegistrarsEnrolleesTable = () => {
    return (
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Registrar_header /> 
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    ADMISSION PAGE
                </div>
                <Reserved_Page />
            </div>
        </div>
    );
};

export default RegistrarsEnrolleesTable;