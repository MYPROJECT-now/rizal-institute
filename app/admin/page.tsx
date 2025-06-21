
import { Top_analytics } from "@/components/admin/dashboard/analytics/top_analyitcs";
import { AdminAuditTrailsTable } from "@/components/admin/dashboard/table/tablePage2";


import Admin_header from "@/components/header/header_admin";
import AdminClientComponent from "@/components/validation/admin_validate";


const Dashboard = () => {
    return (
        <AdminClientComponent>
        <div className="w-full max-h-full overflow-auto rounded-xl flex flex-col px-10 bg-page sm:text-sm md:text-base lg:text-lg">
            <Admin_header />
            <div className="w-full h-[540px] rounded-lg gap-5">
                <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2 mt-5">
                        Quick Stats
                    </p>    
                    <Top_analytics />
                </div>

                <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mt-5">
                       Audit Trails
                    </p>
                    <div>
                        <AdminAuditTrailsTable />
                    </div>
                    </div>
                </div>
        </div>
        </AdminClientComponent>
    );
};

export default Dashboard;