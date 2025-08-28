
import Admin_student from "@/components/sidebar/header/header_student";
import { PaymentPage } from "./paymentPage";


const Payments = () => {
    return (
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_student />
            <div className="w-full h-auto lg:h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
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