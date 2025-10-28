
import { Top_analytics } from "@/components/accounts/admin/dashboard/analytics/top_analyitcs";
import { RecentAuditTrailsTable } from "@/components/accounts/admin/dashboard/auditTrails/auditTrails";
import { getSelectedYearNumber } from "@/src/actions/utils/getSelectedYear";


const Dashboard = () => {
    const year = async () => await getSelectedYearNumber()
    return (
        <div className=" flex flex-col gap-10 px-5 pt-2 sm-pt-0 ">
            <section className="flex flex-col">
                <p className="text-2xl font-bold text-dGreen mb-2">
                    Quick Stats ( {year()} )
                </p>    
                <Top_analytics />
            </section>

            <section className="flex flex-col">
                <p className="text-2xl font-bold text-dGreen mb-2">
                    Recent Actions
                </p>
                <RecentAuditTrailsTable />
            </section>
        </div>

    );
};

export default Dashboard;