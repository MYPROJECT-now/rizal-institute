import Cashier_header from "@/components/header/header_cashier";
import { StudentsTable   } from "@/components/registrarsTable/Students_registrar";
import CashierClientComponent from "@/components/validation/cashier_validate";
const RegistrarsStudentsTable = () => {
    return (
        <CashierClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
            <Cashier_header /> 
            <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg ">
                <StudentsTable />
            </div>
        </div>
        </CashierClientComponent>
    );
};

export default RegistrarsStudentsTable;