
import { Top_analytics } from "@/components/accounts/admin/dashboard/analytics/top_analyitcs";
import { RecentAuditTrailsTable } from "@/components/accounts/admin/dashboard/auditTrails/auditTrails";
import Admin_header from "@/app/header/header_admin";


const Dashboard = () => {
    return (
    <div className="p-4 h-screen overflow-hidden rounded-xl  ">
        <div className="overflow-hidden overflow-y-auto w-full h-full rounded-xl flex flex-col py-4 sm:px-10 px-4  bg-page">
            <Admin_header />
            <div className="w-full h-auto lg:h-[540px] flex flex-col gap-10 mt-10 rounded-lg ">
               <div className="flex flex-col">  
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Quick Stats
                    </p>    
                    <Top_analytics />
                </div>

                <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                       Recent Actions
                    </p>
                    <div>
                        <RecentAuditTrailsTable />
                    </div>
                    </div>
                </div>
        </div>
    </div>
    );
};

export default Dashboard;