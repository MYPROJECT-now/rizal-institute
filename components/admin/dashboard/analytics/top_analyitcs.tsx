import Image from "next/image";

export const Top_analytics = () => {
    return (
        <div className="grid grid-cols-1 gap-5 p-0 sm:grid-cols-2 grid-rows-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-lg">
                       Total Cashier
                    </p>
                    <p className="font-bold text-[16px]">
                        5
                    </p>
                </div>
                <div>
                    <Image
                        src="/cashier.png"
                        alt="cashier"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[16px]">
                        Total Registrar
                    </p>
                    <p className="font-bold text-sm">
                        3
                    </p>
                </div>
                <div>
                    <Image
                        src="/reg.png"
                        alt="Registrar"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[16px]">
                        Active Users
                    </p>
                    <p className="font-bold text-sm">
                        20
                    </p>
                </div>
                <div>
                    <Image
                        src="/user.png"
                        alt="Registrar"
                        width={40}
                        height={40}
                    />
                </div>
            </div>

            <div className="w-[220px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-[16px]">
                        Enrollment Status
                    </p>
                    <p className="font-bold text-sm">
                        Ongoing
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