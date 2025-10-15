import Image from "next/image";
import { getTotalStudents, getGenderCounts, getTotalPendingApplicants, getTotalPendingAdmission } from "@/src/actions/registrarAction";
import { getSelectedYear } from "@/src/actions/utils/getSelectedYear";
import { toast } from "sonner";

export const DocumentStatus = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return toast.error("No selectedacademic year.");

    const [totalStudents, genderCounts, ] = await Promise.all([
        getTotalStudents(selectedYear),
        getGenderCounts(selectedYear),
        getTotalPendingApplicants(selectedYear),
        getTotalPendingAdmission(selectedYear),
    ])


    const boysCount = genderCounts.find(count => count.gender === "Male")?.count || 0;
    const girlsCount = genderCounts.find(count => count.gender === "Female")?.count || 0;

    return (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">

            <section className=" py-2 gap-10 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Complete Documents
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalStudents} 
                    </p>
                </div>
                <div>
                    <Image
                        src="/done.png"
                        alt="done"
                        width={1000}
                        height={1000}
                        className="w-[40px] h-[40px] lg:block hidden"
                    />
                </div>
            </section>

            <section className=" py-2 gap-10 bg-yellow-500 text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Incomplete Documents
                    </p>
                    <p className="font-bold text-[15px]">
                        {boysCount}
                    </p>
                </div>
                <div>
                    <Image
                        src="/incom.png"
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="w-[40px] h-[40px] lg:block hidden"
                    />
                </div>
            </section>

            <section className=" py-2 gap-10 bg-red-600 text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        No Documents
                    </p>
                    <p className="font-bold text-[15px]">
                        {girlsCount}
                    </p>
                </div>
                <div>
                    <Image
                        src="/no.png"
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="w-[40px] h-[40px] lg:block hidden"
                     />
                </div>
            </section>

           
        </div>
    );
};