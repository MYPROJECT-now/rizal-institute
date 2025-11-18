"use client";

import { Button } from "@/components/ui/button";
import { usePreviewModal } from "@/src/store/preview";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreviewModal } from "@/components/landing_page/landing_page_portal/preview/preview_modal";
import {  OldStudentEnrollment, oldStudentEnrollment } from "@/src/actions/landingPage";
import { Skeleton } from "@/components/ui/skeleton";




export const Old_Application = () => {

    const searchParams = useSearchParams();
    const lrn = searchParams.get("lrn");
    
    const router = useRouter();

    const [page, setPage] = useState(0);

    const [errors,setErrors] = useState<{ [key: string]: string }>({});


    const [gradeLevel, setGradeLevel] = useState("");
    const [promotion , setPromotion] = useState("");

    const [mop, setMop] = useState("");
    const [reservationReceipt, setReservationReceipt] = useState<File | null>(null);
    const [reservationAmount, setReservationAmount] = useState("");
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isGcashSelected, setIsGcashSelected] = useState(false);
    
    const gcashReceiptRef = useRef<HTMLInputElement>(null);
    const bankTransferReceiptRef = useRef<HTMLInputElement>(null);
    
    // const [localTrackingId, setLocalTrackingId] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { open: openPreview } = usePreviewModal();
    const [promotionloader, setPromotionLoader] = useState(true);

    useEffect(() => {
        if (lrn) {
        
            // setLocalTrackingId(trackingId);
            const fetchStudentData = async () => {
                if (!lrn) return; // 👈 prevents null
                setPromotionLoader(true);
                try {
                    // await getPromotion(lrn);

                    const gradeLevel = await oldStudentEnrollment(lrn);

                    setPromotion(gradeLevel.promotion || gradeLevel.admissionStatus || "");
                    // const nextGrade = gradeLevel.promotion === "PROMOTED" ? String(Number(gradeLevel.gradeToEnroll) + 1) : gradeLevel.gradeToEnroll || "";
                    // setGradeLevel(nextGrade);
                    let finalGradeLevel = "";

                    if (gradeLevel.admissionStatus === "Dropped_Out") {
                        // ⭐ If DROPPED → use existing gradeToEnroll (raw data)
                        finalGradeLevel = gradeLevel.gradeToEnroll || "";
                    } else {
                        // ⭐ If NOT dropped → compute normally
                        finalGradeLevel =
                            gradeLevel.promotion === "PROMOTED"
                                ? String(Number(gradeLevel.gradeToEnroll) + 1)
                                : gradeLevel.gradeToEnroll || "";
                    }

                    setGradeLevel(finalGradeLevel);

                    setPromotionLoader(false);
                } catch (error) {
                    console.error("Error fetching student data:", error);
                }
            };
            fetchStudentData();
        }
    }, [lrn]);


    useEffect(() => {
        if (!lrn) {
          router.push('/');
        }
      }, [lrn, router]);
      
      if (!lrn) {
        return <p className="text-center text-red-500">No tracking ID found.</p>;
      }


    
      
// Validation per page
const validatePage = async (): Promise<boolean> => {
    const newErrors: { [key: string]: string } = {};

    switch (page) {
   



    case 2:
        if (!mop.trim()) newErrors.mop = "Required";
        if (!reservationAmount) newErrors.reservationAmount = "Required";
        if (!reservationReceipt) newErrors.reservationReceipt = "Required";
        

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields.");
            return false;
        }

        if (Number(reservationAmount) < 500)
        {
            newErrors.reservationAmount = "Reservation amount must be greater than 500.";
            setErrors(newErrors);
            toast.error("The minimum reservation amount is P500.");
            return false;
        }
    return true;

    
    default:
    return true;
    }
};




const handleMopChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMop(e.target.value);
    setIsGcashSelected(e.target.value === "GCash");
    setIsBankTransferSelected(e.target.value === "Bank Transfer");
    // Clear the receipt when payment method changes
    setReservationReceipt(null);
    if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
    if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
};

const handleReservationAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
        setReservationAmount(value);
    }
};

