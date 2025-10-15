

import { Top_analytics } from "@/components/accounts/registrar/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/accounts/registrar/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/accounts/registrar/dashboard/graphs/enrollment";
import { RecentApplicantsTable } from "@/components/accounts/registrar/dashboard/recentApplicants/recentApplicants";
import { Discounts_graph } from "@/components/accounts/registrar/dashboard/graphs/discounts_graph";
import { Report } from "@/components/accounts/registrar/dashboard/reports/report";
import { getSelectedYearNumber } from "@/src/actions/utils/getSelectedYear";
import { DocumentStatus } from "@/components/accounts/registrar/dashboard/document/document";


const Dashboard = () => {
    const year = async () => await getSelectedYearNumber()
    return (
        <div className=" flex flex-col gap-10 px-5 pt-4 pb-8 sm-pt-0 ">
            <section className="flex flex-col">
                <p className=" sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Quick Stats ( {year()} )
                </p>
            <Top_analytics />
            </section>            
            
            <section className="flex flex-col">
                <p className=" sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Document Status ( {year()} )
                </p>
            <DocumentStatus />
            </section>

            <section className="flex flex-col">
                <p className=" sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Population Insight
                </p>

                <div className="flex sm:flex-row flex-col gap-4">
                <Ppgl />
                <Enrollment />
                <Discounts_graph />
                </div>
            </section>
            <section>
                <Report/>
            </section>

            <section className="flex flex-col">
                <p className=" sm:text-xl text-lg font-bold text-dGreen mb-2">
                   Recent Pending Applicants
                </p>
                <RecentApplicantsTable />
            </section>
        </div>
    );
};

export default Dashboard;