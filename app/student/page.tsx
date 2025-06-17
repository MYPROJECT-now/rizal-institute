import Admin_student from "@/components/header/header_student";
import { StudentDashboard } from "@/components/students/dashboard/dashboard";
import StudentClientComponent from "@/components/validation/student_validate";

const Dashboard = () => {
    return (
        <StudentClientComponent>
            <div className="w-full max-h-full rounded-xl flex flex-col px-10 bg-page sm:text-sm md:text-base lg:text-lg">
                <Admin_student />
                <div className="w-full h-full bg-white self-center mt-10 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="h-full flex flex-col">
                        <div className="flex-grow overflow-auto">
                            <StudentDashboard />
                        </div>
                        <div className="bg-red-50 p-6 border-t-2 border-red-300">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-red-700">Outstanding Balance:</span>
                                <span className="text-2xl font-bold text-white bg-red-600 px-6 py-3 rounded-lg shadow-md">₱1500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StudentClientComponent>
    );
};

export default Dashboard;
