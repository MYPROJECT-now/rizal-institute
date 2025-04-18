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
import { useStatusModal } from "@/src/store/status_modal";
import { StatusModal } from "@/components/modals/status_modal";


export default function Home() {
  <StatusModal />
  const { open } = useStatusModal();
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
        <div className="absolute flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <p className="font-bold font-merriweather text-6xl relative z-10 text-white text-center">
                Proudly Rizalian, Ready for
                </p>
                <p className="font-bold font-merriweather text-6xl relative z-10 text-white text-center">
                the World!!
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <a href="/enrollment">
                <Button
                variant="mButton"
                className="h-[65px] w-[250px] rounded-2xl ">
                  <p className="font-oswald font-bold text-3xl">
                    ENROLL NOW!!
                  </p>
                </Button>
                </a>

                <Button
                variant="sButton"
                onClick={open}
                className="h-[55px] w-[210px] rounded-xl ">
                  <p className="font-oswald font-bold text-xl">
                    TRACK APPLICATION
                  </p>
                </Button>
              </div>
            </div>


       

      </div>
       {/* end first section */}

      {/* second section */}
      <div className="w-full h-[210px] bg-sl2Green flex flex-col justify-center text-center gap-3">
        <p className="font-bold font-merriweather text-d2Green text-4xl text-center">
        WHY CHOOSE RIZAL INSTITUTE?
        </p>
        <div>
          <p className="font-light font-merriweather text-d2Green text-2xl text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, modi nisi.  
          </p>
          <p className="font-light font-merriweather text-d2Green text-2xl text-center">
            Accusamus cumque quae exercitationem facilis, eum iste laborum nisi! 
          </p>
          <p className="font-light font-merriweather text-d2Green text-2xl text-center">
            Neque quibusdam dignissimos delectus nostrum unde eaque provident consequuntur corporis.
          </p>
        </div>
      </div>
      {/* end second section */}

      {/* third section */}
      <div className="w-full h-[415px] flex flex-row items-center justify-around gap-3">
        <div className="w-[330px] h-[250px] bg-gradient-to-b from-g1 to-g2 rounded-[35px] p-4 flex flex-col gap-2 text-lg " >
          <p className="text-center text-d2Green font-merriweather font-bold">A Heritage of Excellence</p>
          <hr />
          <p className="text-d2Green font-merriweather font-light ">Founded in 1949, RI has a long-standing tradition of academic excellence and character development.</p>
        </div>

        <div className="w-[330px] h-[250px] bg-gradient-to-b from-g1 to-g2 rounded-[35px] p-4 flex flex-col gap-2 text-lg " >
          <p className="text-center text-d2Green font-merriweather font-bold">Personalized Learning
          Environment</p>
          <hr />
          <p className="text-d2Green font-merriweather font-light ">Our intimate setting allows our dedicated faculty to provide individualized support, fostering a nurturing and encouraging atmosphere.</p>
        </div>

        <div className="w-[330px] h-[250px] bg-gradient-to-b from-g1 to-g2 rounded-[35px] p-4 flex flex-col gap-2 text-lg " >
          <p className="text-center text-d2Green font-merriweather font-bold">Balanced Tradition and 
          Innovation</p>
          <hr />
          <p className="text-d2Green font-merriweather font-light ">We honor our rich history while integrating modern teaching methods and technology to prepare students for the challenges of tomorrow.</p>
        </div>
      </div>
      {/* end third section */}

      {/* fourth section */}
      <div className="h-[600px] w-full relative flex items-center">
        {/* background */}
        <Image
          src="/bf.jpeg"
          alt="baseball background"
          width={1000}
          height={1000}
          className="h-full w-full absolute top-0 left-0 object-cover"
        />
       {/* shadow */}
       <div className="bg-black/40 h-[300px] w-full absolute top-100 left-0 " />

        

        {/* main text */}
        <div className="relative w-full h-fulll text-center items-center justify-center z-9 flex flex-col gap-10 te">  
          {/* FIRST PART */}
          <p className="font-bold font-oswald text-6xl text-white">
            Coming Soon: RI Baseball Program!
          </p>
           {/* SECOND PART */}
          <div className="flex flex-row w-full h-[250px] items-center justify-evenly text-center text-white">
            <div className="flex flex-col items-center h-[200px] bg-black/20">
              <Image
              src="/star.png"
              alt="star"
              width={120}
              height={120}
              className="w-[120px] h-[120px] "
              />
              <p className="font-bold font-sans text-3xl w-[200px] ">
              Pioneering Spirit
              </p>
            </div>
            <div className="flex flex-col items-center  h-[200px] bg-black/20">
              <Image
              src="/dia.png"
              alt="diamond"
              width={120}
              height={120}
               className="w-[120px] h-[120px]"
              />
              <p className="font-bold font-sans text-3xl w-[200px] bg-black/20">
              Prime Location
              </p>
            </div>
            <div className="flex flex-col items-center  h-[200px] bg-black/20">
              <Image
              src="/com.png"
              alt="community"
              width={120}
              height={120}
               className="w-[120px] h-[120px]  object-contain"
              />
              <p className="font-bold font-sans text-3xl w-[200px]">
              Community Building
              </p>
            </div>

            <div className="flex flex-col items-center  h-[200px] bg-black/20">
              <Image
              src="/chart.png"
              alt="cahrt"
              width={120}
              height={120}
               className="w-[120px] h-[120px]"
              />
              <p className="font-bold font-sans text-3xl w-[200px]">
              Prime Location
              </p>
            </div>

          </div>
        
         {/* THIRD PART */}
         <a href="/enrollment">
          <Button
            variant="mButton"
            className="h-[65px] w-[250px] rounded-2xl ">
              <p className="font-oswald font-bold text-3xl">
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
