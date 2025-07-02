"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { StatusModal } from "@/components/landing_page_portal/status_modal/status_modal";
import { useShowStatusModal } from "@/src/store/LANDING_PAGE/landing_page";


export default function Home() {
  <StatusModal />
  const { open } = useShowStatusModal();
  return (
    <div className="w-full h-min-screen">

      {/* first section */}
      <div className="h-[600px] w-full relative flex items-center justify-center ">
      <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>

        <CarouselContent className="relative top-0 left-0">
          <CarouselItem className="h-[600px] w-full">
          <Image
            src="/bg_home.jpeg"
            alt="bg"
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="h-[600px] w-full">
          <Image
            src="/bg_home1.jpg"
            alt="bg"
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="h-[600px] w-full">
          <Image
            src="/bg_home7.jpg"
            alt="bg"
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="h-[600px] w-full">
          <Image
            src="/bg_home4.jpg"
            alt="bg"
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious   />
        <CarouselNext  />
      </Carousel>

       {/* shadow */}
       <div className="bg-black/40 h-[350px] w-full absolute" />   

        {/* main text */}
        <div className="absolute flex flex-col gap-7 sm:text-sm md:text-base lg:text-lg">
              <div className="flex flex-col gap-3">
                <p className="font-bold font-merriweather relative z-10 text-white text-center text-5xl">
                Proudly Rizalian, Ready for
                </p>
                <p className="font-bold font-merriweather relative z-10 text-white text-center text-5xl">
                the World!!
                </p>
              </div>

              <div className="flex flex-col-reverse items-center justify-center gap-4">
                <a href="/new_application">
                <Button
                variant="mainButton"
                className="rounded-xl lg:text-2xl lg:h-[55px] lg:w-[210px]">
                  <p className="font-oswald font-bold">
                    ENROLL NOW
                  </p>
                </Button>
                </a>

                <Button
                variant="subButton"
                onClick={open}
                className="rounded-xl sm:h-[100] lg:text-2xl lg:h-[55px] lg:w-[210px] ">
                  <p className="font-oswald font-bold text-xl">
                    TRACK APPLICATION
                  </p>
                </Button>
              </div>
            </div>
      </div>
       {/* end first section */}
      
       <div className="w-full">
        <Image
          src="/enrol.svg" 
          alt="Enrollment Banner"
          width={500}
          height={500} 
          className="w-full h-full"
          priority
        />
      </div>

      {/* second section */}
      <div className="w-full h-[250px] bg-sl2Green flex flex-col justify-center items-center gap-3">
        <p className="font-bold font-merriweather text-d2Green sm:text-sm md:text-base lg:text-2xl">
        WHY CHOOSE RIZAL INSTITUTE?
        </p>
        <div className="flex flex-col items-center sm:text-sm md:text-base lg:text-2xl ml-8">
          <ul className="font-light font-merriweather text-d2Green">
            <li className="list-disc">Experience the Rizalian advantage.</li><br></br>
           <li className="list-disc"> Develop your skills and talents in a nurturing environment.</li> <br></br>
           <li className="list-disc"> Become part of a community that values excellence and compassion.</li> <br></br>
          </ul>
        </div>
      </div>
      {/* end second section */}

      {/* third section w-[330px] h-[250px] bg-gradient-to-b from-g1 to-g2 rounded-[35px] p-4 flex flex-col gap-2 */} 
      <div className="w-full h-auto grid grid-row items-center justify-around gap-3 text-xs lg:text-lg bg-page">
        <br />
          <strong className="text-center text-d2Green font-merriweather">A Heritage of Excellence</strong>
          <em className="text-d2Green font-merriweather font-light text-center">Founded in 1949, 
            RI has a long-standing tradition of academic excellence and character development.</em>
        
          <br />
        <br />
          <strong className="text-center text-d2Green font-merriweather">Personalized Learning
          Environment</strong>
          <em className="text-d2Green font-merriweather font-light text-center">Our intimate setting allows our dedicated 
            faculty to provide individualized support, fostering a nurturing and encouraging atmosphere.</em>
           <br />
          <br />
          <strong className="text-center text-d2Green font-merriweather font-bold">Balanced Tradition and 
          Innovation</strong>
          <em className="text-d2Green font-merriweather font-light text-center">We honor our rich history while 
            integrating modern teaching methods and technology to prepare students for the challenges of tomorrow.</em>
        <br />
      </div>
      {/* end third section */}

      {/* fourth section */}
      <div className="h-[600px] w-full relative flex items-center justify-center">
        {/* background */}
        <Image
          src="/bf.jpeg"
          alt="baseball background"
          width={1000}
          height={1000}
          className="h-full w-full absolute top-0 left-0 object-cover blur-sm"
        />
       {/* shadow */}
       <div className="bg-black/40 h-[600px] w-full absolute top-100 left-0 " />

        

        {/* main text */}
        <div className="relative w-full h-[600px] flex flex-col text-center items-center justify-center gap-10">  
          {/* FIRST PART */}
          <p className="font-bold font-oswald text-4xl text-white lg:text-6xl ">
            Coming Soon: RI Baseball Program!
          </p>
           {/* SECOND PART */}
          <div className="grid grid-cols-2  mt-2 text-white lg:flex gap-2 text-base md:text-lg lg:text-2xl">
            <div className="flex flex-col items-center ">
              <Image
              src="/star.png"
              alt="star"
              width={120}
              height={120}
              className="w-[100px] h-[100px] "
              />
              <p className="font-bold font-sans items-center w-[200px] ">
              Pioneering Spirit
              </p>
            </div>
            <div className="flex flex-col items-center  ">
              <Image
              src="/dia.png"
              alt="diamond"
              width={120}
              height={120}
               className="w-[100px] h-[100px]"
              />
              <p className="font-bold font-sans items-center w-[200px]">
              Prime Location
              </p>
            </div>
            <div className="flex flex-col items-center  ">
              <Image
              src="/com.png"
              alt="community"
              width={120}
              height={120}
               className="w-[100px] h-[100px] "
              />
              <p className="font-bold font-sans items-center w-[200px]">
              Community Building
              </p>
            </div>

            <div className="flex flex-col items-center  ">
              <Image
              src="/chart.png"
              alt="cahrt"
              width={120}
              height={120}
               className="w-[100px] h-[100px]"
              />
              <p className="font-bold font-sans items-center w-[200px]">
              Future Growth
              </p>
            </div>
          </div>
          
        
         {/* THIRD PART */}
         <a href="/new_application">
          <Button
            variant="mainButton"
            className="rounded-xl lg:text-2xl lg:h-[55px] lg:w-[210px]">
              <p className="font-oswald font-bold ">
                ENROLL NOW!
              </p>
          </Button>
          </a>
          
        </div>
      </div>
       {/* end of fourth section */}


    </div>
  );
}
