import Image from "next/image";
import {  getPendingApplicantsCount,  getPendingPaymentsCount,  getReservedSlotCount } from "@/src/actions/cashierAction";
import { getSelectedYear } from "@/src/actions/utils/getSelectedYear";
import { toast } from "sonner";

export const Top_analytics = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return toast.error("No selectedacademic year.");

    const [pendingApplicants, reservedSlots, pendingPayments] = await Promise.all([
        getPendingApplicantsCount(selectedYear),
        getReservedSlotCount(selectedYear),
        getPendingPaymentsCount(selectedYear),
    ]);
    return (
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-3">

            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                       Pending Applicants
                    </p>
                    <p className="font-bold text-[15px]">
                        {pendingApplicants}
                    </p>
                </div>
                <div>
                    <Image
                        src="/clipboard.png"
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>

            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Unpaid Reservation
                    </p>
                    <p className="font-bold text-[15px]">
                        {pendingPayments}
                    </p>
                </div>
                <div>
                    <Image
                        src="/bag.png"
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>
            
            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Reserved Slot
                    </p>
                    <p className="font-bold text-[15px]">
                        {reservedSlots}
                    </p>
                </div>
                <div>
                    <Image
                        src="/slot.png"
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>

        </div>
    );
};