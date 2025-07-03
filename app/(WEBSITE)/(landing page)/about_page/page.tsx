"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
  

const AboutPage = () => {
    return (
        <div className=" w-full h-min-screen ">
            <div className="h-[600px] w-full relative flex items-center justify-center  ">
            <Carousel
             opts={{
                align: "start",
                loop: true,
              }}
              
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              >

            <CarouselContent className="relative top-0 left-0 ">
                <CarouselItem className="h-[600px] w-full">
                    <Image
                    src="/bg_home12.jpg"
                    alt="school photo"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover"
                    />
                </CarouselItem>
                <CarouselItem className="h-[600px] w-full">
                    <Image
                    src="/ri_croppedbg6.png"
                    alt="school photo"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover"
                    />
                </CarouselItem>
                <CarouselItem className="h-[600px] w-full">
                    <Image
                    src="/ri_bg4.png"
                    alt="school photo"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                    />
                </CarouselItem>
                <CarouselItem className="h-[600px] w-full">
                    <Image
                    src="/bg_home11.jpg"
                    alt="school photo"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                    />
                </CarouselItem>
                <CarouselItem className="h-[600px] w-full">
                    <Image
                    src="/bg_home10.jpg"
                    alt="school photo"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                    />
                </CarouselItem>
                
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
            </div>

            <div className="flex flex-row items-center justify-around text-center w-full h-[600px] bg-green-300/30 ">
                <div className="flex flex-col gap-10 ">
                    <div>
                        <p className="font-bold font-merriweather text-d2Green text-xl lg:text-2xl">
                            ABOUT RIZAL INSTITUTE
                        </p>
                    </div>
                    <div className="font-light font-merriweather text-justify px-10 w-auto lg:w-[500px] sm:text-sm md:text-base lg:text-lg">
                        Rizal Institute is a premier educational institution 
                        that offers quality education to students of all ages. 
                        We provide a safe and supportive learning environment 
                        that fosters the intellectual, emotional, and social 
                        development of our students. Our faculty and staff are 
                        dedicated professionals who are passionate about teaching 
                        and learning. We are located in a safe and convenient 
                        location, with easy access to public transportation.
                    </div>
                </div>

                <div>
                    <Image
                        src="/map.png"
                        alt="map"
                        width={650}
                        height={650}
                        className="hidden lg:block"
                    />
                </div>
            </div>

            <div className="py-16 px-8 bg-white text-justify">
                <h2 className="text-center font-bold font-merriweather text-4xl text-d2Green mb-12">
                    RIZAL INSTITUTE MISSION AND VISION
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    <div className="bg-green-100/50 p-8 rounded-lg shadow-md">
                        <h3 className="font-bold font-merriweather text-2xl text-d2Green mb-4">
                            VISION
                        </h3>
                        <p className="font-merriweather text-lg">
                            Rizal Institute Canlubang Foundation, Inc. aims to be a leading 21st Century learning
                            institution, ensuring that its completers possess the knowledge, skills, and values
                            needed to thrive in a competitive, interconnected, and rapidly changing world.
                        </p>
                    </div>
                    
                    <div className="bg-green-100/50 p-8 rounded-lg shadow-md">
                        <h3 className="font-bold font-merriweather text-2xl text-d2Green mb-4">
                            MISSION
                        </h3>
                        <p className="font-merriweather text-lg">
                            Rizal Institute Canlubang Foundation, Inc. aims to transform the lives of our students
                            by providing quality secondary education. We focus on instilling 21st Century skills and
                            imparting ethical values that empower students to realize their full potential and become
                            productive global citizens.
                        </p>
                    </div>
                </div>
                
                <h3 className="text-center font-bold font-merriweather text-3xl text-d2Green mb-8">
                    CORE VALUES
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-100/50 p-6 rounded-lg shadow-md text-center">
                        <div className="bg-d2Green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">1</span>
                        </div>
                        <h4 className="font-bold font-merriweather text-xl text-d2Green mb-3">
                            EXCELLENCE
                        </h4>
                        <p className="font-merriweather text-justify">
                            We strive for the highest standards in academic achievement and personal development, 
                            encouraging continuous improvement and dedication to learning.
                        </p>
                    </div>
                    
                    <div className="bg-green-100/50 p-6 rounded-lg shadow-md text-center">
                        <div className="bg-d2Green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">2</span>
                        </div>
                        <h4 className="font-bold font-merriweather text-xl text-d2Green mb-3">
                            INTEGRITY
                        </h4>
                        <p className="font-merriweather text-justify">
                            We uphold honesty, transparency, and ethical behavior in all our actions, 
                            fostering a culture of trust and respect within our community.
                        </p>
                    </div>
                    
                    <div className="bg-green-100/50 p-6 rounded-lg shadow-md text-center">
                        <div className="bg-d2Green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">3</span>
                        </div>
                        <h4 className="font-bold font-merriweather text-xl text-d2Green mb-3">
                            SPIRITUALITY
                        </h4>
                        <p className="font-merriweather text-justify">
                            We nurture spiritual growth and values, encouraging students to develop 
                            a strong moral compass and a deeper understanding of their purpose 
                            while respecting diverse beliefs and traditions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
