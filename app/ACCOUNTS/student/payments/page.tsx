
import Admin_student from "@/app/header/header_student";
import { PaymentPage } from "./paymentPage";


const Payments = () => {
    return (
            <div className="w-full sm:max-w-full sm:px-8 px-2  min-w-[300px] min-h-[680px] mt-3 mx-3 mb-3 rounded-xl flex flex-col  bg-page">
            <Admin_student />
            <div className="w-full h-auto lg:h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="sm:h-[80px] h-[60px] w-full bg-lGreen font-merriweather text-md sm:text-xl lg::text-3xl text-white items-center flex pl-5">
                Payment Management
                </div>
                <div>
                    <PaymentPage />
                </div>
            </div>
        </div>
    );
};

export default Payments;