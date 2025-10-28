import { Top_analytics } from "@/components/accounts/cashier/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/accounts/cashier/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/accounts/cashier/dashboard/graphs/enrollment";
import { RecentPaymentsTable } from "@/components/accounts/cashier/dashboard/table/tablePage2";
import { PaymentScheme } from "@/components/accounts/cashier/dashboard/graphs/scheme";
import { getSelectedYearNumber } from "@/src/actions/utils/getSelectedYear";


const Dashboard = () => {
    const year = async () => await getSelectedYearNumber()
    return (
        <div className=" flex flex-col gap-10 px-5 pt-2 sm-pt-0 ">
            <section className="flex flex-col">
                <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Quick Stats ( {year()} )
                </p>
            <Top_analytics />
            </section>

            <section className="flex flex-col">
                <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Financial Insight
                </p>
                <div className="flex lg:flex-row flex-col gap-10">
                    <Enrollment />
                    <Ppgl />
                    <PaymentScheme />

                </div>
            </section>

            <section className="flex flex-col">
                <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Recent Pending Payment 
                </p>
                <div>
                    <RecentPaymentsTable />
                </div>
            
            </section>
        </div>

    );
};

export default Dashboard;