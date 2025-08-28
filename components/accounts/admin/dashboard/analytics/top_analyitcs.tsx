import { getEnrollmentStatus, getTotalAdmin, getTotalRegistrar, getTotalTeacher, getTTotalCashier } from "@/src/actions/adminAction";//
import Image from "next/image";

export const Top_analytics = async () => {

    const totalCashier = await getTTotalCashier();
    const totalRegistrar = await getTotalRegistrar();
    const totalTeacher = await getTotalTeacher();
    const totalAdmin = await getTotalAdmin();
    const enrollment = await getEnrollmentStatus();
    return (
        <div className="flex flex-row gap-9">

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[15px]">
                       Total Cashier
                    </p>
                    <p className="font-bold text-[16px]">
                        {totalCashier}
                    </p>
                </div>
                <div>
                    <Image
                        src="/cashier.png"
                        alt="cashier"
                        width={30}
                        height={30}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[15px]">
                        Total Registrar
                    </p>
                    <p className="font-bold text-sm">
                        {totalRegistrar}
                    </p>
                </div>
                <div>
                    <Image
                        src="/registrar.png"
                        alt="Registrar"
                        width={30}
                        height={30}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[15px]">
                        Total Teacher
                    </p>
                    <p className="font-bold text-sm">
                        {totalTeacher}
                    </p>
                </div>
                <div>
                    <Image
                        src="/teacher.png"
                        alt="Registrar"
                         width={30}
                        height={30}
                    />
                </div>
            </div>   

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[15px]">
                        Total Admin
                    </p>
                    <p className="font-bold text-sm">
                        {totalAdmin}
                    </p>
                </div>
                <div>
                    <Image
                        src="/admin.png"
                        alt="Registrar"
                        width={30}
                        height={30}
                    />
                </div>
            </div>                        


            <div className="w-[220px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[15px]">
                        Enrollment Status
                    </p>
                    <p className="font-bold text-sm">
                        {enrollment[0].enrollmentStatus === true ? "Ongoing" : "Close"}
                    </p>
                </div>
                <div>
                    <Image
                        src="/cup.png"
                        alt="Registrar"
                        width={40}
                        height={40}
                    />
                </div>
            </div>


        </div>
    );
};