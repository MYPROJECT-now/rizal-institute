import CashierClientComponent from "@/components/validation/cashier_validate";
import Cashier_header from "@/components/header/header_cashier";
import { Top_analytics } from "@/components/cashiersTable/dashboard/analytics/top_analyitcs";
import { Ppgl } from "@/components/cashiersTable/dashboard/graphs/ppgl";
import { Enrollment } from "@/components/cashiersTable/dashboard/graphs/enrollment";
import { RecentTransactionsTable } from "@/components/cashiersTable/dashboard/table/tablePage2";


const Dashboard = () => {
    return (
        <CashierClientComponent>    
        <div className="w-full max-h-full overflow-auto mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page sm:text-sm md:text-base lg:text-lg ">
            <Cashier_header />
            <div className="w-full h-[540px] mt-10 rounded-lg">
               <div className="flex flex-col">
                <p className="text-2xl font-bold text-dGreen mb-2 grid grid-cols-1 gap-5 p-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    Quick Stats
                </p>
                <Top_analytics />
               </div>

               <div className="flex flex-col sm:flex-row-2 mt-5">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Financial Insight
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
                    <Ppgl />
                    <Enrollment />
                    </div>
               </div>

               <div className="flex flex-col">
                    <p className="text-2xl font-bold text-dGreen mb-2">
                        Recent Transaction
                    </p>
                    <div>
                        <RecentTransactionsTable />
                    </div>
             
               </div>
            </div>
        </div>
    </CashierClientComponent>
    );
};

export default Dashboard;