const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setReservationReceipt(file);
    }
};



const previewImage = (file: File | null) => {
    if (!file) return;
        const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                openPreview(reader.result);
                }
            };
    reader.readAsDataURL(file);
};
    
    
    // Event handler for adding a new todo
    const handleAdd = async () => {
        setIsSubmitting(true);
        try {
            const uploadImage = async (file: File, folder: string) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'my_preset');
                formData.append('folder', folder);
            
                const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
                    method: 'POST',
                    body: formData,
                });
            
                const data = await response.json();  
                return data.secure_url;
            };

            const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : "";
            await OldStudentEnrollment(lrn, mop, uploadReservationReceipt, Number(reservationAmount), gradeLevel, promotion);

            router.push("/");
            toast.success("application submitted successfully. Your application is now pending review.");

        } catch (error) {
            toast.error("Failed to submit reapplication. Please try again.");
            console.error('Error updating application:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const sections = [
    
        {
            title: (
                <div>
                    {promotionloader ? (
                        <div>
                            <Skeleton className="w-[300px] h-8" />
                        </div>
                    ) : (
                    <div>
                        <p className={promotion === "PROMOTED" ? "sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather" : promotion === "RETAINED" ? "sm:text-lg lg::text-2xl text-red-600 font-bold font-merriweather" : promotion === "SUMMER" ? "sm:text-lg lg::text-2xl text-red-600 font-bold font-merriweather" : ""}>
                            {promotion === "PROMOTED" ? "Section 1: Summary of Promotion" : promotion === "RETAINED" ? "Section 1: Retention Details" : promotion === "SUMMER" ? " Section 1:Retention Details" : ""}
                        </p>
                    </div>
                    )}
                </div>
            ),
            content: (
            <main className=" w-full flex flex-col text-center gap-10 px-[130px] h-auto mt-2 ">
                {promotionloader ? (
                    <div>
                        <Skeleton className="w-full h-[200px]" />
                    </div>
                ) : (
                promotion === "Dropped_Out" ? (
                    <div className="flex flex-col gap-3 border border-gray-600 bg-gray-100 shadow-md rounded-lg p-6">
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-bold font-merriweather">
                            Academic Notice
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-800">
                            Your enrollment status for the previous school year is marked as 
                            <span className="font-semibold"> Dropped</span>.  
                            You may proceed with re-enrollment, but you will be enrolled in the same grade level you last attended.
                            Please contact the Registrars Office if you wish to confirm or update your academic status.
                        </p>
                    </div>
                ):
                promotion === "PROMOTED" ? (
                    <div className="flex flex-col gap-3 border border-dGreen bg-green-50 shadow-lg rounded-lg p-6">
                    <p className="text-lg sm:text-xl lg:text-2xl text-dGreen font-bold font-merriweather">
                        Academic Notice
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-dGreen">
                        This is to formally inform you that you have met all the academic requirements for the current school year. You are officially <span className="font-semibold">eligible to advance</span> to the next grade level. Please ensure that you complete any remaining administrative requirements before the start of the next academic year.
                    </p>
                    </div>

                ) : 
                promotion === "SUMMER" ? (
                    <div className="flex flex-col gap-3 border border-yellow-600 bg-yellow-50 shadow-md rounded-lg p-6">
                    <p className="text-lg sm:text-xl lg:text-2xl text-yellow-800 font-bold font-merriweather">
                        Academic Notice
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-yellow-800">
                        Based on your current academic performance, you have not met all the requirements to advance to the next grade level. You are required to attend summer classes to address the deficiencies in the subjects you failed. Successful completion of the summer program is necessary to become eligible for promotion; failure to do so will result in retention in the current grade.
                    </p>
                    </div>

                ): promotion === "RETAINED" ? (
                    <div className="flex flex-col gap-3 border border-red-600 bg-red-50 shadow-md rounded-lg p-6">
                    <p className="text-lg sm:text-xl lg:text-2xl text-red-700 font-bold font-merriweather">
                        Academic Notice
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-red-700">
                        Based on your academic performance for the current school year, you did not meet the requirements to advance and will be retained in your current grade level. Please consult with your adviser for guidance on improving your performance in the upcoming year.
                    </p>
                    </div>

                ): (
                    null
                )
                )}
                
            </main>
            ),
        },
        {
            title: (
                <div>
                    <p className="sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                        Section 2: Student Information
                    </p>
                </div>
            ),
            content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">
                <section className="w-full px-0 sm:px-2 py-2">
                     <span className="pl-2 ml-0 sm:ml-2   text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Enrollment Details:</span>
                    <div className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-10">
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm  text-dGreen font-semibold">LRN</span>
                                <input 
                                    type="text" 
                                    value={lrn}
                                    disabled
                                    className="rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                              />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm  text-dGreen font-semibold">Grade Level to Enroll</span>
                                <input 
                                    type="text" 
                                    value={"Grade " + gradeLevel}
                                    disabled
                                    className="rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                              />
                            </div>
                        </section>
                    </div>
                </section>

           
            </main>
            ),
        },
        {
            title: (
                <div>
                    <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                        Section 3: Slot Reservation Fee Minimum (₱500)
                    </p>
                </div>
                ),
            content: (
            <main className="w-full flex flex-col gap-5"> 

                <section className=" md:flex  grid-cols-1 justify-center gap-5 pb-10 w-full">

                    <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                        <p className="sm:text-xl lg:text-2xl font-bold text-dGreen font-merriweather text-center"> GCash Payment </p>

                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 1: Send the reservation fee</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <section className="flex justify-center gap-2">
                                    <p className="font-bold text-sm lg:text-lg text-dGreen ">
                                        Gcash: 091234567890
                                    </p>
                                    <button
                                    onClick={() => {
                                    navigator.clipboard.writeText("091234567890");
                                    toast.success("Copied to clipboard");
                                    }}>
                                        <Image
                                            src="/copy.png"
                                            alt="copy icon"
                                            width={1000}
                                            height={1000}
                                            className="lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]"
                                        />
                                    </button>
                                </section>

                                <section className="font-regular text-sm sm:text-md text-dGreen flex flex-row justify-center gap-3">
                                    <p> Click this to download the QR Code</p>
                                    <button
                                        onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "/qr.jpg";
                                        link.download = "qr.jpg";
                                        link.click();
                                        toast.success("QR Code downloaded");
                                    }}>
                                        <Image
                                            src="/dl.png"
                                            alt="download icon"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </section>
                            </CardContent>
                        </Card>
                        
                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl"> 
                            <CardHeader> 
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle> 
                            </CardHeader> 
                            <CardContent className="flex flex-col gap-5"> 
                                <section className="flex flex-col items-center"> 
                                    <div className="text-start"> 
                                        <p className="font-regular sm:text-md lg:text-lg text-d2Green"> Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible. </p> 
                                    </div> 
                                </section> 
                                <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3"> 
                                    <figure> 
                                        <Image 
                                            src="/image.png" 
                                            alt="receipt" 
                                            width={1000} 
                                            height={1000}
                                            className="w-[300px] h-[250px]" 
                                        /> 
                                    </figure> 
                                </section> 
                            </CardContent> 
                        </Card>
                    </div>

                    <div className=" my-10 md:my-0 bg-green-900 md:h-auto h-[4px] md:w-[2px] w-full" />

                    <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                        <p className="sm:text-xl lg:text-2xl font-bold text-dGreen font-merriweather text-center"> Bank Transfer </p>

                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 1: Send the reservation fee</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <section className="flex justify-center">
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-[30px] lg:gap-x-[80px] text-dGreen sm:text-sm lg:text-lg w-fit">
                                        <p className="font-bold">Bank Name:</p>
                                        <p className="font-semibold">BDO</p>

                                        <p className="font-bold">Account Name:</p>
                                        <p className="font-semibold">John Doe</p>

                                        <p className="font-bold">Account Number:</p>
                                        <p className="font-semibold">1234-5678-9101</p>
                                    </div>
                                </section>

                                <section className="font-regular sm:text-sm lg:text-md text-dGreen flex flex-row justify-center gap-3">
                                    <p> Click this to download the QR Code</p>
                                    <button
                                        onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "/qr.jpg";
                                        link.download = "qr.jpg";
                                        link.click();
                                        toast.success("QR Code downloaded");
                                    }}>
                                        <Image
                                            src="/dl.png"
                                            alt="download icon"
                                            width={1000}
                                            height={1000}
                                            className="w-[20px] h-[20px]"
                                        />
                                    </button>
                                </section>
                            </CardContent>
                        </Card>

                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <section className="flex flex-col items-center">
                                    <div className="text-start">
                                        <p className="font-regular sm:text-md lg:text-lg text-d2Green">
                                            Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible.
                                        </p>
                                    </div>
                                </section>

                                <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                    <figure>
                                        <Image
                                            src="/bank.svg"
                                            alt="receipt"
                                            width={1000} 
                                            height={1000}
                                            className="w-[300px] h-[250px]" 
                                        />
                                    </figure>
                                </section>
                            </CardContent>
                        </Card>
                    </div>

                </section>

                <section className="w-full flex flex-col gap-6 items-center justify-center">
                    <PreviewModal />
                    <Card className="w-full max-w-[700px] backdrop-blur-md bg-green-100/10 border border-green-300/30 shadow-xl rounded-2xl px-0 sm:p-6">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-2xl font-bold text-dGreen text-center font-merriweather">
                            Payment Section
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-6 items-center justify-start">
                            {/* Amount */}
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen  text-sm sm:text-xl w-[170px]">
                                Amount:
                            </label>
                            <input 
                                type="text" 
                                placeholder="500.00"
                                step="0.01"
                                value={reservationAmount || ''}
                                className={`rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner outline-none focus:ring-2 focus:ring-dGreen
                                ${errors.reservationAmount ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                                onChange={handleReservationAmount}
                            />
                            </div>

                            {/* Payment Method */}
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen  text-sm sm:text-xl w-[170px]">
                                Payment Method:
                            </label>
                            <select 
                                value={mop || ''}
                                className={`rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner outline-none focus:ring-2 focus:ring-dGreen
                                ${errors.mop ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                                onChange={handleMopChange}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Gcash">GCash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                            </div>

                            {/* Payment Receipt */}
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen  text-sm sm:text-xl w-[170px]">
                                Payment Receipt:
                            </label>

                            {reservationReceipt ? (
                                <div className="flex items-center gap-2 w-full">
                                <button
                                    type="button"
                                    onClick={() => previewImage(reservationReceipt)}
                                    className="text-dGreen underline text-sm bg-white/20 backdrop-blur-sm rounded-md flex-1 text-left truncate pl-3 py-2 h-[45px] shadow-inner"
                                    title="Click to preview"
                                >
                                    {reservationReceipt.name}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                    setReservationReceipt(null);
                                    if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
                                    if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
                                    }}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                    title="Remove file"
                                >
                                    ✕
                                </button>
                                </div>
                            ) : (
                                <input 
                                type="file" 
                                name="document"  
                                accept="image/*"
                                onChange={handleReceiptChange}
                                className={`backdrop-blur-sm text-dGreen rounded-md p-2 w-full h-[45px] shadow-inner
                                    ${errors.reservationReceipt ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                                
                                />
                            )}
                            </div>
                        </CardContent>
                    </Card>

                </section>



            </main>
                    
            ),
        },

    {
        title: (
            <div>
                <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 4: Application Submission
                </p>
            </div>
        ),
        content: (
        <main className="w-full mt-10 flex flex-col items-center justify-center px-0 sm:px-4">
        <section className="bg-white/90 rounded-2xl shadow-xl border border-green-200 w-full grid grid-cols-1 md:grid-cols-2 items-center mb-8">
            {/* Reminder Box */}
            <div className="mb-2 flex flex-col items-center px-4 sm:px-6 py-8 md:px-10 md:py-10">
            <div className="flex items-center gap-2 mb-2">
                <svg
                className="w-6 h-6 md:w-7 md:h-7 text-yellow-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
                </svg>
                <span className="text-xl md:text-2xl font-bold text-dGreen font-merriweather">
                Reminder
                </span>
            </div>
            <ul className="text-left text-d2Green text-sm md:text-base lg:text-lg font-medium space-y-2 pl-0 sm:pl-2">
                <li className="flex items-start gap-2">
                <span className="mt-1">•</span> Ensure that all the information you have provided is correct.
                </li>
                <li className="">
                <span className="mt-1">•</span> You can only
                <span className="pl-2 font-semibold text-yellow-700">submit the application once</span>.
                </li>
                <li className="">
                <span className="mt-1">•</span> All documents must be{" "}
                <span className="pl-2 font-semibold text-blue-700">submitted in person</span>.
                </li>
                <li className="2">
                <span className="mt-1">•</span> Check your
                <span className="pl-2 font-semibold text-purple-700">email inbox</span> for updates.
                </li>
            </ul>
            </div>

            {/* Congratulations Box */}
            <div className="h-full bg-gradient-to-r from-lGreen to-dGreen rounded-b-2xl md:rounded-r-2xl md:rounded-b-none flex flex-col items-center justify-center px-6 py-8 md:px-8 md:py-10 shadow-md">
            <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-2xl md:text-3xl font-bold text-white font-merriweather drop-shadow">
                Congratulations!
                </span>
            </div>
            <p className="text-lg md:text-2xl font-semibold mb-2 text-center tracking-wide text-white">
                Your application is almost complete!
            </p>
            <p className="text-sm md:text-base lg:text-lg text-center opacity-80 text-white">
                Thank you for choosing Rizal Institute. We look forward to seeing you thrive and grow with us!
            </p>
            </div>
        </section>

        {/* Submit Button */}
        <Button
            variant="mainButton"
            onClick={handleAdd}
            disabled={isSubmitting}
            className="px-10 py-3 sm:px-[50px] sm:py-5 rounded-xl bg-gradient-to-r from-lGreen to-dGreen text-white font-bold shadow-lg hover:scale-105 hover:from-green-400 hover:to-green-700 transition-all duration-200 disabled:opacity-60"
        >
            {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        </main>

        ),
    },
    ];

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
        setErrors({}); 
    };

    const handleNext  = async () => {
        if (!(await validatePage())) return;
        if (page < sections.length - 1) setPage(page + 1);
        setErrors({}); 
    };



    return (
        <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
            <div className="h-full w-full ">
                <section className="w-full text-center">
                    <div className="flex justify-start" >
                        <Link href="/">
                        <div className="flex flex-row gap-2 ">
                            <Image
                                src="/arrow.png"
                                alt="back"
                                height={1000} 
                                width={1000}
                                className="sm:w-[30px]  sm:h-[30px] w-[20px] h-[20px]"
                            />
                            <p className="text-dGreen font-merriweather sm:text-xl text-base font-bold">Home</p>
                        </div>
                        </Link> 
                    </div>
                    <p className="mt-[20px] text-xl sm:text-2xl lg:text-4xl text-dGreen font-bold font-merriweather">
                        Junior High School Application
                    </p>
                </section>

                {/* content */}
                <div className="w-full flex-1 mt-[40px] md:mt-[60px] lg:mt-[80px] px-[5px] lg:px-[70px] flex flex-col gap-3 ">
                    {sections[page].title}
                    <hr className="border-b-2 border-dGreen w-full" />
                    {sections[page].content}
                </div>

                {/* buttona */}
                <div className="w-full flex justify-center gap-5 md:gap-10 mt-[50px]">
                    <Button
                        variant="prevButton"
                        className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
                        onClick={handlePrev}
                        disabled={page === 0}
                    >
                        Previous
                    </Button>
                    <span className="text-xs md:text-sm text-gray-600 self-center">
                        Page {page + 1} of {sections.length}
                    </span>
                    <Button
                        variant="prevButton"
                        className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
                        onClick={handleNext}
                        disabled={page === sections.length - 1}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </main>
    );
};


