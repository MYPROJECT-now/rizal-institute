import Registrar_header from "@/components/header/header_registrar";
import { Top_analytics } from "@/components/registrar/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/registrar/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/registrar/dashboard/graphs/enrollment";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
import { RecentApplicantsTable } from "@/components/registrar/dashboard/recentApplicants/recentApplicants";


const Dashboard = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full max-h-full overflow-auto rounded-xl flex flex-col px-10  bg-page sm:text-sm md:text-base lg:text-lg">
            <Registrar_header />
            <div className="w-full h-[540px] flex flex-col gap-10 mt-10 rounded-lg ">
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
                    <Ppgl />
                    <Enrollment />
                    </div>
               </div>

               <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Recent Applicant
                    </p>
                    <RecentApplicantsTable />
               </div>
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default Dashboard;