
import Admin_student from "@/components/header/header_student";
import { StudentDashboard } from "@/components/students/dashboard/dashboard";
import StudentClientComponent from "@/components/validation/student_validate";


const Dashboard = () => {
    return (
        <StudentClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_student />
            <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg ">
                <StudentDashboard />
            </div>
        </div>
        </StudentClientComponent>
    );
};

export default Dashboard;