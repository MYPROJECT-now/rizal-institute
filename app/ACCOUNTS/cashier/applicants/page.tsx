import { ApplicantsPage } from "@/components/accounts/cashier/applicants/applicatsTable/applicantsPage";
const RegistrarsEnrolleesTable = () => {
    return(
        <div className="h-full flex flex-col  rounded-t-lg  lg:px-5 px-0 ">
            <section className="w-full h-full bg-white self-center lg:mt-2 mt-0">
                <header className="  rounded-t-lg bg-lGreen font-bold font-merriweather  tracking-[1px]  text-white sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-xl lg:border-0 border-x-2 border-t-2 border-white">
                    APPLICANT MANAGEMENT
                </header>
                <ApplicantsPage />
            </section>
        </div>
    );
};

export default RegistrarsEnrolleesTable;