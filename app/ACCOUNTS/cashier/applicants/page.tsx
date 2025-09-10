import { ApplicantsPage } from "@/components/accounts/cashier/applicants/applicatsTable/applicantsPage";
import Cashier_header from "@/app/header/header_cashier";
const RegistrarsEnrolleesTable = () => {
    return(
    <div className="p-4 w-full min-h-screen lg:h-screen">
        <div className=" w-full h-full rounded-xl flex flex-col pt-4 sm:px-10 px-4  bg-page">
            <Cashier_header /> 
            <div className="w-full h-full bg-white self-center mt-2 rounded-lg ">
                <div className=" w-full bg-lGreen font-merriweather text-white items-center flex sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-2xl">
                    APPLICANT MANAGEMENT
                </div>
                <ApplicantsPage />
            </div>
        </div>
    </div>
    );
};

export default RegistrarsEnrolleesTable;