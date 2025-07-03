
import Admin_student from "@/components/header/header_student";
import StudentClientComponent from "@/components/validation/student_validate";
import { PaymentPage } from "./paymentPage";


const Payments = () => {
    return (
        <StudentClientComponent>
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_student />
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                Payment Management
                </div>
                <div>
                    <PaymentPage />
                </div>
            </div>
        </div>
        </StudentClientComponent>
    );
};

export default Payments;