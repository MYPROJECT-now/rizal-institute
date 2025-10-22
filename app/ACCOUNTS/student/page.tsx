import { StudentDashboard } from "@/components/accounts/students/dashboard/dashboard";
import { Announcement_Modal } from "@/components/accounts/students/modal/announcemet_modal";

const Dashboard = () => {
    return (
        <div className="h-full flex flex-col  rounded-t-lg  lg:px-5 px-0 ">
            <section className="w-full h-full bg-white self-center lg:mt-2 mt-0 rounded-t-lg">
                <StudentDashboard />
                <Announcement_Modal/>

            </section>
        </div>

    );
};

export default Dashboard;
