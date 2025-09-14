import Image from "next/image";
import { getTotalStudents, getGenderCounts, getTotalApplicants, getTotalReserved } from "@/src/actions/registrarAction";
import { getSelectedYear } from "@/src/actions/utils/getSelectedYear";
import { toast } from "sonner";

export const Top_analytics = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return toast.error("No selectedacademic year.");

    const [totalStudents, genderCounts, totalApplicants, totalReserved] = await Promise.all([
        getTotalStudents(selectedYear),
        getGenderCounts(selectedYear),
        getTotalApplicants(selectedYear),
        getTotalReserved(selectedYear),
    ])
    // const totalStudents = await getTotalStudents();
    // const genderCounts = await getGenderCounts();   
    // const totalApplicants = await getTotalApplicants();
    // const totalReserved = await getTotalReserved();

    const boysCount = genderCounts.find(count => count.gender === "Male")?.count || 0;
    const girlsCount = genderCounts.find(count => count.gender === "Female")?.count || 0;

    return (
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-3">

            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Total Students
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalStudents} 
                    </p>
                </div>
                <div>
                    <Image
                        src="/cup.png"
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
                        Total Boys
                    </p>
                    <p className="font-bold text-[15px]">
                        {boysCount}
                    </p>
                </div>
                <div>
                    <Image
                        src="/boys.png"
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
                        Total Girls
                    </p>
                    <p className="font-bold text-[15px]">
                        {girlsCount}
                    </p>
                </div>
                <div>
                    <Image
                        src="/girls.png"
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
                       Applicants
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalApplicants}
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
                        Reserved Slot
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalReserved}
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