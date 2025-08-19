// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import Autoplay from "embla-carousel-autoplay"
// import { useShowStatusModal } from "@/src/store/LANDING_PAGE/landing_page";
// import { StatusModal } from "@/components/landing_page/landing_page_portal/status_modal/status_modal";
// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";


// export default  function Home() {
//   <StatusModal />
//   const { open } = useShowStatusModal();
//   const [isActive, setIsActive] = useState<boolean | null>(null);
//   const [noticeData, setNoticeData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const fetchStatus = async () => {
//       const res = await fetch("/api/enrollment_status");
//       const data = await res.json();
//       setIsActive(data.isActive);
//     };
//     fetchStatus();
//   }, []);


// useEffect(() => {
//   const fetchNotice = async () => {
//     try {
//       const res = await fetch("/api/notice2");
//       const data = await res.json();
//       setNoticeData(data);
//     } catch (err) {
//       console.error("Failed to fetch notice", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchNotice();
// }, []);




//   return (
//     <div className="w-full h-full">

//       {/* first section */}
//       <div className="xl:h-[700px] sm:h-[550px] h-[400px] w-full relative flex items-center justify-center ">
//       <Carousel
//       opts={{
//         align: "start",
//         loop: true,
//       }}
      
//       plugins={[
//         Autoplay({
//           delay: 4000,
//         }),
//       ]}>

//         <CarouselContent className="relative top-0 left-0">
//           <CarouselItem className="xl:h-[700px] sm:h-[550px] h-[400px] w-full">
//           <Image
//             src="/bg_home.jpeg"
//             alt="bg"
//             width={1000}
//             height={1000}
//             className="h-full w-full object-cover"
//             />
//           </CarouselItem>
//           <CarouselItem className="xl:h-[700px] sm:h-[550px] h-[400px] w-full">
//           <Image
//             src="/bg_home1.jpg"
//             alt="bg"
//             width={1000}
//             height={1000}
//             className="h-full w-full object-cover"
//             />
//           </CarouselItem>
//           <CarouselItem className="xl:h-[700px] sm:h-[550px] h-[400px] w-full">
//           <Image
//             src="/bg_home7.jpg"
//             alt="bg"
//             width={1000}
//             height={1000}
//             className="h-full w-full object-cover"
//             />
//           </CarouselItem>
//           <CarouselItem className="xl:h-[700px] sm:h-[550px] h-[400px] w-full">
//           <Image
//             src="/bg_home4.jpg"
//             alt="bg"
//             width={1000}
//             height={1000}
//             className="h-full w-full object-cover"
//             />
//           </CarouselItem>
//         </CarouselContent>
//         <CarouselPrevious   />
//         <CarouselNext  />
//       </Carousel>

//        {/* shadow */}
//        <div className="bg-black/40 lg:h-[350px] h-[280px] w-full absolute" />   

//         {/* main text */}
//         <div className="absolute flex flex-col gap-7 sm:text-sm md:text-base lg:text-lg">
//               <div className="flex flex-col gap-3">
//                 <p className="font-bold font-merriweather relative z-10 text-white text-center xl:text-5xl text-2xl">
//                 Proudly Rizalian, Ready for
//                 </p>
//                 <p className="font-bold font-merriweather relative z-10 text-white text-center xl:text-5xl text-2xl">
//                 the World!!
//                 </p>
//               </div>

//               <div className="flex flex-col-reverse items-center justify-center gap-4">
//                 <a href="/application">
//                 <Button
//                 variant="mainButton"
//                 className="rounded-xl lg:text-2xl lg:h-[55px] lg:w-[210px]">
//                   <p className="font-oswald font-bold">
//                     ENROLL NOW
//                   </p>
//                 </Button>
//                 </a>

//                 <Button
//                 variant="subButton"
//                 onClick={open}
//                 className="rounded-xl sm:h-[100] lg:text-2xl lg:h-[55px] lg:w-[210px] ">
//                   <p className="font-oswald font-bold text-xl">
//                     TRACK APPLICATION
//                   </p>
//                 </Button>
//               </div>
//             </div>
//       </div>
//        {/* end first section */}

// <div className="w-full flex flex-col items-center justify-center text-center">

//   <div className="w-full lg:py-6 py-2 bg-lGreen flex flex-col items-center justify-center text-center">
//     <Image 
//       src="/logo.png"
//       alt="logo"
//       width={1000}
//       height={1000}
//       className="lg:w lg:h-20 sm:w-[60px] sm:h-[60px] w-[40px] h-[40px]"
//     />
//     <p className="mt-3 lg:text-3xl sm:text-2xl font-extrabold text-white text-oswald">
//       Rizal Institute
//     </p>
//     <p className="lg:text-lg sm:text-sm text-white font-oswald font-semibold">
//       Canlubang Foundation INC.
//     </p>
//   </div>


