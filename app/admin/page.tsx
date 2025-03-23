import { Top_analytics } from "@/components/dashboard/registrar/analytics/top_analyitcs";
import { EnrollmentTable } from "@/components/dashboard/registrar/table/table";
import Admin_header from "@/components/header/header_admin";
import AdminClientComponent from "@/components/validation/admin_validate";


const Dashboard = () => {
    return (
        <AdminClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
            <Admin_header />
            <div className="w-full h-[550px] flex bg-white   mt-10 rounded-lg ">
                <div className="flex flex-col">
                    <p>
                        Quick Stats
                    </p>    
                    <Top_analytics />
                </div>

                <div className="flex flex-col">
                    <p>
                    Recent Enrollee
                    </p>
                    <EnrollmentTable />
                    </div>
                </div>
        </div>
        </AdminClientComponent>
    );
};

export default Dashboard;