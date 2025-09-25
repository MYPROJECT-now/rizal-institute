import { Top_analytics } from "@/components/accounts/registrar/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/accounts/registrar/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/accounts/registrar/dashboard/graphs/enrollment";
import { RecentApplicantsTable } from "@/components/accounts/registrar/dashboard/recentApplicants/recentApplicants";


const Dashboard = () => {
    return (
        <div className=" flex flex-col gap-10 px-5 pt-2 sm-pt-0 ">
            <section className="flex flex-col">
                <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Quick Stats
                </p>
            <Top_analytics />
            </section>

            <section className="flex flex-col">
                <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Population Insight
                </p>

                <div className="flex sm:flex-row flex-col gap-10">
                <Ppgl />
                <Enrollment />
                </div>
            </section>

            <section className="flex flex-col">
                <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Pending Applicants
                </p>
                <RecentApplicantsTable />
            </section>
        </div>
    );
};

export default Dashboard;