//   <div className="mt-2">
//     <p className="lg:text-4xl text-2xl  text-oswald text-black/80 font-extrabold uppercase">
//       Enrollment
//     </p>
//     <p className="lg:text-xl text-sm font-semibold text-black/50 mt-1">
//       For Junior High School
//     </p>

//     {/* Officially Open Card */}
//     {/* <div className="mt-6 bg-white shadow-2xl rounded-2xl px-10 py-8 border border-green-700 inline-block">
//       <p className="text-green-700 font-extrabold text-4xl font-merriweather uppercase">
//         Officially Open
//       </p>
//       <p className="text-black/80 font-semibold text-xl mt-3 font-oswald">
//         SY 2025 – 2026
//       </p>
//       <span> aug, 2 - oct, 31</span>
//     </div> */}

// <div className="w-full mt-6 bg-white shadow-2xl rounded-2xl lg:px-10 px-5 lg:py-8 py-4 border border-green-700 inline-block">
//   {loading ? (
//     <div >
//       <Loader2 className="h-8 w-8 animate-spin text-green-700" />
//     </div>
//   ) : noticeData ? (
//     <>
//       <p className="text-green-700 font-extrabold lg:text-4xl text-2xl font-merriweather uppercase">
//         {noticeData.isActive === true ? "Officially Open" : "Closed"}
//       </p>
//       <p className="text-black/80 font-semibold lg:text-xl text-lg mt-3 font-oswald">
//         {noticeData?.enrollment_period || "ss"}
//       </p>
//       {/* <span>
//         {noticeData?.enrollment_start_date || "ss"}
//         -
//         {noticeData?.enrollment_end_date || "ss"}
//       </span> */}

//       <span className="lg:text-lg text-sm">
//         {noticeData
//           ? new Date(noticeData.enrollment_start_date).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })
//           : "ss"}
//         {" - "}
//         {noticeData
//           ? new Date(noticeData.enrollment_end_date).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })
//           : "ss"}
//       </span>

//     </>
//   ) : (
//     <p className="text-red-600 font-bold">Failed to load</p>
//   )}
// </div>

  
//   </div>

//   {/* Bottom Banner */}
//   <div className="w-full">
//     <Image
//       src="/bottom.svg" 
//       alt="Enrollment Banner"
//       width={500}
//       height={500} 
//       className="w-full h-full lg:-mt-[70px] -mt-[50px]"
//       priority
//     />
//   </div>
// </div>


        

// {/* second section */}
// <div className="w-full py-16 px-8 flex flex-col items-center">

//   <h3 className="text-center font-bold font-merriweather lg:text-3xl text-xl text-d2Green mb-12">
//     WHY CHOOSE RIZAL INSTITUTE?
//   </h3>

//   <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">

//     {/* Card 1 */}
//     <div className="bg-green-100/50 lg:p-8 p-4 rounded-2xl shadow-md text-center flex flex-col items-cente justify-center">
//       <h4 className="font-bold font-merriweather lg:text-xl text-sm text-d2Green mb-3">
//         Experience the Rizalian advantage.
//       </h4>
//     </div>

//     {/* Card 2 */}
//     <div className="bg-green-100/50 lg:p-8 p-4 rounded-2xl shadow-md text-center flex flex-col items-center justify-center">
//       <h4 className="font-bold font-merriweather lg:text-xl text-sm text-d2Green mb-3">
//         Develop your skills and talents in a nurturing environment.
//       </h4>
//     </div>

//     {/* Card 3 */}
//     <div className="bg-green-100/50 lg:p-8 p-4 rounded-2xl shadow-md text-center flex flex-col items-center justify-center">
//       <h4 className="font-bold font-merriweather lg:text-xl text-sm text-d2Green mb-3">
//         Become part of a community that values excellence and compassion.
//       </h4>
//     </div>

//   </div>
// </div>
// {/* end second section */}



//   {/* third section */}
//   <div className="w-full py-16 px-8 flex flex-col items-center">

//     <h3 className="text-center font-bold font-merriweather lg:text-3xl text-xl text-d2Green mb-12">
//       CORE ADVANTAGE
//     </h3>

//     <div className="grid lg:grid-cols-1 md:grid-cols-3 grid-cols-1 gap-10 max-w-6xl">

