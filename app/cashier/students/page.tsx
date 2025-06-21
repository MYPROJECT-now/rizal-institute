import { StudentsTableCashier } from "@/components/cashiersTable/students/Students_cashier";
import Cashier_header from "@/components/header/header_cashier";
import CashierClientComponent from "@/components/validation/cashier_validate";
const RegistrarsStudentsTable = () => {
    return (
        <CashierClientComponent>
        <div className="w-full max-h-full rounded-xl flex flex-col px-10 bg-page sm:text-sm md:text-base lg:text-lg ">
            <Cashier_header /> 
            <div className="w-full h-full bg-white self-center rounded-lg mt-3">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    STUDENT FEE MANAGEMENT
                </div>
                <StudentsTableCashier />
            </div>
        </div>
        </CashierClientComponent>
    );
};

export default RegistrarsStudentsTable;