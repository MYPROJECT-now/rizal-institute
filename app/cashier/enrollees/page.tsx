import Cashier_header from "@/components/header/header_cashier";
import { EnrolleesTable }   from "@/components/registrarsTable/Enrollees_registrar";
import CashierClientComponent from "@/components/validation/cashier_validate";
const RegistrarsEnrolleesTable = () => {
    return(
    <CashierClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
            <Cashier_header /> 
            <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg ">
                <EnrolleesTable /> <h1>Hindi nakikita</h1>
            </div>
        </div>
        </CashierClientComponent>
    );
};

export default RegistrarsEnrolleesTable;