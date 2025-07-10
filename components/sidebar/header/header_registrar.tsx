
import { Profile_registrar } from "../../profile/profile_registrar";
const Registrar_header = () => {

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',   // Day of the week (e.g., Monday)
        year: 'numeric',   // Full year (e.g., 2024)
        month: 'long',     // Full month (e.g., October)
        day: 'numeric',     // Day of the month (e.g., 8)
      });
      

    return (
        <div className="flex flex-row items-center justify-between h-[60px] mt-4">
            <div className="flex flex-col">
                <p className=" font-Alfa text-lGreen text-2xl">
                    RIZAL INSTITUTE
                </p>
                <p className="font-mono text-xs text-green-500">
                    {currentDate}
                </p>
            </div>
            <div className="flex flex-row items-center gap-6">
                <p className="font-Alfa text-lGreen text-2xl">
                    REGISTRAR
                </p>
                {/* <Image
                src="/profile.png"
                alt="profile"
                width={100}
                height={100}
                className="bg-blue-400 h-[40px] w-[40px] rounded-full object-fill"
                /> */}
                <Profile_registrar />
            </div>
        </div>
    );
};

export default Registrar_header;