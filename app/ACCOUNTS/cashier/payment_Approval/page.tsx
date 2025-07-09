import Cashier_header from "@/components/header/header_cashier";
import { VerifyPage } from "@/components/cashier/payment_verification/VerifyPage";
const RegistrarsEnrolleesTable = () => {
    return(
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Cashier_header /> 
            <div className="w-full h-auto lg:h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    Payment Approval
                </div>
                <VerifyPage />
            </div>
        </div>
    );
};

export default RegistrarsEnrolleesTable;