import { Top_analytics } from "@/components/dashboard copy 2/registrar/analytics/top_analyitcs";
import { RecentLoginLogsTable } from "@/components/dashboard copy 2/registrar/table/tablePage2";

import Admin_header from "@/components/header/header_admin";
import AdminClientComponent from "@/components/validation/admin_validate";


const Dashboard = () => {
    return (
        <AdminClientComponent>
        <div className="w-full max-h-[680px] overflow-auto mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_header />
            <div className="w-full h-[550px] flex flex-col   mt-10 rounded-lg gap-10 ">
                <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Quick Stats
                    </p>    
                    <Top_analytics />
                </div>

                <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Recent Logs
                    </p>
                    <div>
                        <RecentLoginLogsTable />
                    </div>
                    </div>
                </div>
        </div>
        </AdminClientComponent>
    );
};

export default Dashboard;