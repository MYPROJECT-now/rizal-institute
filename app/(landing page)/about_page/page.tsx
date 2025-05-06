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
        <div className="flex flex-col w-full h-full">
            <div className="h-[535px] w-full ">
            <Carousel
             opts={{
                align: "start",
                loop: true,
              }}
              
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              >

            <CarouselContent>
                <CarouselItem className="h-[535px] w-full">
                    <Image
                    src="/school.jpeg"
                    alt="school photo"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover"
                    />
                </CarouselItem>
                <CarouselItem className="h-[535px] w-full">
                    <Image
                    src="/bg_home6.jpg"
                    alt="school photo"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-fill"
                    />
                </CarouselItem>
                <CarouselItem className="h-[535px] w-full">
                    <Image
                    src="/bg_home9.jpg"
                    alt="school photo"
                    width={800}
                    height={800}
                    className="h-full w-full object-fill"
                    />
                </CarouselItem>
                <CarouselItem className="h-[535px] w-full">
                    <Image
                    src="/bg_home11.jpg"
                    alt="school photo"
                    width={800}
                    height={800}
                    className="h-full w-full object-fill"
                    />
                </CarouselItem>
                <CarouselItem className="h-[535px] w-full">
                    <Image
                    src="/bg_home10.jpg"
                    alt="school photo"
                    width={800}
                    height={800}
                    className="h-full w-full object-fill"
                    />
                </CarouselItem>
                <CarouselItem className="h-[535px] w-full">
                    <Image
                    src="/bg_home12.jpg"
                    alt="school photo"
                    width={800}
                    height={800}
                    className="h-full w-full object-fill"
                    />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
            </div>

            <div className="flex flex-row items-center justify-around text-center w-full h-[600px] bg-green-300/30">
                <div className="flex flex-col gap-10 ">
                    <div>
                        <p className="font-bold font-merriweather text-4xl text-d2Green ">
                            ABOUT RIZAL 
                        </p>
                        <p className="font-bold font-merriweather text-4xl text-d2Green ">
                            INSTITUTE  
                        </p>
                    </div>
                    <p className="font-light font-merriweather text-xl">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        <br />Blanditiis veritatis beatae iusto voluptate in quos aliquid, 
                        <br />natus enim modi! Consequuntur expedita veritatis architecto 
                        <br />officiis suscipit aspernatur? Officiis maiores voluptatem qui.
                        <br />Blanditiis veritatis beatae iusto voluptate in quos aliquid, 
                        <br />natus enim modi! Consequuntur expedita veritatis architecto 
                        <br />officiis suscipit aspernatur? Officiis maiores voluptatem qui.
                        
                    </p>
                </div>

                <div>
                    <Image
                        src="/map.png"
                        alt="map"
                        width={650}
                        height={650}
                    />
                </div>
            </div>

            <div className="py-16 px-8 bg-white">
                <h2 className="text-center font-bold font-merriweather text-4xl text-d2Green mb-12">
                    RIZAL INSTITUTE MISSION AND VISION
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    <div className="bg-green-100/50 p-8 rounded-lg shadow-md">
                        <h3 className="font-bold font-merriweather text-2xl text-d2Green mb-4">
                            OUR MISSION
                        </h3>
                        <p className="font-merriweather text-lg">
                            To provide quality education that develops students&apos; intellectual, 
                            moral, and social capabilities, preparing them to become responsible 
                            citizens who contribute positively to society and uphold the values 
                            of excellence, integrity, and spirituality.
                        </p>
                    </div>
                    
                    <div className="bg-green-100/50 p-8 rounded-lg shadow-md">
                        <h3 className="font-bold font-merriweather text-2xl text-d2Green mb-4">
                            OUR VISION
                        </h3>
                        <p className="font-merriweather text-lg">
                            To be a leading educational institution that nurtures well-rounded 
                            individuals equipped with knowledge, skills, and values necessary 
                            to excel in a rapidly changing world while maintaining a strong 
                            commitment to community development and national progress.
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
                        <p className="font-merriweather">
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
                        <p className="font-merriweather">
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
                        <p className="font-merriweather">
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
