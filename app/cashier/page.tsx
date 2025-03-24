import Registrar_header from "@/components/header/header_registrar";
import { Top_analytics } from "@/components/dashboard/registrar/analytics/top_analyitcs";
import { EnrollmentTable } from "@/components/dashboard/registrar/table/table";
import { Ppgl } from "@/components/dashboard/registrar/graphs/ppgl";
import { Enrollment } from "@/components/dashboard/registrar/graphs/enrollment";
import RegistrarClientComponent from "@/components/validation/registrar_validate";


const Dashboard = () => {
    return (
     
        <div className="w-full max-h-[680px] overflow-auto mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Registrar_header />
            <div className="w-full h-[550px] flex flex-col gap-10 mt-10 rounded-lg ">
               <div className="flex flex-col">
                <p>
                    Quick Stats
                </p>
                <Top_analytics />
               </div>

               <div className="flex flex-col">
                    <p>
                        Population Insight
                    </p>
                    <div className="flex flex-row gap-10">
                    <Ppgl />
                    <Enrollment />
                    </div>
               </div>

               <div className="flex flex-col">
                    <p>
                        Recent Enrollee
                    </p>
                    <EnrollmentTable />
               </div>
            </div>
        </div>
    );
};

export default Dashboard;