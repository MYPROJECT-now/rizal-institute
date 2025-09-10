import Cashier_header from "@/app/header/header_cashier";                    
import { Top_analytics } from "@/components/accounts/cashier/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/accounts/cashier/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/accounts/cashier/dashboard/graphs/enrollment";
import { RecentPaymentsTable } from "@/components/accounts/cashier/dashboard/table/tablePage2";


const Dashboard = () => {
    return (
    <div className="p-4 h-screen overflow-hidden rounded-xl  ">
        <div className="overflow-hidden overflow-y-auto w-full h-full rounded-xl flex flex-col py-4 sm:px-10 px-4  bg-page">
            <Cashier_header />
            <div className="w-full h-auto lg:h-[540px] flex flex-col gap-10 mt-10 rounded-lg ">
               <div className="flex flex-col">
                    <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                    Quick Stats
                </p>
                <Top_analytics />
               </div>

               <div className="flex flex-col">
                    <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                        Financial Insight
                    </p>
                    <div className="flex lg:flex-row flex-col gap-10">
                        <Enrollment />
                        <Ppgl />

                    </div>
               </div>

               <div className="flex flex-col">
                    <p className="lg:text-2xl sm:text-xl text-lg font-bold text-dGreen mb-2">
                        Recent Transaction
                    </p>
                    <div>
                        <RecentPaymentsTable />
                    </div>
             
               </div>
            </div>
        </div>
    </div>
    );
};

export default Dashboard;