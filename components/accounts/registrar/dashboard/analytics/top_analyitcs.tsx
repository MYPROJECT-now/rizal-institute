import Image from "next/image";
import { getTotalStudents, getGenderCounts, getTotalApplicants, getTotalReserved } from "@/src/actions/registrarAction";

export const Top_analytics = async () => {
    const totalStudents = await getTotalStudents();
    const genderCounts = await getGenderCounts();
    const totalApplicants = await getTotalApplicants();
    const totalReserved = await getTotalReserved();

    const boysCount = genderCounts.find(count => count.gender === "Male")?.count || 0;
    const girlsCount = genderCounts.find(count => count.gender === "Female")?.count || 0;

    return (
        <div className="flex flex-row gap-9">
            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[16px]">
                        Total Students
                    </p>
                    <p className="font-bold text-sm">
                        {totalStudents}
                    </p>
                </div>
                <div>
                    <Image
                        src="/cup.png"
                        alt="cup"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-lg">
                        Total Boys
                    </p>
                    <p className="font-bold text-sm">
                        {boysCount}
                    </p>
                </div>
                <div>
                    <Image
                        src="/boys.png"
                        alt="cup"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-lg">
                        Total Girls
                    </p>
                    <p className="font-bold text-sm">
                        {girlsCount}
                    </p>
                </div>
                <div>
                    <Image
                        src="/girls.png"
                        alt="cup"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-lg">
                       Applicants
                    </p>
                    <p className="font-bold text-sm">
                        {totalApplicants}
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
                        {totalReserved}
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
        </div>
    );
};