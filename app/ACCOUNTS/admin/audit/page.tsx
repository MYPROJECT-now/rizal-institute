
import { AuditPage } from "@/components/accounts/admin/audit/auditPage";
import Admin_header from "@/app/header/header_admin";


const AuditTrails = () => {
    return (
    <div className="p-4 w-full min-h-screen lg:h-screen">
        <div className=" w-full h-full rounded-xl flex flex-col pt-4 sm:px-10 px-4  bg-page">
            <Admin_header />
            <div className="w-full h-full bg-white self-center mt-2 rounded-lg ">
                <div className=" w-full bg-lGreen font-merriweather text-white items-center flex sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-2xl">
                    Audit Trails
                </div>
                <div>
                    <AuditPage />
                </div>
                   
            </div>
        </div>
    </div>
    );
};

export default AuditTrails;