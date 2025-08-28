
import { Top_analytics } from "@/components/accounts/admin/dashboard/analytics/top_analyitcs";
import { RecentAuditTrailsTable } from "@/components/accounts/admin/dashboard/auditTrails/auditTrails";
import Admin_header from "@/components/sidebar/header/header_admin";


const Dashboard = () => {
    return (
        <div className="w-full h-[690px]  mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_header />
            <div className="w-full h-[540px] flex flex-col   mt-10 rounded-lg gap-10 ">
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
    );
};

export default Dashboard;