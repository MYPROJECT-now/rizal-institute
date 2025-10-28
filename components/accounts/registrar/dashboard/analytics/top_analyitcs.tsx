import Image from "next/image";
import { getTotalStudents, getGenderCounts, getTotalPendingApplicants, getTotalPendingAdmission } from "@/src/actions/registrarAction";
import { getSelectedYear } from "@/src/actions/utils/getSelectedYear";
import { toast } from "sonner";
import Link from "next/link";

export const Top_analytics = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return toast.error("No selectedacademic year.");

    const [totalStudents, genderCounts, totalPendingApplicants, totalPendingAdmission] = await Promise.all([
        getTotalStudents(selectedYear),
        getGenderCounts(selectedYear),
        getTotalPendingApplicants(selectedYear),
        getTotalPendingAdmission(selectedYear),
    ])


    const boysCount = genderCounts.find(count => count.gender === "Male")?.count || 0;
    const girlsCount = genderCounts.find(count => count.gender === "Female")?.count || 0;

    return (
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-3">

            <section className=" flex flex-col bg-Green text-white rounded-lg px-2 py-1">
                <div className="gap-4  flex flex-row justify-center items-center">
                <div>
                    <Image
                        src="/student_logo.png"
                        alt="student"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Total Students
                    </p>
                    <p className="font-bold text-2xl">
                        {totalStudents} 
                    </p>

                </div>
                </div>

                <Link
                    href="/ACCOUNTS/registrar/students"
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
                        src="/boy.png"
                        alt="boy"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Total Male
                    </p>
                    <p className="font-bold text-2xl">
                        {boysCount}
                    </p>

                </div>
                </div>

                <Link
                    href="/ACCOUNTS/registrar/students"
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
                        src="/girl.png"
                        alt="girl"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Total Female
                    </p>
                    <p className="font-bold text-2xl">
                        {girlsCount}
                    </p>

                </div>
                </div>

                <Link
                    href="/ACCOUNTS/registrar/students"
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
                        src="/enrollment.png"
                        alt="enrollment"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                       Pending Applicants
                    </p>
                    <p className="font-bold text-2xl">
                        {totalPendingApplicants}
                    </p>

                </div>
                </div>

                <Link
                    href="/ACCOUNTS/registrar/applicants"
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
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="xl:h-[40px] xl:w-[40px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Pending Admission
                    </p>
                    <p className="font-bold text-2xl">
                        {totalPendingAdmission}
                    </p>

                </div>
                </div>

                <Link
                    href="/ACCOUNTS/registrar/reserved  "
                >
                <p className="-mt-3 block text-end text-sm font-bold underline text-white transition-transform duration-150 active:scale-95 origin-right">
                    View All
                </p>
                </Link>
            </section>

        </div>
    );
};