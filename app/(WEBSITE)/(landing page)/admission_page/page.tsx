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
            <div className="w-full lg:py-10 sm:py-3 py-0  px-5 bg-gradient-to-b from-green-200 to-green-600 flex sm:flex-row flex-col ">
                <div className=" w-1/2 flex flex-col sm:gap-10 gap-0 items-center justify-center text-white">
                    <Image
                        src="/top.svg"
                        alt="student"
                        width={1000}
                        height={1000}
                        className ="hidden sm:block lg:w-[350px] lg:h-[350px] sm:[180px] sm:h-[180px]"
                    />
                        

                    
                    {/*   <hr className="border-1 border-solid border-dGreen w-[300px] lg:w-[600px]" /> */}
                    <div className="hidden sm:flex flex-col text-center">                   
                        <p className= "font-bold font-merriweather text-2xl lg:text-4xl">
                            Welcome, Rizalians!
                        </p>
                        <hr  className="w-full border-2 mb-2"/>
                        <p className="text-xs lg:text-base">
                            SAVE YOUR SPOT, ENROLL NOW                            
                        </p>
                    </div>
                </div>
                
                <div className="sm:w-1/2 w-full flex flex-col gap-1 items-center ">
                    <div>
                        <Image
                        src="/admission.svg"
                        alt="student"
                        width={1000}
                        height={1000}
                        className="lg:w-[600px] lg:h-[600px] sm:w-[400px] sm:h-[400px] w-[350px] h-[350px] "
                        />
                    </div> 
                    <div className="block sm:hidden flex-col text-center text-white -mt-[75px] mb-10">                   
                        <p className= "font-bold font-merriweather text-xl sm:text-2xl lg:text-4xl">
                            Welcome, Rizalians!
                        </p>
                        <hr  className="w-full border-2"/>
                        <p className="text-[10px] sm:text-xs lg:text-base">
                            SAVE YOUR SPOT, ENROLL NOW                            
                        </p>
                    </div>
                </div>
            </div>
           

             {/* end of first section */}

            {/* start of second section */}
    <div className="w-full sm:h-[550px] h-[400px] flex flex-col items-center justify-center py-5 sm:py-0">
        <h1 className="font-bold font-merriweather text-xl lg:text-4xl sm:text-3xl text-dGreen">STEP AND GUIDELINES</h1>
        <div className="flex flex-row  items-center justify-center gap-6 lg:gap-10 p-4">

            <div className="hidden sm:flex flex-col gap-2 lg:gap-4 flex-wrap justify-center">
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
                <Card className=" lg:w-[700px] sm:w-[500px] w-full h-auto bg-green-300/30 border-0 flex flex-col rounded-3xl">
                    <CardHeader>
                        <CardTitle className="font-bold font-merriweather lg:text-4xl sm:text-2xl text-lg text-dGreen text-center">
                            {activeStep === 1 && 'Application Form Submission'}
                            {activeStep === 2 && 'Document Submission'}
                            {activeStep === 3 && 'Slot Reservation Payment'}
                            {activeStep === 4 && 'Track Application Status'}
                            {activeStep === 5 && 'ENROLLMENT PROCEDURE'}
                        </CardTitle>
                    </CardHeader> 
                <CardContent className="text-start font-light font-oswald  lg:text-3xl sm:text-xl text-sm flex flex-col gap-4">
                    {activeStep === 1 && (
                        <ol className="list-disc pl-6 flex flex-col sm:gap-5 gap-2">
                            <li>Click &quot;Enroll Now&quot; button</li>
                            <li>Fill out basic personal information (Name, contact details, previous school, grade level, etc.)</li>
                            <li>Ensure that all inforamtion are correct</li>
                        </ol>
                    )}

                    {activeStep === 2 && (
                        <div>
                            <p>
                            U   pload scanned copies of:
                            </p>
                            <ol className="list-disc pl-6 flex flex-col sm:gap-5 gap-2">
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
                        <ol className="list-disc pl-6 flex flex-col sm:gap-5 gap-2">
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
                    <ol className="list-disc pl-6 flex flex-col sm:gap-5 gap-2">
                        <li>Registrar and Cashier will verify the application and payment  of the enrollee </li>
                        <li>An email verification will be sent once the application was verified</li>
                        <li>Applicants can track their application status by entering their tracking ID in the button in the home page</li>
                    </ol>
                    )}

                    {activeStep === 5&& (
                    <ol className="list-disc pl-6 flex flex-col sm:gap-5 gap-2">
                        <li>In order to be officially enrolled. </li>
                        <li>An applicant must pay in either full or downpayment.</li>
                        <li>Applicants can track their application status by entering their tracking ID in the button in the home page</li>
                    </ol>
                    )}
                </CardContent>
                </Card>