//       {/* Card 1 */}
//       <div className="bg-green-100/50 p-8 rounded-2xl shadow-md text-center flex flex-col items-center">
//         <div className="bg-d2Green rounded-full lg:w-16 lg:h-16 w-12 h-12 flex items-center justify-center mx-auto mb-4">
//           <span className="text-white lg:text-2xl text-xl font-bold">1</span>
//         </div>
//         <h4 className="font-bold font-merriweather lg:text-xl text-[16px] text-d2Green mb-3">
//           A Heritage of Excellence
//         </h4>
//         <p className="font-merriweather text-justify lg:text-lg text-sm">
//           Founded in 1949, RI has a long-standing tradition of academic excellence 
//           and character development.
//         </p>
//       </div>

//       {/* Card 2 */}
//       <div className="bg-green-100/50 p-8 rounded-2xl shadow-md text-center flex flex-col items-center">
//         <div className="bg-d2Green rounded-full lg:w-16 lg:h-16 w-12 h-12 flex items-center justify-center mx-auto mb-4">
//           <span className="text-white lg:text-2xl text-xl font-bold">2</span>
//         </div>
//         <h4 className="font-bold font-merriweather lg:text-xl text-[16px] text-d2Green mb-3">
//           Personalized Learning Environment
//         </h4>
//         <p className="font-merriweather text-justify lg:text-lg text-sm">
//           Our intimate setting allows our dedicated faculty to provide individualized 
//           support, fostering a nurturing and encouraging atmosphere.
//         </p>
//       </div>

//       {/* Card 3 */}
//       <div className="bg-green-100/50 p-8 rounded-2xl shadow-md text-center flex flex-col items-center">
//         <div className="bg-d2Green rounded-full lg:w-16 lg:h-16 w-12 h-12 flex items-center justify-center mx-auto mb-4">
//           <span className="text-white lg:text-2xl text-xl font-bold">3</span>
//         </div>
//         <h4 className="font-bold font-merriweather lg:text-xl text-[16px] text-d2Green mb-3">
//           Balanced Tradition and Innovation
//         </h4>
//         <p className="font-merriweather text-justify lg:text-lg text-sm">
//           We honor our rich history while integrating modern teaching methods 
//           and technology to prepare students for the challenges of tomorrow.
//         </p>
//       </div>

//     </div>
//   </div>
//   {/* end third section */}




//       {/* fourth section */}
//       <div className="h-[600px] w-full relative flex items-center justify-center">
//         {/* background */}
//         <Image
//           src="/bf.jpeg"
//           alt="baseball background"
//           width={1000}
//           height={1000}
//           className="h-full w-full absolute top-0 left-0 object-cover blur-sm"
//         />
//        {/* shadow */}
//        <div className="bg-black/40 h-[600px] w-full absolute top-100 left-0 " />

        

//         {/* main text */}
//         <div className="relative w-full h-[600px] flex flex-col text-center items-center justify-center gap-10">  
//           {/* FIRST PART */}
//           <p className="font-bold font-oswald text-4xl text-white lg:text-6xl ">
//             Experience the RI Baseball Program
//           </p>
//            {/* SECOND PART */}
//           <div className="grid grid-cols-2  mt-2 text-white lg:flex gap-2 text-base md:text-lg lg:text-2xl">
//             <div className="flex flex-col items-center ">
//               <Image
//               src="/star.png"
//               alt="star"
//               width={120}
//               height={120}
//               className="w-[100px] h-[100px] "
//               />
//               <p className="font-bold font-sans items-center w-[200px] ">
//               Pioneering Spirit
//               </p>
//             </div>
//             <div className="flex flex-col items-center  ">
//               <Image
//               src="/dia.png"
//               alt="diamond"
//               width={120}
//               height={120}
//                className="w-[100px] h-[100px]"
//               />
//               <p className="font-bold font-sans items-center w-[200px]">
//               Prime Location
//               </p>
//             </div>
//             <div className="flex flex-col items-center  ">
//               <Image
//               src="/com.png"
//               alt="community"
//               width={120}
//               height={120}
//                className="w-[100px] h-[100px] "
//               />
//               <p className="font-bold font-sans items-center w-[200px]">
//               Community Building
//               </p>
//             </div>

//             <div className="flex flex-col items-center  ">
//               <Image
//               src="/chart.png"
//               alt="cahrt"
//               width={120}
//               height={120}
//                className="w-[100px] h-[100px]"
//               />
//               <p className="font-bold font-sans items-center w-[200px]">
//               Future Growth
//               </p>
//             </div>
//           </div>
          
        
//          {/* THIRD PART */}
//          <a href="/application">
//           <Button
//             variant="mainButton"
//             className="rounded-xl lg:text-2xl lg:h-[55px] lg:w-[210px]">
//               <p className="font-oswald font-bold ">
//                 ENROLL NOW!
//               </p>
//           </Button>
//           </a>
          
//         </div>
//       </div>
//        {/* end of fourth section */}


//     </div>
//   );
// }
