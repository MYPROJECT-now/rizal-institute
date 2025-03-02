"use client";

import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
import { Button } from "@/components/ui/button";

import { useState } from "react";

  

const AdmissionPage = () => {
    //for dynamic steps of enrollment
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="w-full h-full flex flex-col">

            {/* first section */}
            <div className="w-full h-[600px] bg-green-300/30 flex flex-row items-center justify-evenly gap-[1px]">
                <div className="flex flex-col gap-10 items-center text-d2Green">
                    <Image
                        src="/student.png"
                        alt="student"
                        width={320}
                        height={320}
                    />
                    <div className="text-center">
                        <div className="font-bold font-merriweather text-4xl">
                            <p>
                                Welcome
                            </p>
                            <p>
                                Rizalians!!
                            </p>
                        </div>
                        <hr className="border-1 border-solid border-dGreen w-[240px]" />
                        <div>
                            <p>
                            SAVE YOUR SPOT, ENROLL NOW                            
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                <Image
                    src="/admission.png"
                    alt="student"
                    width={800}
                    height={800}
                    />
                </div>
            </div>
             {/* end of first section */}

            {/* start of second section */}
            <div className="w-full h-[600px] flex flex-row items-center justify-center gap-10 ">

                <div className="flex flex-col gap-4">
                    <Button
                    onClick={() => setActiveStep(1)}
                    className={activeStep === 1 ? 
                    "w-[110px] h-[60px] rounded-2xl bg-lGreen text-white text-2xl hover:bg-green-500/90 border-b-[7px] border-b-dGreen active:border-0  font-bold font-oswald" 
                    : "w-[110px] h-[60px] rounded-2xl bg-dGreen text-white text-2xl hover:bg-green-700/90 border-b-[7px] border-b-d2Green active:border-0  font-bold font-oswald"}>
                        Step 1
                    </Button>

                    <Button
                    onClick={() => setActiveStep(2)}
                    className={activeStep === 2 ? 
                   "w-[110px] h-[60px] rounded-2xl bg-lGreen text-white text-2xl hover:bg-green-500/90 border-b-[7px] border-b-dGreen active:border-0 font-bold font-oswald" 
                    : "w-[110px] h-[60px] rounded-2xl bg-dGreen text-white text-2xl hover:bg-green-700/90 border-b-[7px] border-b-d2Green active:border-0 font-bold font-oswald"}>
                        Step 2
                    </Button>

                    <Button
                    onClick={() => setActiveStep(3)}
                    className={activeStep === 3 ? 
                   "w-[110px] h-[60px] rounded-2xl bg-lGreen text-white text-2xl hover:bg-green-500/90 border-b-[7px] border-b-dGreen active:border-0  font-bold font-oswald" 
                    : "w-[110px] h-[60px] rounded-2xl bg-dGreen text-white text-2xl hover:bg-green-700/90 border-b-[7px] border-b-d2Green active:border-0 font-bold font-oswald"}>
                        Step 3
                    </Button>

                    <Button
                    onClick={() => setActiveStep(4)}
                    className={activeStep === 4 ? 
                    "w-[110px] h-[60px] rounded-2xl bg-lGreen text-white text-2xl hover:bg-green-500/90 border-b-[7px] border-b-dGreen active:border-0 font-bold font-oswald" 
                    : "w-[110px] h-[60px] rounded-2xl bg-dGreen text-white text-2xl hover:bg-green-700/90 border-b-[7px] border-b-d2Green active:border-0  font-bold font-oswald"}>
                        Step 4
                    </Button>

                    <Button
                    onClick={() => setActiveStep(5)}
                    className={activeStep === 5 ? 
                   "w-[110px] h-[60px] rounded-2xl bg-lGreen text-white text-2xl hover:bg-green-500/90 border-b-[7px] border-b-dGreen  font-bold font-oswald" 
                    : "w-[110px] h-[60px] rounded-2xl bg-dGreen text-white text-2xl hover:bg-green-700/90 border-b-[7px] border-b-d2Green  font-bold font-oswald"}>
                        Step 5
                    </Button>
                </div>
                <div>
                    {/* card */}
                    <Card className="w-[700px] h-[450px] bg-green-300/30 border-0 flex flex-col px-8 rounded-3xl">
                        <CardHeader>
                            <CardTitle className="font-bold font-merriweather text-4xl text-dGreen text-center ">
                                {activeStep === 1 && ('Application Form  Submission')}
                                {activeStep === 2 && ('Document Submission')}
                                {activeStep === 3 && ('Slot Reservation Payment')}
                                {activeStep === 4 && ('Track Application Status')}
                                {activeStep === 5 && ('ENROLLMENT PROCEDURE')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-start font-light font-oswald text-3xl flex flex-col gap-4">
                        {activeStep === 1 && (
                            <ol className="list-disc pl-6 flex flex-col gap-5">
                            <li>Click "Apply Now" button</li>
                            <li>Fill out basic personal information (Name, contact details, previous school, grade level, etc.)</li>
                            <li>Indicate any special condhitions (honor student, transferee, scholarship applicant, etc.)</li>
                            </ol>
                            )}

                        {activeStep === 2 && (
                            <div>
                                <p>
                                    Upload scanned copies of:
                                </p>
                                <ol className="list-disc pl-6 flex flex-col gap-5">
                                <li>Birth Certificate</li>
                                <li>Report Card (Form 138)</li>
                                <li>Good Moral Certificate</li>
                                </ol>
                                <p>
                                Reminder: Originals must be submitted in person.
                                </p>
                            </div>
                            )}

                        {activeStep === 3 && (
                            <div>
                                <ol className="list-disc pl-6 flex flex-col gap-5">
                                <li>Pay PHP 500 to reserve the slot.</li>
                                <li>Accepted payment methods are online payments (gcash, bank transfer) and Over-the-counter (at school office)</li>
                                <li>An email verification will be sent along with the tracking ID</li>
                                </ol>
                                <p>
                                Tracking ID can be used to track the status of the application
                                </p>
                            </div>
                            )}
                        
                        {activeStep === 4 && (
                            <ol className="list-disc pl-6 flex flex-col gap-5">
                            <li>The admin will verify the application of the enrolly </li>
                            <li>An email verification will be sent once the application was verified</li>
                            <li>Applicants can track their application status by entering their tracking ID in the button in the home page</li>
                            </ol>
                            )}

                        {activeStep === 5&& (
                            <ol className="list-disc pl-6 flex flex-col gap-5">
                            <li>pagisipan pa</li>
                            </ol>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* end of second section */}

            {/* start of third section  */}
            <div className="h-[200px] w-full bg-dGreen flex flex-col gap-4 items-center justify-center text-center">
                <p className="font-bold font-merriweather text-4xl text-white">READY TO TAKE A LEAP?</p>
                <button className="bg-yellow h-[60px] w-[700px] rounded-md font-bold font-merriweather text-dGreen text-2xl">
                    ENROLL NOW!!
                </button>
            </div>
            {/* end of third section  */}

            {/* start of fourth section  */}
            <div className="h-[600px] w-full pt-[100px] flex flex-col gap-10 items-center text-center  font-merriweather text-dGreen ">
                <p className="font-bold text-4xl ">FREQUENTLY ASKED QUESTIONS</p>
                <Accordion type="single" collapsible className="text-3xl" >
                <AccordionItem value="item-1" className="w-[1200px]  text-lg px-10 rounded-lg">
                    <AccordionTrigger className="text-lg">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="w-[1200px]  text-lg px-10 rounded-lg">
                    <AccordionTrigger className="text-lg">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="w-[1200px]  text-lg px-10 rounded-lg">
                    <AccordionTrigger className="text-lg">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="w-[1200px]  text-lg px-10 rounded-lg">
                    <AccordionTrigger className="text-lg">Is it accessible?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>

              
                </Accordion>

                
            </div>





        </div>
    );
};

export default AdmissionPage;