<div className="flex sm:hidden flex-row gap-4 justify-between w-full mt-4">
  {/* Prev button */}
  <Button
    onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}
    variant="secondary"
    disabled={activeStep === 1}
    className="w-1/2 rounded-2xl"
  >
    Prev
  </Button>

  {/* Next button */}
  <Button
    onClick={() => setActiveStep((prev) => Math.min(prev + 1, 5))}
    variant="mainButton"
    disabled={activeStep === 5}
    className="w-1/2 rounded-2xl"
  >
    Next
  </Button>
</div>





            </div>
        </div>
    </div>


            {/* end of second section */}

            {/* start of third section  */}
    <div className="w-full bg-dGreen flex flex-col lg:gap-4 gap-1  text-center lg:py-7 py-4">
        <p className="font-bold font-merriweather lg:text-3xl sm:text-xl text-white">READY TO TAKE A LEAP?</p>
        <a href="/application">
        <button className="bg-yellow-400 lg:py-3 py-1 w-full font-bold font-merriweather text-dGreen lg:text-xl sm:text-lg text-sm">
            ENROLL NOW!!
        </button>
        </a>
    </div>
    {/* end of third section  */}

    {/* start of fourth section  */}
    <div className="sm:h-[500px] h-[400px] w-full pt-[50px] flex flex-col sm:gap-10 gap-5 items-center text-center  font-merriweather text-dGreen ">
        <p className="font-bold  md:text-2xl sm:text-lg ">FREQUENTLY ASKED QUESTIONS</p>
        <Accordion type="single" collapsible className="text-base" >
            <AccordionItem value="item-1" className="sm:w-[640px] w-[270px]  text-sm sm:px-10 px-5 rounded-lg ">
                <AccordionTrigger className="sm:text-lg text-[11px]">What are the requirements in enrolling?</AccordionTrigger>
                <AccordionContent className="sm:text-lg text-[11px]">
                <em>Please provide basic information, the most important document is the report card, and a reservation fee of PHP 500.</em>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="sm:w-[640px] w-[270px]  text-sm sm:px-10 px-5 rounded-lg ">
                <AccordionTrigger className="sm:text-lg text-[11px]">How much is the downpayment?</AccordionTrigger>
                <AccordionContent className="sm:text-lg text-[11px]">
                <em>The downpayment is P500.</em>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="sm:w-[640px] w-[270px]  text-sm sm:px-10 px-5 rounded-lg ">
                <AccordionTrigger className="sm:text-lg text-[11px]">Can I pay in full?</AccordionTrigger>
                <AccordionContent className="sm:text-lg text-[11px]">
                <em>Yes. You can pay in full.</em>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="sm:w-[640px] w-[270px]  text-sm sm:px-10 px-5 rounded-lg ">
                <AccordionTrigger className="sm:text-lg text-[11px]">How do I track my application?</AccordionTrigger>
                <AccordionContent className="sm:text-lg text-[11px]">
                <em>You can track your application by entering your tracking ID in the button in the home page.</em>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        
    </div>


    </div>
    );
};

export default AdmissionPage;