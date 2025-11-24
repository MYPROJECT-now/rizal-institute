import Image from "next/image";
import {  getPendingApplicantsCount,  getPendingFullPaymentsCount,  getPendingMonthlyPaymentsCount,  getReservedSlotCount } from "@/src/actions/cashierAction";
import { getSelectedYear } from "@/src/actions/utils/getSelectedYear";
import { toast } from "sonner";
import Link from "next/link";

export const Top_analytics = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return toast.error("No selectedacademic year.");

    const [pendingApplicants, reservedSlots, pendingFullPayments, pendingMonthlyPayments] = await Promise.all([
        getPendingApplicantsCount(selectedYear),
        getReservedSlotCount(selectedYear),
        getPendingFullPaymentsCount(selectedYear),
        getPendingMonthlyPaymentsCount(selectedYear),
    ]);
    return (
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-3 ">

            <section className=" flex flex-col bg-Green text-white rounded-lg px-2 py-1">
                <div className="gap-4  flex flex-row justify-center items-center">
                <div>
                    <Image
                        src="/board.png"
                        alt="reservation fee"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                       Pending Assessment Fees
                    </p>
                    <p className="font-bold text-2xl">
                        {pendingApplicants}
                    </p>

                </div>
                </div>

                <Link
                    href="/ACCOUNTS/cashier/applicants"
                >
                <p className="-mt-3 block text-end text-sm font-bold underline text-white transition-transform duration-150 active:scale-95 origin-right">
                    View All
                </p>
                </Link>
            </section>

            
            <section className=" flex flex-col bg-Green text-white rounded-lg px-2 py-1">
                <div className="gap-4  flex flex-row justify-center items-center">
                <div>
                    <Image
                        src="/slot.png"
                        alt="slot"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Reserved Student Slot
                    </p>
                    <p className="font-bold text-2xl">
                        {reservedSlots}
                    </p>
                </div>
                </div>

                <Link
                    href="/ACCOUNTS/cashier/reserved"
                >
                <p className="-mt-3 block text-end text-sm font-bold underline text-white transition-transform duration-150 active:scale-95 origin-right">
                    View All
                </p>
                </Link>
            </section>

            <section className=" flex flex-col bg-Green text-white rounded-lg px-2 py-1">
                <div className="gap-4  flex flex-row justify-center items-center">
                <div>
                    <Image
                        src="/month.png"
                        alt="monthly payment"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Pending Monthly Payment
                    </p>
                    <p className="font-bold text-2xl">
                        {pendingMonthlyPayments}
                    </p>
                </div>
                </div>

                <Link
                    href="/ACCOUNTS/cashier/payment_Approval"
                >
                <p className="-mt-3 block text-end text-sm font-bold underline text-white transition-transform duration-150 active:scale-95 origin-right">
                    View All
                </p>
                </Link>
            </section>
            
            <section className=" flex flex-col bg-Green text-white rounded-lg px-2 py-1">
                <div className="gap-4  flex flex-row justify-center items-center">
                <div>
                    <Image
                        src="/full.png"
                        alt="full payment"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Pending Enrollment Fee
                    </p>
                    <p className="font-bold text-2xl">
                        {pendingFullPayments}
                    </p>
                </div>
                </div>

                <Link
                    href="/ACCOUNTS/cashier/full"
                >
                <p className="-mt-3 block text-end text-sm font-bold underline text-white transition-transform duration-150 active:scale-95 origin-right">
                    View All
                </p>
                </Link>
            </section>

        </div>
    );
};