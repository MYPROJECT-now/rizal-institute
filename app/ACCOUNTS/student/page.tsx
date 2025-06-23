import Admin_student from "@/components/header/header_student";
// import { StudentDashboard } from "@/components/students/dashboard/dashboard";
import StudentClientComponent from "@/components/validation/student_validate";

const Dashboard = () => {
    return (
        <StudentClientComponent>
            <div className="w-full max-h-full rounded-xl flex flex-col px-10 bg-page sm:text-sm md:text-base lg:text-lg">
                <Admin_student />
                <div className="w-full h-full bg-white self-center mt-10 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="h-full flex flex-col">
                        <div className="flex-grow overflow-auto">
                            {/* <StudentDashboard /> */}
                        </div>
                    </div>
                </div>
            </div>
        </StudentClientComponent>
    );
};

export default Dashboard;
