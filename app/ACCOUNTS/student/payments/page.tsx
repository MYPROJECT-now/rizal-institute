
import { Balance } from "@/components/accounts/students/payment management/outstandingBalance/balance";
import { PaymentMainPage } from "@/components/accounts/students/payment management/payment/paymentMainPage";
import { PaymentHistoryPage } from "@/components/accounts/students/payment management/paymentHistory/paymentHistoryPage";


const Payments = () => {
    return (
    <div className="h-full flex flex-col  rounded-t-lg  lg:px-5 px-0 ">
        <section className="w-full h-full bg-white self-center lg:mt-2 mt-0">
            <header className="  rounded-t-lg bg-lGreen font-bold font-merriweather  tracking-[2px]   text-white sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-xl lg:border-0 border-x-2 border-t-2 border-white">
                Payment Management
            </header>
            <div className="bg-green-100  rounded-lg flex flex-col sm:flex-row  sm:items-center items-start  sm:mx-8 mx-2 mt-4 p-3 justify-between gap-2">
                <Balance />
                <PaymentMainPage />
            </div>
            <PaymentHistoryPage />
        </section>
    </div>
    );
};

export default Payments;