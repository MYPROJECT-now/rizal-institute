import Image from "next/image";

export const Top_analytics = () => {
    return (
        <div className="grid grid-cols-1 gap-5 p-0 sm:grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-3">

            <div className="w-[176px] h-[66px] bg-Green text-white rounded-lg flex flex-row justify-center items-center p-2 gap-2 ">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold text-lg">
                       Enrollees
                    </p>
                    <p className="font-bold text-sm">
                        65
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
                        65
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
                        Total Reserved Fee Collected
                    </p>
                    <p className="font-bold text-sm">
                        4000
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