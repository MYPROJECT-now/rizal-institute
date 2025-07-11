"use client";

import Image from "next/image";
import {
    Card,
    CardContent,
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
            <div className="w-full h-[600px] bg-green-300/30 flex flex-row items-center justify-evenly gap-[1px] ">
                <div className="flex flex-col gap-10 items-center text-d2Green lg:flex lg:flex-row">
                    <Image
                        src="/studentboy.png"
                        alt="student"
                        width={250}
                        height={250}
                        className ="hidden md:block"
                    />
                     <Image
                        src="/student2.png"
                        alt="student"
                        width={250}
                        height={250}
                        className ="hidden lg:block"
                    />
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <Image
                        src="/admission.svg"
                        alt="student"
                        width={0}
                        height={0}
                        className="w-[300px] h-[300px] mx-auto lg:w-[600px] lg:h-[600px] "
                        />
                       {/* <div className="font-bold font-merriweather text-2xl lg:text-4xl"> */}
                            
                        <p className="text-xs lg:text-base lg:mt-[-100px]">
                            SAVE YOUR SPOT, ENROLL NOW                            
                            </p>
                        
                      {/*   <hr className="border-1 border-solid border-dGreen w-[300px] lg:w-[600px]" /> */}
                        
                            <p className= "font-bold font-merriweather text-2xl lg:text-4xl">
                                Welcome, Rizalians!
                            </p>
                        
                        
                    </div> 
                </div>
           

             {/* end of first section */}

            {/* start of second section */}

            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 p-4">
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 flex-wrap justify-center">
                <Button
                onClick={() => setActiveStep(1)}
                variant={activeStep === 1 ? "mainButton" : "subMainButton"}
                className= "w-[90px] h-[50px] lg:w-[110px] lg:h-[60px] rounded-2xl"
                >
                Step 1
                </Button>

                <Button
                onClick={() => setActiveStep(2)}
                variant={activeStep === 2 ? "mainButton" : "subMainButton"}
                className= "w-[90px] h-[50px] lg:w-[110px] lg:h-[60px] rounded-2xl"
                >
                Step 2
                </Button>

                <Button
                onClick={() => setActiveStep(3)}
                variant={activeStep === 3 ? "mainButton" : "subMainButton"}
                className= "w-[90px] h-[50px] lg:w-[110px] lg:h-[60px] rounded-2xl"
                >
                Step 3
                </Button>

                <Button
                onClick={() => setActiveStep(4)}
                variant={activeStep === 4 ? "mainButton" : "subMainButton"}
                className= "w-[90px] h-[50px] lg:w-[110px] lg:h-[60px] rounded-2xl"
                >
                Step 4
                </Button>

                <Button
                onClick={() => setActiveStep(5)}
                variant={activeStep === 5 ? "mainButton" : "subMainButton"}
                className= "w-[90px] h-[50px] lg:w-[110px] lg:h-[60px] rounded-2xl"
                >
                Step 5
                </Button>
            </div>
            {/* card */}
            <div>
                <Card className="w-full max-w-[95vw] lg:w-[700px] h-auto bg-green-300/30 border-0 flex flex-col px-4 lg:px-8 py-4 rounded-3xl">
                <CardHeader>
                    <CardTitle className="font-bold font-merriweather text-2xl lg:text-4xl text-dGreen text-center">
                    {activeStep === 1 && 'Application Form Submission'}
                    {activeStep === 2 && 'Document Submission'}
                    {activeStep === 3 && 'Slot Reservation Payment'}
                    {activeStep === 4 && 'Track Application Status'}
                    {activeStep === 5 && 'ENROLLMENT PROCEDURE'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-start font-light font-oswald text-xl lg:text-3xl flex flex-col gap-4">
                        {activeStep === 1 && (
                            <ol className="list-disc pl-6 flex flex-col gap-5">
                            <li>Click &quot;Enroll Now&quot; button</li>
                            <li>Fill out basic personal information (Name, contact details, previous school, grade level, etc.)</li>
                            <li>Ensure that all inforamtion are correct</li>
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
                                <li>CAPRISAA Student Exit Clearance Form (if from private school)</li>
                                </ol>
                                <p className="mt-8">
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
                            <li>Registrar and Cashier will verify the application and payment  of the enrollee </li>
                            <li>An email verification will be sent once the application was verified</li>
                            <li>Applicants can track their application status by entering their tracking ID in the button in the home page</li>
                            </ol>
                            )}

                        {activeStep === 5&& (
                            <ol className="list-disc pl-6 flex flex-col gap-5">
                            <li>In order to be officially enrolled. </li>
                            <li>An applicant must pay in either full or downpayment.</li>
                            <li>Applicants can track their application status by entering their tracking ID in the button in the home page</li>
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
                <a href="/application">
                <button className="bg-yellow h-[60px] w-[700px] rounded-md font-bold font-merriweather text-dGreen text-2xl">
                    ENROLL NOW!!
                </button>
                </a>
            </div>
            {/* end of third section  */}

            {/* start of fourth section  */}
            <div className="h-[500px] w-full pt-[50px] flex flex-col gap-10 items-center text-center  font-merriweather text-dGreen ">
                <p className="font-bold text-2xl md:text-4xl">FREQUENTLY ASKED QUESTIONS</p>
                <Accordion type="single" collapsible className="text-base" >
                <AccordionItem value="item-1" className="w-[400px]  text-sm px-10 rounded-lg lg:w-[640px]">
                    <AccordionTrigger className="text-lg">What are the requirements in enrolling?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    <em>Please provide basic information, the most important document is the report card, and a reservation fee of PHP 500.</em>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="w-[400px]  text-lg px-10 rounded-lg lg:w-[640px]">
                    <AccordionTrigger className="text-lg">How much is the downpayment?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    <em>The downpayment is P500.</em>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="w-[400px]  text-lg px-10 rounded-lg lg:w-[640px]">
                    <AccordionTrigger className="text-lg">Can I pay in full?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    <em>Yes. You can pay in full.</em>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="w-[400px]  text-lg px-10 rounded-lg lg:w-[640px]">
                    <AccordionTrigger className="text-lg">How do I track my application?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                    <em>You can track your application by entering your tracking ID in the button in the home page.</em>
                    </AccordionContent>
                </AccordionItem>

              
                </Accordion>

                
            </div>





        </div>
    );
};

export default AdmissionPage;