import Registrar_header from "@/components/header/header_registrar";
import { Top_analytics } from "@/components/registrarsTable/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/registrarsTable/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/registrarsTable/dashboard/graphs/enrollment";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
import { RecentEnrolleesTable } from "@/components/registrarsTable/dashboard/table/tablePage2";


const Dashboard = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full max-h-[750px] overflow-auto mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Registrar_header />
            <div className="w-full h-[550px] flex flex-col gap-10 mt-10 rounded-lg ">
               <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Quick Stats
                    </p>
                <Top_analytics />
               </div>

               <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Population Insight
                    </p>

                    <div className="flex flex-row gap-10">
                    <Ppgl />
                    <Enrollment />
                    </div>
               </div>

               <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Recent Applicant
                    </p>
                    <RecentEnrolleesTable />
               </div>
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default Dashboard;