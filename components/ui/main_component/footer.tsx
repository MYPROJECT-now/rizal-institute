import Image from "next/image"; 
 
 const Footer = () => {
    return (
        <div className="bg-dGreen h-[400px] w-full flex flex-col items-center justify-center">
            <div className="flex flex-col text-center items-center justify-center gap-5">
                <p className="font-bold font-merriweather text-white text-2xl">
                    RIZAL INSTITUTE
                </p>
                <Image
                 src="/logo.png"
                 alt="logo"
                 width={150}
                 height={150}
                />
            </div>
            <div>

            </div>
        </div>
    );
};

export default Footer;