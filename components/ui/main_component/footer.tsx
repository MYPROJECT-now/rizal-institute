// import Image from "next/image"; 
 
//  const Footer = () => {
//     return (
//         <div className="bg-dGreen h-[400px] w-full flex flex-col items-center justify-center">
//             <div className="flex flex-col text-center items-center justify-center gap-5">
//                 <p className="font-bold font-merriweather text-white text-2xl">
//                     RIZAL INSTITUTE
//                 </p>
//                 <Image
//                  src="/logo.png"
//                  alt="logo"
//                  width={150}
//                  height={150}
//                 />
//             </div>
//             <div>

//             </div>
//         </div>
//     );
// };

// export default Footer;

import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-dGreen w-full  flex flex-col lg:flex lg:flex-row justify-around items-center p-10 text-white">
      {/* Left section: Logo and title */}
      <div className="flex flex-col items-center gap-4">
        <p className="font-bold font-merriweather text-2xl">RIZAL INSTITUTE</p>
        <Image
          src="/logo.png" // School logo
          alt="Rizal Institute Logo"
          width={150}
          height={150}
          className="hidden md:block"
        />
      </div>

      {/* Right section: Contact details */}
      <div className="flex flex-col gap-4 mt-8 md:mt-0">
        <div className="flex items-center gap-3">
          <Image src="/loc.png" alt="Location" width={24} height={24} />
          <p className="text-sm md:text-base">
            Bo. Canlubang, Canlubang, Calamba,<br />
            Philippines, 4028
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Image src="/mail.png" alt="Email" width={24} height={24} />
          <div className="flex flex-col text-sm md:text-base">
            <a href="mailto:registrar@rizalinstitute.edu.ph" className="underline">
              registrar@rizalinstitute.edu.ph
            </a>
            <a href="mailto:rizalinstitute@yahoo.com" className="underline">
              rizalinstitute@yahoo.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Image src="/phone.png" alt="Phone" width={24} height={24} />
          <p className="text-sm md:text-base">0917-5497358</p>
        </div>

        <div className="flex items-center gap-3">
          <Image src="/fb.png" alt="Facebook" width={24} height={24} />
          <p className="text-sm md:text-base">Rizal Institute – Canlubang</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
