import Image from "next/image";
import {  getPendingApplicantsCount,  getPendingPaymentsCount,  getReservedSlotCount } from "@/src/actions/cashierAction";

export const Top_analytics = async () => {
    const pendingApplicants = await getPendingApplicantsCount();
    const reservedSlots = await getReservedSlotCount();
    const pendingPayments = await getPendingPaymentsCount();

    return (
        <div className="flex flex-row gap-9">

            <div className="w-[250px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-lg">
                       Pending Applicants
                    </p>
                    <p className="font-bold text-sm">
                        {pendingApplicants}
                    </p>
                </div>
                <div>
                    <Image
                        src="/clipboard.png"
                        alt="cup"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[16px]">
                        Reserved Slot
                    </p>
                    <p className="font-bold text-sm">
                        {reservedSlots}
                    </p>
                </div>
                <div>
                    <Image
                        src="/slot.png"
                        alt="cup"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[300px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[16px]">
                        Pending Students Payment 
                    </p>
                    <p className="font-bold text-sm">
                        {pendingPayments}
                    </p>
                </div>
                <div>
                    <Image
                        src="/bag.png"
                        alt="cup"
                        width={40}
                        height={40}
                    />
                </div>
            </div>


        </div>
    );
};