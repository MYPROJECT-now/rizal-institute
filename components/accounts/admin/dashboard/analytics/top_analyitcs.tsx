import { getEnrollmentStatus, getTotalAdmin, getTotalRegistrar, getTotalTeacher, getTTotalCashier } from "@/src/actions/adminAction";//
import Image from "next/image";

export const Top_analytics = async () => {

    const totalCashier = await getTTotalCashier();
    const totalRegistrar = await getTotalRegistrar();
    const totalTeacher = await getTotalTeacher();
    const totalAdmin = await getTotalAdmin();
    const enrollment = await getEnrollmentStatus();
    return (
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-3">
            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                       Total Cashier
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalCashier}
                    </p>
                </div>
                <div>
                    <Image
                        src="/cashier.png"
                        alt="cashier"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>

            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Total Registrar
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalRegistrar}
                    </p>
                </div>
                <div>
                    <Image
                        src="/registrar.png"
                        alt="Registrar"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>

            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Total Teacher
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalTeacher}
                    </p>
                </div>
                <div>
                    <Image
                        src="/teacher.png"
                        alt="Registrar"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>   

            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Total Admin
                    </p>
                    <p className="font-bold text-[15px]">
                        {totalAdmin}
                    </p>
                </div>
                <div>
                    <Image
                        src="/admin.png"
                        alt="Registrar"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>                        


            <div className=" py-2 gap-2 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Enrollment Status
                    </p>
                    <p className="font-bold text-[15px]">
                        {enrollment.length > 0  ? enrollment[0].enrollmentStatus ? "Ongoing"  : "Close" : "Not Set"}
                    </p>                    
                </div>
                <div>
                    <Image
                        src="/cup.png"
                        alt="Registrar"
                        width={1000}
                        height={1000}
                        className="xl:h-[30px] xl:w-[30px] lg:w-[25px] lg:h-[25px] lg:block hidden"
                    />
                </div>
            </div>


        </div>
    );
};