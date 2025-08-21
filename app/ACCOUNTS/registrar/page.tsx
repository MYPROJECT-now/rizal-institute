import Registrar_header from "@/components/sidebar/header/header_registrar";
import { Top_analytics } from "@/components/accounts/registrar/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/accounts/registrar/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/accounts/registrar/dashboard/graphs/enrollment";
import { RecentApplicantsTable } from "@/components/accounts/registrar/dashboard/recentApplicants/recentApplicants";


const Dashboard = () => {
    return (
        <div className=" w-full h-full overflow-auto rounded-xl flex flex-col py-4 sm:px-10 px-4  bg-page">
            <Registrar_header />
            <div className="w-full h-auto lg:h-[540px] flex flex-col gap-10 mt-10 rounded-lg ">
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

                    <div className="flex sm:flex-row flex-col gap-10">
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
    );
};

export default Dashboard;