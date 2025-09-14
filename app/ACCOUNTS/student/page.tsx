import Admin_student from "@/app/header/header_student";
import { StudentDashboard } from "@/components/accounts/students/dashboard/dashboard";

const Dashboard = () => {
    return (
            <div className="w-full sm:max-w-full sm:px-8 px-0  min-w-[300px] h-[680px] sm:mt-3 mt-0 mx-3 mb-3 rounded-xl flex flex-col  bg-page">
                <Admin_student />
                <div className="w-full h-auto lg:h-[540px] bg-white self-center mt-2 lg:mt-10 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="h-full flex flex-col">
                        <div className="flex-grow overflow-auto">
                            <StudentDashboard />
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Dashboard;
