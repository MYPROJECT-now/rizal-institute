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
        </div>
    );
};

export default AboutPage;